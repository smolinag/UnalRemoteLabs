import React from 'react';
import {Modal} from 'react-bootstrap';

import Button from '../Button/Button';

interface Props {
	display: boolean;
	title: string;
	// loading: boolean;
	onDisplay: (display: boolean) => void;
	onSave: () => void;
}

const ModalComponent: React.FC<Props> = ({children, display, title, onDisplay, onSave}) => {
	const handleClose = () => {
		onDisplay(!display);
	};

	return (
		<>
			<Modal show={display} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{children}</Modal.Body>
				<Modal.Footer>
					<Button loading={false} variant="red" onClick={handleClose}>
						Cancelar
					</Button>
					<Button loading={false} variant="green" onClick={onSave}>
						Aceptar
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ModalComponent;
