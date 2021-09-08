//Importaciones de librerias
const express = require("express");
var cors = require("cors");
const axios = require("axios");
const farmacia = require('./configuraciones');

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

//Alta de medicamento
function altaMedicamento(codigo, nombre, droga, tipo) {
	farmacia.alta({ codigo: codigo, nombre: nombre, droga: droga, tipo: tipo}, function (err, response) {
		
    //Envia la respuesta a la vista
    app.get("/altamedicamento", (req, res) => {
      res.send(response);
    });

		console.log("Mensaje: " + response.responseMessage + "\n");
	});
}

function altaCategoriaMedicamento(id, nombre, activo) {
	farmacia.altaTipo({ id: id, nombre: nombre, baja: activo}, function (err, response) {
		
    //Envia la respuesta a la vista
    app.get("/altatipomedicamento", (req, res) => {
      res.send(response);
    });

		console.log("Mensaje: " + response.responseMessage + "\n");
	});
}

function bajaCategoriaMedicamento(id, activo) {
	farmacia.bajaTipo({ id: id, baja: activo}, function (err, response) {
		
    //Envia la respuesta a la vista
    app.get("/bajatipomedicamento", (req, res) => {
      res.send(response);
    });

		console.log("Mensaje: " + response.responseMessage + "\n");
	});
}

function busquedaMedicamento(columna, filtro, busqueda) {
	//MODIFICAR METODO
	farmacia.busquedaPorPalabra({ columna: columna, filtro: filtro, busqueda: busqueda}, function (err, response) {
		
    //Envia la respuesta a la vista
    app.get("/busquedamedicamento", (req, res) => {
      res.send(response);
    });

		console.log("Mensaje: " + response.responseMessage + "\n");
	});
}


//----LLAMADAS AXIOS----

//Alta medicamento
app.post("/altamedicamento", (req, res) => {
  console.log("Alta medicamento: ")
	console.log(req.body);
	altaMedicamento(req.body.codigo, req.body.nombre, req.body.droga, req.body.tipo);
});

//Alta categoria medicamento
app.post("/altatipomedicamento", (req, res) => {
  console.log("Alta categoria medicamento: ")
	console.log(req.body);
	
	req.body.activo = req.body.activo === "Si" ? 0 : 1;

	altaCategoriaMedicamento(req.body.id, req.body.nombre, req.body.activo);
});

//Baja categoria medicamento
app.post("/bajatipomedicamento", (req, res) => {
  console.log("Baja categoria medicamento: ")
	console.log(req.body);
	
	req.body.activo = req.body.activo === "Si" ? 0 : 1;

	bajaCategoriaMedicamento(req.body.id, req.body.activo);
});

//Busqueda medicamento
app.post("/busquedamedicamento", (req, res) => {
  console.log("Busqueda medicamento: ")
	console.log(req.body);

	busquedaMedicamento(req.body.columna, req.body.filtro, req.body.busqueda);
});



//Inicio de la app
app.listen(app.get("PORT"), () => {
	console.log("Running!");
});
