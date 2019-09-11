var http = require("http");
var url = require("url");
function start(route){
    function onRequest(request, response){
          console.log("Requisição recebida");
          route(url.parse(request.url).pathname);
          response.writeHead(200, {"Content-Type": "text/plain"});
          response.write("Olá Mundo");
          response.end();
  }
    http.createServer(onRequest).listen(8888);
    console.log("Servidor iniciado em localhost:8888");
}
exports.start = start
