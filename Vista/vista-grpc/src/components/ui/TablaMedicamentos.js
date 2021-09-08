import React, { useState, useEffect } from "react";
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
	let medicamentosIniciales = [
		{
			codigo: "AIC-23142-4",
			nombre: "Actron",
			droga: "Ibuprofeno",
			tipo: "Capsulas blandas",
		},
		{
			codigo: "AIC-42182-8",
			nombre: "Actron",
			droga: "Ibuprofeno",
			tipo: "Comprimidos",
		},
		{
			codigo: "RCC-74512-1",
			nombre: "Rivotril",
			droga: "Clonazepam",
			tipo: "Comprimidos",
		},
		{
			codigo: "IIC-58403-2",
			nombre: "Ibuevanol",
			droga: "Ibuprofeno",
			tipo: "Capsulas blandas",
		},
		{
			codigo: "LBC-49320-9",
			nombre: "Laxamin",
			droga: "Bisacodilo",
			tipo: "Comprimidos",
		},
		{
			codigo: "KSC-92325-3",
			nombre: "Ketorolac",
			droga: "Sinalgico",
			tipo: "Capsulas blandas",
		},
		{
			codigo: "TPC-32473-1",
			nombre: "Tafirol",
			droga: "Paracetamol",
			tipo: "Capsulas blandas",
		},
		{
			codigo: "OOC-08123-5",
			nombre: "Omeprasec",
			droga: "Omeprazol",
			tipo: "Capsulas blandas",
		},
		{
			codigo: "DIC-51325-7",
			nombre: "Desinflamasol",
			droga: "Ibuprofeno",
			tipo: "Crema",
		},
	];

	let categorias = [
		"Capsulas blandas",
		"Comprimidos",
		"Crema",
		"Aerosol",
		"Pomada",
	];

	const [medicamentos, setmedicamentos] = useState(medicamentosIniciales);
	const [busqueda, setbusqueda] = useState("");
	const [columnabusqueda, setcolumnabusqueda] = useState("columna");
	const [filtrobusqueda, setfiltrobusqueda] = useState("filtro");

	// useEffect(() => {
	// 	axios.get("http://localhost:5000/listamedicamentossocilitud");

	// 	axios
	// 		.get("http://localhost:5000/listamedicamentosrespuesta")
	// 		.then((res) => {
	// 			//console.log(res.data.responseMessage);
	// 			//Transformar listado en JSON
	// 			var resp = res.data.responseMessage;
	// 			resp = resp.replace(/'/g, "@");
	// 			resp = resp.replace(/"/g, "'");
	// 			resp = resp.replace(/@/g, '"');
	// 			console.log(resp);
	// 			resp = JSON.parse(resp);
	// 			console.log(resp);
	// 			//setmedicamentos(resp);
	// 		});
	// }, []);

	const service = {
		create: (med) => {
			var medAux = medicamentos;
			medAux.push({
				...med,
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
				.then((res) => console.log(res.data.responseMessage));

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
			.then((res) => console.log(res.data.responseMessage));
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
