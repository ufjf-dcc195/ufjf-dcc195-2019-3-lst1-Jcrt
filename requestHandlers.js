const urlModule = require("url");
const queryStrModule = require("querystring");
const chessModule = require("./chess");

//Action
function hello(request, response){
    response.writeHead(200, {"Content-Type": `text/html; charset=utf-8`});
    response.write("<h1>DCC195 - Laboratório de sistemas web III</h1>");
    response.write("<ol>")
    response.write("<li><a href='/sobre.html'>Sobre</a></li>");
    response.write("<li><a href='/aleatorios.html'>Números aleatórios</a></li>");
    response.write("<li><a href='/primos.html?inicio=1&fim=99'>Números primos (link predefinido para mostrar de 1 a 99)</a></li>");
    response.write("<li><a href='/equacao.html'>Equação do segundo grau</a></li>");
    response.write("<li><a href='/xadrez.html'>Xadrez</a></li>");
    response.write("</ol>");
    response.end();
}

//Action
function sobre(request, response){
    response.writeHead(200, {"Content-Type": `text/html; charset=utf-8`});
    response.write("<h1>Sobre o aluno</h1>");
    response.write("<b>Nome: </b> Julio Cesar Rosa Trindade<br />");
    response.write("<b>Matrícula: </b> 201376082<br />");
    response.write("<b>E-mail: </b> jtrindade@ice.ufjf.br<br />");
    response.write("<b>Curso: </b> Bacharelado em Sistemas de Informação<br />");
    response.end();
}

//Action
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
    response.writeHead(200, {"Content-Type": `text/html; charset=utf-8`});
    response.write("<table><tr><td style='vertical-align: top'>");
    response.write(printList("Lista de números pares", listaPar));
    response.write("</td><td style='vertical-align: top'>");
    response.write(printList("Lista de números ímpares", listaImpar));
    response.write("</td></tr></table>");
    response.end();
}

//Action
function primos(request, response){
    let primosQueryStr = getQueryString(request.url);
    response.writeHead(200, {"Content-Type": `text/html; charset=utf-8`});
    if(isParamPrimosValido(primosQueryStr.inicio) && isParamPrimosValido(primosQueryStr.fim) && primosQueryStr.inicio <= primosQueryStr.fim){
        response.write(
            printList(
                `Lista de números primos no intervalo de ${primosQueryStr.inicio} a ${primosQueryStr.fim}`, 
                crivoErtostenes(primosQueryStr.inicio, primosQueryStr.fim)
            )
        );
    } else {
        response.write(`Os parâmetros para inicio=${primosQueryStr.inicio} e fim=${primosQueryStr.fim} informados são inválidos`);
    }
    response.end();
}

//Action
function equacao(request, response){
    if(request.method == "GET"){
        response.writeHead(200, {"Content-Type": `text/html; charset=utf-8`});
        response.write("<form method='POST' action='/equacao.html'>");
        response.write("<p><input name='a' type='text' placeholder='a' style='width: 40px' />x² + ");
        response.write("<input name='b' type='text' placeholder='b' style='width: 40px'  />x + ");
        response.write("<input name='c' type='text' placeholder='c' style='width: 40px'  /> = 0</p>");
        response.write("<p><input name='Calcular' type='submit' value='submit' /></p>");
        response.write("</form>");
        response.end();
    }
    else if(request.method == "POST"){    
        let bodyStr='?';
        request.on("data", (data) =>{
            bodyStr += data.toString();
        }).on("end", () => {
            let equacao = getQueryString(bodyStr);
            response.writeHead(200, {"Content-Type": `text/html; charset=utf-8`});
            if(isParamEquacaoValido(equacao.a) && isParamEquacaoValido(equacao.b) && isParamEquacaoValido(equacao.c)){
                let raizes = calcRaizesEquacao(parseInt(equacao.a), parseInt(equacao.b), parseInt(equacao.c));
                if(raizes["x1"] != undefined){
                    response.write(`Esta equação tem raiz x1 = ${raizes["x1"]}`);
                    if(raizes["x2"] != undefined)
                        response.write(` e x2 = ${raizes["x2"]}`);
                } else{
                    response.write("Esta equação não tem raízes reais");
                }
            }
            else{
                response.write(`Os valores para a=${equacao.a}, b=${equacao.b} e c=${equacao.c} informados são inválidos`);
            }
            response.end();
        });      
    }
}

//Action
function xadrez(request, response){
    response.writeHead(200, {"Content-Type": `text/html; charset=utf-8`});
    let coords = getQueryString(request.url);
    let x = 0, y = 0;
    if(coords.coluna != undefined){
        x = coords.coluna;
    }
    if(coords.linha != undefined){
        y = coords.linha;
    }
    response.write(chessModule.drawBoard(x, y));
    response.end();
}

//Action
function getJsonHorse(request, response){
    response.writeHead(200, {"Content-Type": `application/json; charset=utf-8`});
    let coords = getQueryString(request.url);
    let x = 0, y = 0;
    if(coords.coluna != undefined){
        x = coords.coluna;
    }
    if(coords.linha != undefined){
        y = coords.linha;
    }
    response.write(chessModule.getJsonHorse(x, y));
    response.end();
}

//Action
function error(request, response){
    response.writeHead(200, {"Content-Type": `text/html; charset=utf-8`});
    response.write("<h1>Esta página que está procurando não existe   =( </h1>");
    response.end();
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

function calcRaizesEquacao(a, b, c){
    let results= [];
    let delta = calcDelta(a, b, c);

    if(delta == 0){
        results["x1"] = calcBhaskara(a, b, delta, false).toFixed(2);
    } else if(delta > 0){
        results["x1"] = calcBhaskara(a, b, delta, false).toFixed(2);
        results["x2"] = calcBhaskara(a, b, delta, true).toFixed(2);
    }
    return results;
}

function calcBhaskara(a, b, delta, isRaizDeltaNegativa){
    let raizDelta = Math.sqrt(delta);
    if(isRaizDeltaNegativa)
        raizDelta = 0 - raizDelta;
    return ((0 - b) + raizDelta) / (2*a)
}

function calcDelta(a, b, c){
    return Math.pow(b,2) - (4 * a * c);
}

function isParamEquacaoValido(param){
    if(param != undefined && !isNaN(param))
        return true;
    return false;
}

exports.hello = hello;
exports.sobre = sobre;
exports.aleatorios = aleatorios;
exports.primos = primos;
exports.equacao = equacao;
exports.xadrez = xadrez;
exports.error = error;
exports.getJsonHorse = getJsonHorse;