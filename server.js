var http = require("http");
var url = require("url");
let port = process.env.PORT || process.argv[2] || 8080;
function start(route, handlers){
  function onRequest(request, response){
    route(url.parse(request.url).pathname, handlers, request, response);
  }
  http.createServer(onRequest).listen(port);
  console.log(`Servidor iniciado em localhost: ${port}`);
}
exports.start = start
