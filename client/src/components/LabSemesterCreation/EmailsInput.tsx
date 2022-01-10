import React from 'react';
import {Col, Row} from 'react-bootstrap';

import {Button} from '../UI';
import classes from './EmailsInput.module.scss';

interface Props {
	value: string;
	error: string | null;
	handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	handlePaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
	handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleOnClick: () => void;
}

const EmailsInput: React.FC<Props> = ({value, error, handleKeyDown, handlePaste, handleEmailChange, handleOnClick}) => {
	return (
		<>
			<Row>
				{error && <p className={classes.error}>{error}</p>}
				<Col sm={8}>
					<div className={classes.wrapper}>
						<div className={classes.inputWrapper}>
							<div className={classes.inputSubwrapper}>
								<input
									placeholder="Escribir o pegar los correos electrónicos"
									value={value}
									onChange={handleEmailChange}
									onKeyDown={handleKeyDown}
									onPaste={handlePaste}
									className={classes.input}
								/>
							</div>
						</div>
					</div>
				</Col>
				<Col className={classes.addButton} sm={4}>
					<Button loading={false} onClick={handleOnClick}>
						Añadir
					</Button>
				</Col>
			</Row>
		</>
	);
};
export default EmailsInput;
