import React from 'react';
import BootstrapTable from 'react-bootstrap/Table';

interface Props {
	headers: string[];
	data: (string | number)[][];
}

const Table: React.FC<Props> = ({data, headers}) => {
	return (
		<BootstrapTable bordered hover>
			<thead>
				<tr>
					{headers.map((header, i) => (
						<th key={`${header}_${i}`}>{header}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((row, i) => (
					<tr key={`row_${i}`}>
						{row.map((cell, j) => (
							<td key={`cell_${i}_${j}`}>{cell}</td>
						))}
					</tr>
				))}
			</tbody>
		</BootstrapTable>
	);
};

export default Table;
