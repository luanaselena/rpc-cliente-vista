import React, { useState } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import CRUDTable, {
	Fields,
	Field,
	CreateForm,
	UpdateForm,
	DeleteForm,
} from "react-crud-table";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// Component's Base CSS
import "./index.css";

const styles = {
	container: { margin: "auto", width: "fit-content" },
};

const TablaMedicamentos = () => {
	let tasks = [
		{
			codigo: 1,
			nombre: "Create an example",
			droga: "Create an example of how to use the component",
		},
		{
			codigo: 2,
			nombre: "Improve",
			droga: "Improve the component!",
		},
	];

	const [medicamentos, setmedicamentos] = useState(tasks);
	const [busqueda, setbusqueda] = useState("");
	const [columnabusqueda, setcolumnabusqueda] = useState("columna");
	const [filtrobusqueda, setfiltrobusqueda] = useState("filtro");

	let count = medicamentos.length;
	const service = {
		create: (med) => {
			count += 1;
			var medAux = medicamentos;
			medAux.push({
				...med,
				codigo: count,
			});
			console.log(medAux);
			setmedicamentos(medAux);

			axios.post("http://localhost:5000/alta", {
				codigo: med.codigo,
				nombre: med.nombre,
				droga: med.droga,
				tipo: med.tipo
			});
			axios.get("http://localhost:5000/alta").then((res) => console.log(res));

			return Promise.resolve(med);
		},
		update: (data) => {
			var med = medicamentos.find((t) => t.codigo === data.codigo);
			med.nombre = data.nombre;
			med.droga = data.droga;
			return Promise.resolve(med);
		},
		delete: (data) => {
			var med = medicamentos.find((t) => t.codigo === data.codigo);
			var medAux = medicamentos;
			medAux = medAux.filter((t) => t.codigo !== med.codigo);
			setmedicamentos(medAux);
			return Promise.resolve(med);
		},
	};

	const handleSubmit = () => {
		let meds = [
			{
				codigo: 1,
				nombre: "Ibuprofeno",
				droga: "Create an example of how to use the component",
			},
			{
				codigo: 2,
				nombre: "Ejemplo 2",
				droga: "Improve the component!",
			},
		];

		setmedicamentos(meds);
	};

	return (
		<>
			<div style={styles.container}>
				<Form>
					<Row>
						<Col>
							<Form.Group className="mb-3" controlId="formGroupColumna">
								<Form.Select
									aria-label="Columna"
									value={columnabusqueda}
									onChange={(e) => setcolumnabusqueda(e.target.value)}
								>
									<option value="columna">Columna</option>
									<option value="codigo">Codigo</option>
									<option value="nombre">Nombre</option>
									<option value="droga">Droga</option>
									<option value="tipo">Tipo</option>
									<option value="activo">Activo</option>
								</Form.Select>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className="mb-3" controlId="formGroupFiltro">
								<Form.Select
									aria-label="Filtro"
									value={filtrobusqueda}
									onChange={(e) => setfiltrobusqueda(e.target.value)}
								>
									<option value="filtro">Filtro</option>
									<option value="default">Default</option>
									<option value="comienza">Comienza con</option>
									<option value="termina">Termina con</option>
								</Form.Select>
							</Form.Group>
						</Col>

						<Col>
							<Form.Group>
								<Form.Control
									type="text"
									placeholder="Busqueda"
									value={busqueda}
									onChange={(e) => setbusqueda(e.target.value)}
								/>
							</Form.Group>
						</Col>

						<Col>
							<Form.Group>
								<Button
									variant="primary"
									type="button"
									onClick={() => handleSubmit()}
								>
									Buscar
								</Button>
							</Form.Group>
						</Col>
					</Row>
				</Form>

				<CRUDTable caption="Medicamentos" items={medicamentos}>
					<Fields>
						<Field name="codigo" label="Codigo" placeholder="Codigo (XXX-NNNNN-Y)" />
						<Field name="activo" label="Activo" placeholder="Activo" />
						<Field name="nombre" label="Nombre" placeholder="Nombre" />
						<Field name="droga" label="Droga" placeholder="Droga" />
						<Field name="tipo" label="Tipo" placeholder="Tipo" />
					</Fields>
					<CreateForm
						title="Agregar un medicamento"
						trigger="Agregar medicamento"
						onSubmit={(med) => service.create(med)}
						submitText="Agregar"
						validate={(values) => {
							const errors = {};
							if (!values.codigo) {
								errors.codigo = "Ingresar un codigo";
							}

							if (!values.nombre) {
								errors.nombre = "Ingresar un nombre";
							}

							if (!values.droga) {
								errors.droga = "Ingresar una droga";
							}

							if (!values.tipo) {
								errors.droga = "Seleccionar un tipo";
							}

							return errors;
						}}
					/>

					<UpdateForm
						title="Modificar medicamento"
						trigger="Update"
						onSubmit={(med) => service.update(med)}
						submitText="Update"
						validate={(values) => {
							const errors = {};

							if (!values.codigo) {
								errors.codigo = "Ingresar un codigo";
							}

							if (!values.nombre) {
								errors.nombre = "Ingresar un nombre";
							}

							if (!values.droga) {
								errors.droga = "Ingresar una droga";
							}

							if (!values.tipo) {
								errors.droga = "Seleccionar un tipo";
							}

							return errors;
						}}
					/>

					<DeleteForm
						title="Eliminar medicamento"
						trigger="Delete"
						onSubmit={(med) => service.delete(med)}
						submitText="Eliminar"
					/>
				</CRUDTable>
			</div>
		</>
	);
};

TablaMedicamentos.propTypes = {};

ReactDOM.render(<TablaMedicamentos />, document.getElementById("root"));

export default TablaMedicamentos;
