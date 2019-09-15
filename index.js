var server = require("./server");
var router = require("./router");
let requestHandlers = require("./requestHandlers");

var handlers = {};
handlers["/"] = requestHandlers.hello;
handlers["/index.html"] = requestHandlers.hello;
handlers["/sobre.html"] = requestHandlers.sobre

// handlers["/aleatorios.html"]
// handlers["/primos.html"]
// handlers["/equacao.html"]
// handlers["/xadrez.html"]

handlers["error"] = requestHandlers.error;



server.start(router.route ,handlers);