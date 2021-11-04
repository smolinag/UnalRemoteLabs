# UI Laboratorios UNAL

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Scripts

Utilizamos NPM para instalar dependencias y ejecutar scripts.

### `npm start`

Inicia la aplicacion en modo `development` en [http://localhost:3000](http://localhost:3000).

## Variables de entorno

Las variables de entorno se definen en `.env` y deben tener como prefijo `REACT_APP_`. Por ejemplo `REACT_APP_GRAPHQL_HTTP=XXX`. Para accederlas se llama `process.env.<VARIABLE_DE_ENTORNO>`.

## Peticiones GQL

Utilizamos [GraphQL generator](https://www.graphql-code-generator.com/) para tener peticiones tipadas. Ademas, podemos generar hooks automaticos para utilizar de una forma mas sencilla las peticiones.

Por ejemplo, si creamos un archivo `./src/graphql/getTest.gql`, el cual contiene:

```gql
query getTest {
	test {
		id
	}
}
```

Ejecutamos `npm run codegen` para actualizar el codigo generado.

Luego en algun componente podemos utilizar dentro de un componente como:

```tsx
import {useGetTest} from './src/graphql/generated/schema'

const Component = () =>{

  const {data, loading, error} = useGetTest();

  ...
}

```

Donde `data`, `loading` y `error` son variables reactivas.
