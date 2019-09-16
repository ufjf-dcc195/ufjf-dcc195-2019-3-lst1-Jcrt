var server = require("./server");
var router = require("./router");
let requestHandlers = require("./requestHandlers");

var handlers = {};
handlers["/"] = requestHandlers.hello;
handlers["/index.html"] = requestHandlers.hello;
handlers["/sobre.html"] = requestHandlers.sobre
handlers["/aleatorios.html"] = requestHandlers.aleatorios;
handlers["/primos.html"] = requestHandlers.primos;

// handlers["/primos.html"]
// handlers["/equacao.html"]
// handlers["/xadrez.html"]

handlers["error"] = requestHandlers.error;



server.start(router.route ,handlers);