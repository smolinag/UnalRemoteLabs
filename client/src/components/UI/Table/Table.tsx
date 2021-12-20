import React from 'react';
import BootstrapTable from 'react-bootstrap/Table';
import {BsPencilFill, BsXCircleFill} from 'react-icons/bs';

import classes from './Table.module.scss';

export enum Action {
	Edit,
	Delete
}

interface Props {
	headers: string[];
	data: (string | number)[][];
	overflow?: boolean;
	stickyHeader?: boolean;
	maxHeight?: string;
	removable?: boolean;
	editable?: boolean;
	onAction?: (rowIndex: number, action: Action) => void;
}

const Table: React.FC<Props> = ({
	data,
	headers,
	overflow = false,
	stickyHeader = false,
	maxHeight,
	editable = false,
	removable = false,
	onAction
}) => {
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
							<th key={`${header}_${i}`} className={stickyHeader ? classes.stickyHeader : ''}>
								{header}
							</th>
						))}
						{(editable || removable) && <th className={stickyHeader ? classes.stickyHeader : ''} />}
					</tr>
				</thead>
				<tbody>
					{data.map((row, i) => (
						<tr key={`row_${i}`}>
							{row.map((cell, j) => (
								<td key={`cell_${i}_${j}`}>{cell}</td>
							))}
							{(editable || removable) && (
								<td style={{width: editable && removable ? '70px' : '30px'}}>
									{editable && (
										<BsPencilFill onClick={() => onAction?.(i, Action.Edit)} className={classes.actionIcon} />
									)}
									{removable && (
										<BsXCircleFill
											onClick={() => onAction?.(i, Action.Delete)}
											className={`${classes.actionIcon} ${classes.delete}`}
										/>
									)}
								</td>
							)}
						</tr>
					))}
				</tbody>
			</BootstrapTable>
		</div>
	);
};

export default Table;
