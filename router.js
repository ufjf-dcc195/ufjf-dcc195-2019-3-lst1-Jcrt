function route (pathname){
    console.log("Rounting: "+pathname);
}

const _route = route;
export { _route as route };
