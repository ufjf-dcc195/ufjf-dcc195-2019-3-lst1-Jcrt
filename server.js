var http = require("http");
var url = require("url");
let port = process.env.PORT || process.argv[2] || 8080;
function start(route){
    function onRequest(request, response){
          console.log("Requisição recebida");
          route(url.parse(request.url).pathname);
          response.writeHead(200, {"Content-Type": "text/plain"});
          response.write("Olá Mundo");
          response.end();
  }
    http.createServer(onRequest).listen(port);
    console.log(`Servidor iniciado em localhost: ${port}`);
}
exports.start = start
