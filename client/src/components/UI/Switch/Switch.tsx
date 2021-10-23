import React from 'react';
import FormCheck, {FormCheckProps} from 'react-bootstrap/FormCheck';

type Props = Pick<FormCheckProps, 'label'>;

const Switch: React.FC<Props> = (props: Props) => {
	return <FormCheck type="switch" {...props} />;
};

export default Switch;
