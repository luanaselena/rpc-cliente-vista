import React from "react";
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

let tasks = [
	{
		id: 1,
		title: "Create an example",
		description: "Create an example of how to use the component",
	},
	{
		id: 2,
		title: "Improve",
		description: "Improve the component!",
	},
];

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

let count = tasks.length;
const service = {
	fetchItems: (payload) => {
		let result = Array.from(tasks);
		result = result.sort(getSorter(payload.sort));
		return Promise.resolve(result);
	},
	create: (task) => {
		count += 1;
		tasks.push({
			...task,
			id: count,
		});
		return Promise.resolve(task);
	},
	update: (data) => {
		const task = tasks.find((t) => t.id === data.id);
		task.title = data.title;
		task.description = data.description;
		return Promise.resolve(task);
	},
	delete: (data) => {
		const task = tasks.find((t) => t.id === data.id);
		tasks = tasks.filter((t) => t.id !== task.id);
		return Promise.resolve(task);
	},
};

const styles = {
	container: { margin: "auto", width: "fit-content" },
};

const Tabla = () => {
	axios.get("http://localhost:5000/hello").then((res) => console.log(res));


	const handleSubmit = () => {
		console.log("submit")
	}

	return (
		<div style={styles.container}>
			<Form>
				<Row>
					<Col>
						<Form.Group className="mb-3" controlId="formGroupColumna">
							<Form.Label>Columna</Form.Label>
							<Form.Select aria-label="Columna">
								<option>Columna</option>
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
							<Form.Label>Filtro</Form.Label>
							<Form.Select aria-label="Default select example">
								<option>Open this select menu</option>
								<option value="1">Default</option>
								<option value="2">Comienza con</option>
								<option value="3">Termina con</option>
							</Form.Select>
						</Form.Group>
					</Col>

					<Col>
						<Form.Group>
							<Form.Control type="text" placeholder="Busqueda" />
						</Form.Group>
					</Col>

					<Col>
						<Form.Group>
							<Button variant="primary" type="button" onClick={() => handleSubmit()}>
								Submit
							</Button>
						</Form.Group>
					</Col>
				</Row>
			</Form>

			<CRUDTable
				caption="Medicamentos"
				fetchItems={(payload) => service.fetchItems(payload)}
			>
				<Fields>
					<Field name="id" label="Id" hideInCreateForm readOnly />
					<Field name="activo" label="Activo" placeholder="Activo" />
					<Field name="title" label="Nombre" placeholder="Nombre" />
					<Field name="description" label="Droga" placeholder="Droga" />
					<Field name="tipo" label="Tipo" placeholder="Tipo" />
				</Fields>
				<CreateForm
					title="Agregar un medicamento"
					trigger="Agregar medicamento"
					onSubmit={(task) => service.create(task)}
					submitText="Agregar"
					validate={(values) => {
						const errors = {};
						if (!values.title) {
							errors.title = "Please, provide task's title";
						}

						if (!values.description) {
							errors.description = "Please, provide task's description";
						}

						return errors;
					}}
				/>

				<UpdateForm
					title="Task Update Process"
					message="Update task"
					trigger="Update"
					onSubmit={(task) => service.update(task)}
					submitText="Update"
					validate={(values) => {
						const errors = {};

						if (!values.id) {
							errors.id = "Please, provide id";
						}

						if (!values.title) {
							errors.title = "Please, provide task's title";
						}

						if (!values.description) {
							errors.description = "Please, provide task's description";
						}

						return errors;
					}}
				/>

				<DeleteForm
					title="Task Delete Process"
					message="Are you sure you want to delete the task?"
					trigger="Delete"
					onSubmit={(task) => service.delete(task)}
					submitText="Delete"
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
	);
};

Tabla.propTypes = {};

ReactDOM.render(<Tabla />, document.getElementById("root"));

export default Tabla;
