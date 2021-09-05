const express = require('express');
var cors = require('cors');

const app = express();

app.use(cors({origin: 'http://localhost:3000'}));
app.set("PORT", process.env.PORT || 5000);

app.get("/hello", (req, res) => {
  //example = [{"id": 111}, {"Nombre": "ibuprofeno 600"}, {"Droga": "Feno"}, {"Tipo": "","b","c"];
  var example = "aaaa";
  res.send(example);
})

app.listen(app.get("PORT"), () => {
  console.log("Running!");
})




//Url del .proto del Server
var PROTO_PATH = __dirname + '/../../Server/rcp-servidor/src/main/resources/farmacia.proto';

//Librerias de grpc
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
const axios = require('axios');

var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });

//Carga del package del proto
var proto = grpc.loadPackageDefinition(packageDefinition);

// function main() {
//   //Conexion con el Server
//   var farmacia = new proto.farmacia('localhost:9090', grpc.credentials.createInsecure());

//   //Llamado al metodo de alta
//   farmacia.alta({id: 'you', nombreMedicamento: 'you'}, function(err, response) {
//     console.log(response);
//     //console.log(err);
//   });
// }

// main();

//Conexion con el Server
var farmacia = new proto.farmacia('localhost:9090', grpc.credentials.createInsecure());

//Llamado al metodo de alta
farmacia.alta({id: 'you', nombreMedicamento: 'you'}, function(err, response) {
  console.log(response);
  //console.log(err);
});