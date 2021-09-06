import React, {useState} from "react";
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


const TablaTipoMedicamentos = () => {
	
	let tasks = [
		{
			id: 1,
			nombre: "Capsulas blandas",
      activo: "Si"
		},
		{
			id: 2,
			nombre: "Improve",
      activo: "Si"
		},
	];

	const [tipomedicamentos, settipomedicamentos] = useState(tasks);
	const [busqueda, setbusqueda] = useState("");
	const [columnabusqueda, setcolumnabusqueda] = useState("columna");
	const [filtrobusqueda, setfiltrobusqueda] = useState("filtro");
	

	let count = tipomedicamentos.length;
	const service = {
		fetchItems: (payload) => {
			let result = Array.from(tipomedicamentos);
			result = result.sort(getSorter(payload.sort));
			return Promise.resolve(result);
		},
		create: (med) => {
			count += 1;
			var medAux = tipomedicamentos;
			medAux.push({
				...med,
				id: count,
			})
			settipomedicamentos(medAux);
			return Promise.resolve(med);
		},
		update: (data) => {
			var med = tipomedicamentos.find((t) => t.id === data.id);
			med.nombre = data.nombre;
			med.activo = data.activo;
			return Promise.resolve(med);
		},
		changeStatus: (data) => {
			var med = tipomedicamentos.find((t) => t.id === data.id);
			med.activo = med.activo === "Si" ? "No" : "Si";
			return Promise.resolve(med);
		},
	};



	const handleSubmit = () => {

		let meds = [
			{
				id: 1,
				nombre: "Capsula",
			},
			{
				id: 2,
				nombre: "Injectable",
			},
		];

		settipomedicamentos(meds);
	}

	return (
		<div style={styles.container}>
			<Form>
				<Row>
					<Col>
						<Form.Group className="mb-3" controlId="formGroupColumna">
							<Form.Select aria-label="Columna" value={columnabusqueda} onChange={e => setcolumnabusqueda(e.target.value)}>
								<option value="columna">Columna</option>
								<option value="id">ID</option>
								<option value="nombre">Nombre</option>
							</Form.Select>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group className="mb-3" controlId="formGroupFiltro">
							<Form.Select aria-label="Filtro" value={filtrobusqueda} onChange={e => setfiltrobusqueda(e.target.value)}>
								<option value="filtro">Filtro</option>
								<option value="default">Default</option>
								<option value="comienza">Comienza con</option>
								<option value="termina">Termina con</option>
							</Form.Select>
						</Form.Group>
					</Col>

					<Col>
						<Form.Group>
							<Form.Control type="text" placeholder="Busqueda" value={busqueda} onChange={e => setbusqueda(e.target.value)} />
						</Form.Group>
					</Col>

					<Col>
						<Form.Group>
							<Button variant="primary" type="button" onClick={() => handleSubmit()}>
								Buscar
							</Button>
						</Form.Group>
					</Col>
				</Row>
			</Form>

			<CRUDTable
				caption="Tipos de medicamentos"
				items={tipomedicamentos}
			>
				<Fields>
					<Field name="id" label="Id" hideInCreateForm readOnly />
          <Field name="nombre" label="Nombre" placeholder="Nombre" />
					<Field name="activo" label="Activo" placeholder="Activo" />
				</Fields>
				<CreateForm
					title="Agregar un tipo de medicamento"
					trigger="Agregar tipo de medicamento"
					onSubmit={(med) => service.create(med)}
					submitText="Agregar"
					validate={(values) => {
						const errors = {};
						if (!values.nombre) {
							errors.nombre = "Ingrese un nombre";
						}

            if (!values.activo || (values.activo !== "Si" && values.activo !== "No")) {
							errors.activo = "Ingrese Si o No";
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
							errors.nombre = "Ingrese un nombre";
						}

            if (!values.activo || (values.activo !== "Si" && values.activo !== "No")) {
							errors.activo = "Ingrese Si o No";
						}
						return errors;
					}}
				/>

				<DeleteForm
					title="Cambiar estado del medicamento (activo/inactivo)"
					trigger="Cambiar activo"
					onSubmit={(med) => service.changeStatus(med)}
					submitText="Cambiar estado"
				/>
			</CRUDTable>
		</div>
	);
};

TablaTipoMedicamentos.propTypes = {};

ReactDOM.render(<TablaTipoMedicamentos />, document.getElementById("root"));

export default TablaTipoMedicamentos;
