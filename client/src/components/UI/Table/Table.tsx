import React, {ReactNode} from 'react';
import BootstrapTable from 'react-bootstrap/Table';
import {BsPencilFill, BsXCircleFill} from 'react-icons/bs';

import classes from './Table.module.scss';

export enum Action {
	Edit,
	Delete,
	DeleteAll
}

interface Props {
	headers: string[];
	data: (string | number | boolean | ReactNode)[][];
	overflow?: boolean;
	stickyHeader?: boolean;
	maxHeight?: string;
	removable?: boolean;
	hasRemoveAll?: boolean;
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
	hasRemoveAll = false,
	onAction
}) => {
	const renderRows = () => {
		if (data.length > 0) {
			return data.map((row, i) => (
				<tr key={`row_${i}`}>
					{row.map((cell, j) => (
						<td key={`cell_${i}_${j}`}>{cell}</td>
					))}
					{(editable || removable) && (
						<td style={{width: editable && removable && removable ? '70px' : '30px'}}>
							{editable && <BsPencilFill onClick={() => onAction?.(i, Action.Edit)} className={classes.actionIcon} />}
							{removable && (
								<BsXCircleFill
									onClick={() => onAction?.(i, Action.Delete)}
									className={`${classes.actionIcon} ${classes.delete}`}
								/>
							)}
						</td>
					)}
				</tr>
			));
		} else {
			return (
				<tr key={`row_1`} style={{textAlign: 'center'}}>
					<td colSpan={headers.length}>No se encontraron registros</td>
				</tr>
			);
		}
	};

	return (
		<div
			style={{
				...(overflow && {overflowY: 'auto'}),
				...(maxHeight && {maxHeight: maxHeight})
			}}>
			<BootstrapTable bordered hover className={classes.table} style={{lineBreak: 'auto'}}>
				<thead>
					<tr>
						{headers.map((header, i) => (
							<th key={`${header}_${i}`} className={stickyHeader ? classes.stickyHeader : ''}>
								{header}
							</th>
						))}
						{data.length > 0 && (editable || removable) && (
							<th className={stickyHeader ? classes.stickyHeader : ''}>
								{removable && hasRemoveAll && (
									<BsXCircleFill
										onClick={() => onAction?.(0, Action.DeleteAll)}
										className={`${classes.actionIcon} ${classes.delete}`}
									/>
								)}
							</th>
						)}
					</tr>
				</thead>
				<tbody>{renderRows()}</tbody>
			</BootstrapTable>
		</div>
	);
};

export default Table;
