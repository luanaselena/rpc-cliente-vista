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

const SORTERS = {
	NUMBER_ASCENDING: (mapper) => (a, b) => mapper(a) - mapper(b),
	NUMBER_DESCENDING: (mapper) => (a, b) => mapper(b) - mapper(a),
	STRING_ASCENDING: (mapper) => (a, b) => mapper(a).localeCompare(mapper(b)),
	STRING_DESCENDING: (mapper) => (a, b) => mapper(b).localeCompare(mapper(a)),
};

const getSorter = (data) => {
	const mapper = (x) => x[data.field];
	let sorter = SORTERS.STRING_ASCENDING(mapper);

	if (data.field === "id") {
		sorter =
			data.direction === "ascending"
				? SORTERS.NUMBER_ASCENDING(mapper)
				: SORTERS.NUMBER_DESCENDING(mapper);
	} else {
		sorter =
			data.direction === "ascending"
				? SORTERS.STRING_ASCENDING(mapper)
				: SORTERS.STRING_DESCENDING(mapper);
	}

	return sorter;
};

const styles = {
	container: { margin: "auto", width: "fit-content" },
};

const TablaMedicamentos = () => {
	let tasks = [
		{
			id: 1,
			nombre: "Create an example",
			descripcion: "Create an example of how to use the component",
		},
		{
			id: 2,
			nombre: "Improve",
			descripcion: "Improve the component!",
		},
	];

	const [medicamentos, setmedicamentos] = useState(tasks);
	const [busqueda, setbusqueda] = useState("");
	const [columnabusqueda, setcolumnabusqueda] = useState("columna");
	const [filtrobusqueda, setfiltrobusqueda] = useState("filtro");

	let count = medicamentos.length;
	const service = {
		fetchItems: (payload) => {
			let result = Array.from(medicamentos);
			result = result.sort(getSorter(payload.sort));
			return Promise.resolve(result);
		},
		create: (med) => {
			count += 1;
			var medAux = medicamentos;
			console.log(medicamentos);
			console.log(medAux);
			medAux.push({
				...med,
				id: count,
			});
			console.log(medAux);
			setmedicamentos(medAux);
			return Promise.resolve(med);
		},
		update: (data) => {
			var med = medicamentos.find((t) => t.id === data.id);
			med.nombre = data.nombre;
			med.descripcion = data.descripcion;
			return Promise.resolve(med);
		},
		delete: (data) => {
			var med = medicamentos.find((t) => t.id === data.id);
			var medAux = medicamentos;
			medAux = medAux.filter((t) => t.id !== med.id);
			setmedicamentos(medAux);
			return Promise.resolve(med);
			// const task = medicamentos.find((t) => t.id === data.id);
			// const medRestantes = medicamentos.filter((t) => t.id !== task.id);
			// setmedicamentos(medRestantes);
			// return Promise.resolve(task);
		},
	};

	//axios.get("http://localhost:5000/hello").then((res) => console.log(res));

	const handleSubmit = () => {
		let meds = [
			{
				id: 1,
				nombre: "Ibuprofeno",
				descripcion: "Create an example of how to use the component",
			},
			{
				id: 2,
				nombre: "Ejemplo 2",
				descripcion: "Improve the component!",
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
									<option value="id">ID</option>
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
						<Field name="id" label="Id" hideInCreateForm readOnly />
						<Field name="activo" label="Activo" placeholder="Activo" />
						<Field name="nombre" label="Nombre" placeholder="Nombre" />
						<Field name="descripcion" label="Droga" placeholder="Droga" />
						<Field name="tipo" label="Tipo" placeholder="Tipo" />
					</Fields>
					<CreateForm
						title="Agregar un medicamento"
						trigger="Agregar medicamento"
						onSubmit={(med) => service.create(med)}
						submitText="Agregar"
						validate={(values) => {
							const errors = {};
							if (!values.nombre) {
								errors.nombre = "Please, provide task's title";
							}

							if (!values.descripcion) {
								errors.descripcion = "Please, provide task's description";
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

							if (!values.nombre) {
								errors.nombre = "Please, provide task's title";
							}

							if (!values.descripcion) {
								errors.descripcion = "Please, provide task's description";
							}

							return errors;
						}}
					/>

					<DeleteForm
						title="Eliminar medicamento"
						trigger="Delete"
						onSubmit={(med) => service.delete(med)}
						submitText="Eliminar"
						validate={(values) => {
							const errors = {};
							if (!values.id) {
								errors.id = "Please, provide id";
							}
							return errors;
						}}
					/>
				</CRUDTable>
			</div>
		</>
	);
};

TablaMedicamentos.propTypes = {};

ReactDOM.render(<TablaMedicamentos />, document.getElementById("root"));

export default TablaMedicamentos;
