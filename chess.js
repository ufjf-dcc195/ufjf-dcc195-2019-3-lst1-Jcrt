function calcHorse(linha, coluna){
    let horsePos;
    if(isInRange(coluna) && isInRange(linha)){
        horsePos = {
            x: linha, 
            y: coluna,
            targets: defineTargets(linha, coluna)
        };    
    }
    return horsePos;
}

function getJsonHorse(linha, coluna){
    let horsePos = calcHorse(linha, coluna);
    if(horsePos == undefined)
        horsePos = {
            "ErrorMessage": "Devem ser passadas, via método GET, as variáveis x e y com valor entre 1 a 8"
        };

    return JSON.stringify(horsePos);
}

function drawBoard(linha, coluna){
    let squareSize = 60;
    let horsePos = calcHorse(coluna, linha);

    let out = "<table style='border: 3px solid gray' cellpadding='0' cellspacing='0'>";
    for(let i=1; i<9;i++){
        out += "<tr>";
        for(let j=1;j<9;j++){
            let styleTd = "style='width: " + squareSize + "px; height: " + squareSize + "px; " + setBackgroundWithHorse(horsePos, i, j) + "'";
            out += "<td " + styleTd + "></td>";
        }
        out += "</tr>";
    }
    out += "</table>";
    return out;
}

function setBackgroundWithHorse(horsePos, x, y){
    let background =  `background: ` + ((x + y)%2 == 0 ? 'white' : 'black');
    if(horsePos != undefined){
        if(x == horsePos.x &&  y == horsePos.y){
            background = "background-image: url\(\"https:\/\/www.pinclipart.com\/picdir\/middle/\191-1916865_horse-chess-piece-knight-comments-knight-chess-piece.png"\); background: red";
        }
        else if(isHorseTarget(horsePos, x, y)){
            background = `background: green`;
        }
    }
    return background;
}

function defineTargets(x, y){
    let targets = [];
    let horseBehavior = [
        { x: 1, y: 2 }, 
        { x: 2, y: 1 }
    ];

    horseBehavior.forEach((obj) => {
        targets.push({ x: (parseInt(x) - parseInt(obj.x)), y: (parseInt(y) - parseInt(obj.y)) });
        targets.push({ x: (parseInt(x) + parseInt(obj.x)), y: (parseInt(y) - parseInt(obj.y)) });
        targets.push({ x: (parseInt(x) - parseInt(obj.x)), y: (parseInt(y) + parseInt(obj.y)) });
        targets.push({ x: (parseInt(x) + parseInt(obj.x)), y: (parseInt(y) + parseInt(obj.y)) });
    });

    let filtered = targets.filter(function(value, index, arr){
        return validateTargets(value);
     });

    return filtered;
}

function isHorseTarget(horsePos, x, y){
    return horsePos.targets.filter(function(value, index, arr){
        return (value.x == x && value.y == y);
    }).length > 0;
}

function validateTargets(target){
    return (isInRange(target.x) && isInRange(target.y));
}

function isInRange(pos){
    pos = parseInt(pos);
    if(pos > 0 && pos < 9){
        return true;
    }
    return false;
}

exports.drawBoard = drawBoard;
exports.getJsonHorse = getJsonHorse;
