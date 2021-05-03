function errorCargarTabla(id, error) {

    document.getElementById('colT' +id).remove();
    $('#rowGraficas' + id).append('<div id=colT' + id + ' class=" ">');
    $('#colT' + id).addClass("p-4 p-md-1 mt-2 item2 ordenar1 text-end");
    $('#colT' + id).append('<h3 class="text-center" >Error al cargar la tabla: '+error+'</h3>');
}

function errorCargarGrafica(id, error) {

    document.getElementById('colG' + id).remove();
    $('#rowGraficas' + id).append('<div id=colG' + id + ' class=" ">');
    $('#colG' + id).addClass("p-4 p-md-1 mt-2 item2 ordenar1 text-end");
    $('#colG' + id).append('<h3 class="text-center" >Error al cargar la grafica: '+error+'</h3>');
}

function errorCargarGraficaP(id, error) {

    document.getElementById('colGp' + id).remove();
    $('#rowGraficas' + id).append('<div id=colGp' + id + ' class=" ">');
    $('#colGp' + id).addClass("p-4 p-md-1 mt-2 item2 ordenar1 text-end");
    $('#colGp' + id).append('<h3 class="text-center" >Error al cargar la grafica: '+error+'</h3>');
}

