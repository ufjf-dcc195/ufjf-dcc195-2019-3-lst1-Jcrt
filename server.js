import { createServer } from "http";
import { parse } from "url";

function start(route){
    function onRequest(request, response){
          console.log("Requisição recebida");
          route(parse(request.url).pathname);
          response.writeHead(200, {"Content-Type": "text/plain"});
          response.write("Olá Mundo", "utf-8");
          response.end();
    }

    createServer(onRequest).listen(8888);
    console.log("Servidor iniciado em localhost:8888");
}
const _start = start;
export { _start as start };
