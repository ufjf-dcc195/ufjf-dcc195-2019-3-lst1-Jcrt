function route (pathname, handlers, request, response){
    
    let contentType = (handlers[pathname]["contentType"] == undefined ? 'text/html': handlers[pathname]["contentType"]);
    response.writeHead(200, {
        "Content-Type": `${contentType}; charset=utf-8`, 
    });

    if(typeof handlers[pathname] == 'function'){
        handlers[pathname](request, response);
    } else {
       handlers["error"](request, response);
    }

    response.end();
}

exports.route = route;
