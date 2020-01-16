import * as React from 'react';
import { Appbar } from '../../components';
import { Container, Grid, TextField, InputLabel, OutlinedInput } from '@material-ui/core';

interface IAddProductProps {
}

const AddProduct: React.FunctionComponent<IAddProductProps> = (props) => {

	const [labelWidth] = React.useState(0);
	const labelRef = React.useRef(null);
	const [name, setName] = React.useState("");

	return (
		<>
			<Appbar />

			<Container>
				<Grid container direction="column" justify="center" alignItems="center">
					<form>
						<TextField variant="outlined">
							<InputLabel ref={labelRef} htmlFor="name">
								Name
							</InputLabel>
							<OutlinedInput id="name" value={name} onChange={(event) => setName(event.target.value)} labelWidth={labelWidth}>

							</OutlinedInput>
						</TextField>
					</form>
				</Grid>
			</Container>
		</>
	);
};

export default AddProduct;
