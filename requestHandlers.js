function hello(request, response){
    response.write("<h1>Hello World</h1>");
}

function sobre(request, response){
    response.write("<h1>Sobre o aluno</h1>");
    response.write("<b>Nome: </b> Julio Cesar Rosa Trindade<br />");
    response.write("<b>Matrícula: </b> 201376082<br />");
    response.write("<b>E-mail: </b> jtrindade@ice.ufjf.br<br />");
    response.write("<b>Curso: </b> Bacharelado em Sistemas de Informação<br />");
}

function error(request, response){
    response.write("<h1>Esta página que está procurando não existe   =( </h1>");
}

exports.hello = hello;
exports.sobre = sobre;

exports.error = error;