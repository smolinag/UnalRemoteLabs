const { createAuthLink } = require("aws-appsync-auth-link");
const { createSubscriptionHandshakeLink } = require("aws-appsync-subscription-link");

const fetch = require("node-fetch");
const { ApolloLink } = require("apollo-link");
const { createHttpLink } = require("apollo-link-http");
const apolloClient = require("@apollo/client/core");
const { ApolloClient } = apolloClient;
const { InMemoryCache } = require("@apollo/client/core");
const apolloCore = require("@apollo/client/core");
const { gql } = apolloCore;

const url = process.env.GRAPHQL_ENDPOINT;
const region = "us-east-2";
const auth = {
  type: "API_KEY",
  apiKey: process.env.API_KEY
};

const httpLink = createHttpLink({ uri: url, fetch: fetch });

const link = ApolloLink.from([createAuthLink({ url, region, auth }), createSubscriptionHandshakeLink({ url, region, auth }, httpLink)]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

//---GQL Queries---
const LIST_OUTPUTS = gql`
  query listLabPracticeOutputs($filter: ModelLabPracticeOutputFilterInput) {
    listLabPracticeOutputs(filter: $filter) {
      items {
        id
        name
      }
    }
  }
`;


const LAB_OUTPUT_LISTEN = gql`
  mutation labOutputListen($labPracticeOutputID: ID!, $value: String!, $rpiID:ID!, $captureDate: AWSDateTime!) {
    labOutputListen(
      input: { labPracticeOutputID: $labPracticeOutputID,  value: $value, rpiID:$rpiID, captureDate: $captureDate }
    ) {
      labPracticeOutputID
      value
      rpiID
      captureDate  
    }
  }
`;

const QUERY_COMMAND = gql`
  query getLabPracticeSessionCommand($id: ID!) {
    getLabPracticeSessionCommand(id: $id) {
      id
      _version
    }
  }
`;

const UPDATE_COMMAND = gql`
  mutation updateLabPracticeSessionCommand($id: ID!, $status: Status!, $version: Int!, $executionDate: AWSDateTime!) {
    updateLabPracticeSessionCommand(input: { id: $id, status: $status, _version: $version, executionDate: $executionDate }) {
      id
      labpracticecommandID
      labpracticesessionID
      parameters
      status
      requestDate
      updatedAt
      executionDate
      createdAt
      _version
    }
  }
`;
//---------------

async function listLabPracticeOutputs(filter) {
  try {
    //Query labPracticeOutput to get id
    const queryAns = await client.query({
      query: LIST_OUTPUTS,
      variables: { filter },
    });
    let outputs = queryAns.data.listLabPracticeOutputs.items;
    if (outputs.length > 0) {
      console.log("Output id: " + outputs[0].id);
      outputs = outputs.filter(item => item._deleted != true);
      return outputs[0].id;
    } else {
      console.log("Output not found");
    }
  } catch (error) {
    console.log(error);
  }
}

async function updateLabPracticeSessionCommand(uuid, status, executionDate) {
  try {
    //Query labPracticeSessionCommand to get version information (See AppSync version control)
    const queryAns = await client.query({
      query: QUERY_COMMAND,
      variables: { id: uuid },
    });

    const commandData = queryAns.data.getLabPracticeSessionCommand;
    console.log(commandData);

    //Update labPracticeSessionCommand
    try {
      const mutationAns = await client.mutate({
        mutation: UPDATE_COMMAND,
        variables: {
          id: uuid,
          status: status,
          version: commandData._version,
          executionDate: executionDate,
        },
      });
      console.log(mutationAns.data.updateLabPracticeSessionCommand);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}


async function labOutputListen(rpiId, outputId, value, captureDate) {
  //Update labPracticeSessionOutput
  try {
    const mutationAns = await client.mutate({
      mutation: LAB_OUTPUT_LISTEN,
      variables: {
        labPracticeOutputID: outputId,
        value: value,
        rpiID:rpiId,
        captureDate: captureDate,
      },
    });
    console.log(mutationAns.data.labOutputListen);
  } catch (error) {
    console.log(error);
  }
}

exports.handler = async (event) => {
  console.log(event);
  switch (event.type) {
    case "output":
      for (let i = 0; i < event.data.length; i++) {
        let item = event.data[i];
        console.log(item);
        let outputId = await listLabPracticeOutputs({ name: { eq: item.name } });
        await labOutputListen(event.rpiId, outputId, item.value, event.captureDate);
      }
      break;
    case "command":
      await updateLabPracticeSessionCommand(event.uuid, event.status, event.executionDate);
      break;
    default:
      console.log("Event type not valid: " + event.type);
      break;
  }
};

// main();

// async function main() {
//   // let event = {
//   //   sessionId: "aaaaaaa",
//   //   type: "output",
//   //   data: [
//   //     { name: "Plot_V_Fase1", value: { x: [1, 2, 3, 4], y: [11, 12, 13, 11], xAxisUnits: "ms", yAxisUnits: "A" }, status: "ok" },
//   //     { name: "V_Fase2", value: "120VAC", status: "ok" },
//   //     { name: "V_Fase3", value: "121VAC", status: "ok" },
//   //     { name: "I_Fase1", value: "0.87A", status: "ok" },
//   //     { name: "I_Fase2", value: "0.4A", status: "ok" },
//   //     { name: "I_Fase3", value: "No se puede abrir el puerto COM4", status: "error" },
//   //   ],
//   //   captureDate: "2021-11-09T16:40:00-05:00",
//   // };
//   let event = {
//     type: "command",
//     uuid: "79fa13d2-1f0f-41d6-b465-6031de748aa7",
//     status: "Hi",
//     executionDate: "2021-11-25T16:39:06.008553-05:00",
//   };

//   switch (event.type) {
//     case "output":
//       event.data.forEach(async (item) => {
//         let outputId = await listLabPracticeOutputs({ name: { eq: item.name } });
//         labOutputListen(event.sessionId, outputId, item.value, event.captureDate);
//       });
//       break;
//     case "command":
//       updateLabPracticeSessionCommand(event.uuid, event.status, event.executionDate);
//       break;
//     default:
//       console.log("Event type not valid: " + event.type);
//       break;
//   }
// }
