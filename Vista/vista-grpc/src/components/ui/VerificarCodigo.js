import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

const VerificarCodigo = () => {
	const [submit, setsubmit] = useState(false);
	const [codigo, setcodigo] = useState();
	const [prioritario, setprioritario] = useState();
	const [verificador, setverificador] = useState();

	const handleSubmit = (e) => {
		e.preventDefault();

		//Axios

		setprioritario("prioritario");
		setverificador(1);
		setsubmit(true);
	};

	return (
		<Container fluid="sm">
			<h3>Codigo</h3>
			<Form className="mt-3">
				<Row className="g-2">
					<Col md>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Control
								type="text"
								placeholder="Ingrese un codigo"
								value={codigo}
								onChange={(e) => setcodigo(e.target.value)}
							/>
						</Form.Group>
					</Col>
					<Col md>
						<Button
							variant="primary"
							type="submit"
							onClick={e => handleSubmit(e)}
						>
							Verificar
						</Button>
					</Col>
				</Row>
			</Form>
			<Row className="g-2">
				{submit ? (
					<>
						{" "}
						<Alert
							key="primary"
							variant={prioritario === "prioritario" ? "warning" : "primary"}
						>
							El producto es {prioritario}.
						</Alert>
						<Alert
							key="primary2"
							variant={verificador.toString().length > 3 ? "success" : "danger"}
						>
							El codigo verificador es {verificador}.
						</Alert>
					</>
				) : null}
			</Row>
		</Container>
	);
};

export default VerificarCodigo;
