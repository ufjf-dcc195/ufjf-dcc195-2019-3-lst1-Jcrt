var server = require("./server");
var router = require("./router");
let requestHandlers = require("./requestHandlers");

var handlers = {};
handlers["/"] = requestHandlers.hello;
handlers["error"] = requestHandlers.error;
handlers["/index.html"] = requestHandlers.hello;
handlers["/sobre.html"] = requestHandlers.sobre
handlers["/aleatorios.html"] = requestHandlers.aleatorios;
handlers["/primos.html"] = requestHandlers.primos;
handlers["/equacao.html"] = requestHandlers.equacao;
handlers["/xadrez.html"] = requestHandlers.xadrez;

//Caso especial para xadrez
handlers["/xadrez.json"] = requestHandlers.getJsonHorse;
handlers["/xadrez.json"]["contentType"] = "application/json";


server.start(router.route ,handlers);