var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");

//Url del .proto del Server
var PROTO_PATH =__dirname + "/../../Server/rcp-servidor/src/main/proto/farmacia.proto";
//var PROTO_PATH = __dirname + "/../../Server/rcp-servidor/grpc-server-prueba-de-concepto/src/main/proto/farmacia.proto";

//Carga del package del proto
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
	keepCase: true,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true,
});

var proto = grpc.loadPackageDefinition(packageDefinition);

//Conexion con el Server
var farmacia = new proto.farmacia(
	"localhost:6565",
	grpc.credentials.createInsecure()
);

module.exports = farmacia;