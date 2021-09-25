import React, {useState, useEffect} from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import CRUDTable, {
	Fields,
	Field,
	CreateForm,
	UpdateForm,
	DeleteForm,
} from "react-crud-table";

// Component's Base CSS
import "./index.css";

const styles = {
	container: { margin: "auto", width: "fit-content" },
};

const TablaTipoMedicamentos = () => {

	const [categorias, setcategorias] = useState([]);

	const fetchTiposMedicamentos = async () => {
		const resultTipos = await axios.get(
			"http://localhost:5000/listatiposmedicamentos"
		);
		console.log(resultTipos.data);

		resultTipos.data.forEach(c => {
			if(c.baja === false){
				c.baja = "Si"
			} else {
				c.baja = "No"
			}
		})

		setcategorias(resultTipos.data);
	};

	useEffect(() => {
		fetchTiposMedicamentos();
	}, []);

	const service = {
		create: async (med) => {
			axios.post("http://localhost:5000/altatipomedicamento", {
				nombre: med.nombre,
			});
			
			window.location.reload();

			return Promise.resolve(med);
		},
		update: (data) => {
			var med = categorias.find((t) => t.id === data.id);
			med.nombre = data.nombre;
			med.activo = data.activo;
			return Promise.resolve(med);
		},
		changeStatus: (data) => {

			axios.post("http://localhost:5000/bajatipomedicamento", {
				id: data.id
			});

			window.location.reload();

			return Promise.resolve(data);
		},
	};


	return (
		<div style={styles.container}>

			<CRUDTable
				caption="Tipos de medicamentos"
				items={categorias}
			>
				<Fields>
					<Field name="id" label="Id" hideInCreateForm readOnly />
          <Field name="nombre" label="Nombre" placeholder="Nombre" />
					<Field name="baja" label="Activo" placeholder="Activo" hideInCreateForm/>
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
						return errors;
					}}
				/>

				<UpdateForm
					title="Modificar medicamento"
					trigger="Update"
					//onSubmit={(med) => service.update(med)}
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
