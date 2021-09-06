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

//Metodo de alta de medicamento
function altaMedicamento(codigo, nombre, droga, tipo) {
	farmacia.alta({ codigo: codigo, nombre: nombre, droga: droga, tipo: tipo}, function (err, response) {
		
    //Envia la respuesta a la vista
    app.get("/alta", (req, res) => {
      res.send(response);
    });

		console.log(response);
	});
}

//Traer los datos de alta de medicamento de la vista al cliente
app.post("/alta", (req, res) => {
  console.log("Alta medicamento: ")
	console.log(req.body);
	altaMedicamento(req.body.codigo, req.body.nombre, req.body.droga, req.body.tipo);
});

app.listen(app.get("PORT"), () => {
	console.log("Running!");
});
