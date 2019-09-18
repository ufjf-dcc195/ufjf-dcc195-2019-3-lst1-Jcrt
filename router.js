function route (pathname, handlers, request, response){
    if(typeof handlers[pathname] == 'function'){
        handlers[pathname](request, response);
    } else {
       handlers["error"](request, response);
    }
}

exports.route = route;
