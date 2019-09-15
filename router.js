function route (pathname, handlers, request, response){
    response.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8", 
    });

    if(typeof handlers[pathname] == 'function'){
        handlers[pathname](request, response);
    } else{
       handlers["error"](request, response);
    }

    response.end();
}

exports.route = route;
