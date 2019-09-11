function hello(){
    console.log("Olá mundo!");
}

function loop(){
    console.log("Handler: loop!");
    var t = new Date().getTime()+10*1000;
    while(new Date().getTime()<t){}
    console.log("Fim do loop!");
}

const _hello = hello;
export { _hello as hello };
const _loop = loop;
export { _loop as loop };