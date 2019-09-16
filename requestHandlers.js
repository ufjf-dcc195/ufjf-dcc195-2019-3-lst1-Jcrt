const urlModule = require("url");
const queryStrModule = require("querystring");

//Action: GET
function hello(request, response){
    response.write("<h1>Hello World</h1>");
}

//Action: GET
function sobre(request, response){
    response.write("<h1>Sobre o aluno</h1>");
    response.write("<b>Nome: </b> Julio Cesar Rosa Trindade<br />");
    response.write("<b>Matrícula: </b> 201376082<br />");
    response.write("<b>E-mail: </b> jtrindade@ice.ufjf.br<br />");
    response.write("<b>Curso: </b> Bacharelado em Sistemas de Informação<br />");
}

//Action: GET
function aleatorios(request, response){
    let range = 100;
    let listaPar = [];
    let listaImpar = [];

    for(i = 0; i < range; i++){
        let number = Math.floor(Math.random() * 10000);
        if(( parseInt(number) % 2) == 0){
            listaPar.push(number);
        }
        else{
            listaImpar.push(number);
        }
    }
    response.write(printList("Lista de números pares", listaPar));
    response.write(printList("Lista de números ímpares", listaImpar));
}

//Action: GET
function primos(request, response){
    let primosQueryStr = getQueryString(request.url);
    
    if(isParamPrimosValido(primosQueryStr.inicio) && isParamPrimosValido(primosQueryStr.fim) && primosQueryStr.inicio <= primosQueryStr.fim){
        response.write(
            printList(
                `Lista de números primos no intervalo de ${primosQueryStr.inicio} a ${primosQueryStr.fim}`, 
                crivoErtostenes(primosQueryStr.inicio, primosQueryStr.fim)
            )
        );
    } else {
        response.write(`Os parâmetros inicio=${primosQueryStr.inicio} e fim=${primosQueryStr.fim} são inválidos`);
    }
}

function equacao(request, response){
    
}

//Action: GET
function error(request, response){
    response.write("<h1>Esta página que está procurando não existe   =( </h1>");
}

function isParamPrimosValido(param){
    if(param != undefined && !isNaN(param) && param > 0 && param < 100){
        return true
    }
    return false;
}

function printList(listName, list){
    let listaStr = `<table><tr><th>#</th><th>${listName}</th>`;
    for(i = 0; i < list.length; i++){
        listaStr += printListItem(list[i], i);
    }
    listaStr += "</table>";
    return listaStr;
}

function printListItem(listItem, index){
    let str = `<tr><td>${index + 1}: </td><td>${listItem}</td></tr>`;
    return str;
}

function crivoErtostenes(numInicial, numFinal){
    let primos = [];
    
    //Inicio a lista com 1 porque 1 não é primo nunca
    let naoPrimos = [1];
    
    //Tem que fazer cast para Int no i porque o que vem da querystr vem como String
    numInicial = parseInt(numInicial);
    numFinal = parseInt(numFinal);

    //Inicializando o array com o intervalo de números começando de 2, porque 2 é o primeiro que faz sentido
    if(numInicial <= numFinal){
        for(let i = 2; i < numFinal; i++){
            //divido o i pelo número final e pego a parte inteira para saber quantas iterações preciso fazer
            let maxIter = numFinal / i;
            //Todos os números que estiverem aqui não serão primos, pois são multiplos de um número da lista dentro do intervalo estabelecido
            for(let j = 2; j < maxIter; j++){
                naoPrimos.push(i * j);
            }
        }
    }

    //Obtendo apenas os números distintos em ordem crescente (pra facilitar a visualização)
    naoPrimos = [...new Set(naoPrimos)].sort(function(a, b){
        return a-b;
    });

    //Monto a lista de primos no intervalo passado verificando se cada número do intervalo não está na lista de não-primos
    for(let i = numInicial; i < numFinal; i++){
        if(!naoPrimos.includes(i))
            primos.push(i);
    }

    return primos;
}

function getQueryString(_url){
    return(
        queryStrModule.parse(
            urlModule.parse(_url).query
        )
    );
}

exports.hello = hello;
exports.sobre = sobre;
exports.aleatorios = aleatorios;
exports.primos = primos;

exports.error = error;