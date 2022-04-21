import React from 'react';
import Row from 'react-bootstrap/Row';

import {User} from '../../containers/Users/types';
import {Table} from '../UI/index';
import {Action} from '../UI/Table/Table';

interface Props {
	data: User[];
	onAction?: (rowIndex: number, action: Action) => void;
}

const COLUMNS = ['Email', 'Nombre', 'Identificación', 'Telefono'];

const UsersTable: React.FC<Props> = ({data, onAction}) => {
	const mapOutput = ({name, identificationNumber, email, phone}: User): (string | React.ReactNode)[] => [
		email,
		name,
		identificationNumber,
		phone
	];

	return (
		<Row className="section">
			<Table
				headers={COLUMNS}
				data={data.map(mapOutput)}
				overflow
				stickyHeader
				maxHeight={'400px'}
				editable
				removable
				onAction={onAction}
			/>
		</Row>
	);
};

export default UsersTable;
