//Importaciones de librerias
const express = require("express");
var cors = require("cors");
const axios = require("axios");
const farmacia = require("./configuraciones");

//Configuraciones de express (sirve para que el cliente funcione como server para comunicarse con la vista)
const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("PORT", process.env.PORT || 5000);

//-------------- FIN DE CONFIGURACIONES --------------------

//Get de prueba
app.get("/hello", (req, res) => {
	res.send("aaaa");
});

//----METODOS----

//Alta medicamento
app.post("/altamedicamento", (req, res) => {
	console.log("Alta medicamento: ");
	console.log(req.body);

	farmacia.alta(
		{
			codigo: req.body.codigo,
			nombre: req.body.nombre,
			droga: req.body.droga,
			tipo: req.body.categoria,
		},
		function (err, response) {
			//Envia la respuesta a la vista
			app.get("/altamedicamento", (req, res) => {
				console.log(response)
			});

			if (response !== undefined) {
				console.log("Mensaje: " + response.responseMessage + "\n");
			} else {
				console.log("Error");
			}

		}
	);
});

//Alta de tipo de medicamento
function altaCategoriaMedicamento(id, nombre) {
	farmacia.altaTipo({ id: id, nombre: nombre }, function (err, response) {
		//Envia la respuesta a la vista
		app.get("/altatipomedicamento", (req, res) => {
			res.send(response);
		});

		console.log("Mensaje: " + response.responseMessage + "\n");
	});
}

//Baja categoria medicamento
app.post("/bajatipomedicamento", (req, res) => {
	console.log("Baja categoria medicamento: ");
	console.log(req.body);

	farmacia.bajaTipo({ id: req.body.id }, function (err, response) {
		//Envia la respuesta a la vista
		// app.get("/bajatipomedicamento", (req, res) => {
		// 	res.send(response);
		// });

		console.log("Mensaje: " + response.responseMessage + "\n");
	});
});


function busquedaMedicamento(columna, filtro, busqueda) {
	//MODIFICAR METODO
	farmacia.busquedaPorPalabra(
		{ columna: columna, filtro: filtro, buscar: busqueda },
		function (err, response) {
			//Envia la respuesta a la vista
			app.get("/busquedamedicamento", (req, res) => {
				res.send(response);
			});

			console.log("Mensaje: " + response.responseMessage + "\n");
		}
	);
}

//Lista de medicamentos
app.get("/listamedicamentos", (req, res) => {
	farmacia.listadoMedicamentos({}, function (err, response) {
		
		res.send(response.responseMessage);
		console.log(response.responseMessage);
	});
});

//Lista de categorias de medicamentos
app.get("/listatiposmedicamentos", (req, res) => {
	farmacia.listadoCodigos({}, function (err, response) {
		
		res.send(response.responseMessage);
		console.log("Lista Categorias");
		console.log(response.responseMessage);
	});
});

function verificarDigito(codigo) {
	farmacia.digitoVerificador({ digito: codigo }, function (err, response) {
		//Envia la respuesta a la vista
		app.get("/verificardigito", (req, res) => {
			res.send(response);
		});

		console.log("Mensaje: " + response + "\n");
	});
}

//----LLAMADAS AXIOS----

//Alta categoria medicamento
app.post("/altatipomedicamento", (req, res) => {
	console.log("Alta categoria medicamento: ");
	console.log(req.body);

	altaCategoriaMedicamento(req.body.id, req.body.nombre);
});

//Busqueda medicamento
app.post("/busquedamedicamento", (req, res) => {
	console.log("Busqueda medicamento: ");
	console.log(req.body);

	busquedaMedicamento(req.body.columna, req.body.filtro, req.body.busqueda);
});

//Lista de tipos de medicamentos
app.get("/listatiposmedicamentos", (req, res) => {
	listaTiposMedicamentos();
});

app.post("/verificardigito", (req, res) => {
	console.log("Verificar digito: ");
	console.log(req.body);

	verificarDigito(req.body.codigo);
});

//Inicio de la app
app.listen(app.get("PORT"), () => {
	console.log("Running!");
});
