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

	const categorias = ["Capsulas", "Comprimidos", "Cremas"];

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

			axios.post("http://localhost:5000/altamedicamento", {
				codigo: med.codigo,
				nombre: med.nombre,
				droga: med.droga,
				tipo: med.tipo,
			});
			axios
				.get("http://localhost:5000/altamedicamento")
				.then((res) => console.log(res));

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

	const handleSubmit = (e) => {
		e.preventDefault();

		var medAux = medicamentos;

		switch (columnabusqueda) {
			case "codigo":
				if (filtrobusqueda === "default") {
					medAux = medAux.filter((m) =>
						m.codigo.toLowerCase().includes(busqueda.toLowerCase())
					);
				} else if (filtrobusqueda === "comienza") {
					medAux = medAux.filter((m) =>
						m.codigo.toLowerCase().startsWith(busqueda.toLowerCase())
					);
				}
				break;
			case "nombre":
				if (filtrobusqueda === "default") {
					medAux = medAux.filter((m) =>
						m.nombre.toLowerCase().includes(busqueda.toLowerCase())
					);
				} else if (filtrobusqueda === "comienza") {
					medAux = medAux.filter((m) =>
						m.nombre.toLowerCase().startsWith(busqueda.toLowerCase())
					);
				}
				break;
			case "droga":
				if (filtrobusqueda === "default") {
					medAux = medAux.filter((m) =>
						m.droga.toLowerCase().includes(busqueda.toLowerCase())
					);
				} else if (filtrobusqueda === "comienza") {
					medAux = medAux.filter((m) =>
						m.droga.toLowerCase().startsWith(busqueda.toLowerCase())
					);
				}
				break;
			case "tipo":
				if (filtrobusqueda === "default") {
					medAux = medAux.filter((m) =>
						m.tipo.toLowerCase().includes(busqueda.toLowerCase())
					);
				} else if (filtrobusqueda === "comienza") {
					medAux = medAux.filter((m) =>
						m.tipo.toLowerCase().startsWith(busqueda.toLowerCase())
					);
				}
				break;

			default:
				//Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
				break;
		}

		setmedicamentos(medAux);

		axios.post("http://localhost:5000/busquedamedicamento", {
			columna: columnabusqueda,
			filtro: filtrobusqueda,
			busqueda: busqueda,
		});
		axios
			.get("http://localhost:5000/busquedamedicamento")
			.then((res) => console.log(res));
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
									onClick={(e) => handleSubmit(e)}
								>
									Buscar
								</Button>
							</Form.Group>
						</Col>
					</Row>
				</Form>

				<CRUDTable caption="Medicamentos" items={medicamentos}>
					<Fields>
						<Field
							name="codigo"
							label="Codigo"
							placeholder="Codigo (XXX-NNNNN-Y)"
						/>
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

							if (!values.tipo || !categorias.includes(values.tipo)) {
								errors.tipo =
									"Ingrese un tipo entre los siguientes: " + categorias;
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
								errors.tipo = "Tipos a elegir: ";
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
