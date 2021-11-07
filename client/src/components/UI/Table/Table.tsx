import React from 'react';
import BootstrapTable from 'react-bootstrap/Table';

import classes from './Table.module.scss';

interface Props {
	headers: string[];
	data: (string | number)[][];
	overflow?: boolean;
	stickyHeader?: boolean;
	maxHeight?: string;
}

const Table: React.FC<Props> = ({data, headers, overflow = false, stickyHeader = false, maxHeight}) => {
	return (
		<div
			style={{
				...(overflow && {overflowY: 'auto'}),
				...(maxHeight && {maxHeight: maxHeight})
			}}>
			<BootstrapTable bordered hover className={classes.table}>
				<thead>
					<tr>
						{headers.map((header, i) => (
							<th key={`${header}_${i}`} className={classes.stickyHeader}>
								{header}
							</th>
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
		</div>
	);
};

export default Table;
