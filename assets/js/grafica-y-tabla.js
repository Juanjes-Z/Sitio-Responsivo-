$(document).ready(function () {
    let tabla, grafica, estadistica, rutaJson;
    $("#butn").click(function () {
        if (document.getElementById("ContainerGraficas")) {
            document.getElementById("ContainerGraficas").remove();
        }

        fetch("https://mi-escuelamx.com/isad/dashboards/ingresosPorRangoFechasConfiguracion.asp?usuario=Admin&operacion=11").then(resp => {
            resp.json().then(data => {
                for (let i = 0; i < data.length; i++) {
                    console.log(data[i]["estadistica"])
                    tabla = data[i]["tabla"];
                    grafica = data[i]["grafica"];
                    estadistica = data[i]["estadistica"];
                    switch(estadistica){
                        case "01":
                            rutaJson ='https://mi-escuelamx.com/isad/dashboards/ingresosmensuales.asp';
                            break;
                        case "02":
                            rutaJson ='https://mi-escuelamx.com/isad/dashboards/ingresosmensualesnivel.asp';
                            break;
                    }

                    generarTablasyGraficas(rutaJson, tabla, grafica);
                }
            });

        });

    });


    function generarTablasyGraficas(rutaJson, tabla, grafica) {
        let tipoGrafica = "";
        switch(grafica){
            case 1:
                tipoGrafica ="bar";
                break;
            case 2:
                tipoGrafica ="line";
                break;
        }
        let fecha = new Date();
        let idNewChart = fecha.getHours();
        idNewChart = idNewChart + "" + fecha.getMinutes();
        idNewChart = idNewChart + "" + fecha.getSeconds();
        idNewChart = idNewChart + "" + fecha.getMilliseconds();
        //$(".dashboard .container").append('<div class="row" id= row'+idNewChart+'>');

        $('#dashboards').append('  <div id="ContainerGraficas" class="col-12">');
        //Se crea fila donde estara la tabla y grafica
        $('#ContainerGraficas').append(' <div class="" id="rowGraficas' + idNewChart + '"></div>');
        $('#rowGraficas' + idNewChart).addClass("d-flex flex-row row flex-wrap justify-content-center");

        //Se crea columna y Grafica
        if(grafica != 0){
            $('#rowGraficas' + idNewChart).append('<div id=col' + idNewChart + ' class="ordenar1 text-end">');
            $('#col' + idNewChart).addClass("p-4 p-md-1 mt-2 item");
            $('#col' + idNewChart).append('<button  class="btn  btn-borrar btn-danger" value="' + idNewChart + '">X</button>');
            $('#col' + idNewChart).append('<canvas style="background-color: rgb(255, 255, 255); border-radius: 10px;  box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.137);" id=chart' + idNewChart + ' > ');
        }
        //Se crea columna y tabla
        if(tabla==1){
            $('#rowGraficas' + idNewChart).append('<div id=col' + idNewChart + 1 + ' class="p-4 p-md-1 mt-2 item ordenar2 text-end">');
            $('#col' + idNewChart + 1).append('<button  class="btn  btn-borrar btn-danger" value="' + idNewChart + 1 + '">X</button>');
            $('#col' + idNewChart + 1).append('<div class="tabla-contenedor-generated" id="contTable' + idNewChart + '">');
            $('#contTable' + idNewChart).append('<table class="tablaDash table " id=table' + idNewChart + ' > ');
        }


        cargarDatosGrafica(rutaJson, 'chart' + idNewChart, tipoGrafica);
        cargarDatosTabla(rutaJson, 'table' + idNewChart);
    }

    $(document).on('click', '.btn-borrar', function (event) {
        $(this).parents("#col" + $(this).val()).remove();
    });

    function cargarDatosGrafica(json, id, type) {
        fetch(json).then(resp => {
            resp.json().then(data => {
                cargarDatosChart(data, id, type)
            });

        });

    }

    // Obtenemos los valores de los datasets y labels para la grafica para cualquier JSON
    function generaDatasLabels(json) {
        var label = [],
            labels = [],
            data = [],
            datas = [],
            datasets = [],
            datasYlabels = [];
        var DatosJson = JSON.parse(JSON.stringify(json));

        //Obtenemos los nombres de cada campo del JSON
        for (var key in DatosJson.data[0]) {
            label.push(key)
        }

        //crear matriz de labels que iran debajo de la grafica
        var arreglo, concat, matriz = [];
        var posString = [];
        for (j = 0; j < label.length; j++) {
            arreglo = []
            for (i = 0; i < DatosJson.data.length; i++) {
                if (typeof DatosJson.data[i][label[j]] == 'string') {
                    posString.push(j)
                    arreglo.push(DatosJson.data[i][label[j]])
                }
            }
            if (arreglo.length > 0) {
                matriz.push(arreglo);
            }
        }

        //concatenar labels para mostrar en el eje X de la grafica
        for (i = 0; i < matriz[0].length; i++) {
            concat = [];
            for (j = 0; j < matriz.length; j++) {
                concat.push(matriz[j][i]);
            }
            labels.push(concat);
        }

        //valores numericos graficar
        for (i = 0; i < label.length; i++) {
            data = [];
            for (j = 0; j < DatosJson.data.length; j++) {
                if (posString.indexOf(i) == -1) {

                    data.push(DatosJson.data[j][label[i]]);
                }
            }
            datas.push(data)
        }

        for (i = 0; i < label.length; i++) {
            var rgb_val = 'rgba(' + Math.random() * (240 - 0) + 0 + ', ' + Math.random() * (240 - 0) + 0 + ', ' + Math.random() * (240 - 0) + 0 + ')';
            if (posString.indexOf(i) == -1) {
                datasets.push({
                    label: label[i],
                    data: datas[i],
                    backgroundColor: rgb_val,
                    borderColor: rgb_val
                })
            }
        }
        datasYlabels.push(labels)
        datasYlabels.push(datasets)

        return datasYlabels;
    }
    //Enviamos los datos a la grafica
    var chart = [];
    let dataYlabels;
    let ctx;
    let config;

    function cargarDatosChart(json, id, type) {
        dataYlabels = generaDatasLabels(json);
        ctx = document.getElementById(id).getContext('2d');
        config = {
            type: type,
            data: {
                labels: dataYlabels[0],
                datasets: dataYlabels[1]
            },
            options: {
                scales: {
                    x: {
                        stacked: true
                    },
                    y: {
                        stacked: true
                    }
                }
            }
        };
        nuevaGrafica(ctx, config)
    }

    function nuevaGrafica(ctx, config) {
        chart.push(new Chart(ctx, config));
    }

    //Inicializamos metodo para cargar la grafica al cargar la pagina
    //window.onload = cargarDatosGrafica('https://mi-escuelamx.com/isad/dashboards/ingresosmensualesnivel.asp', "chartBarras");
    //window.onload = cargarDatosGrafica('https://mi-escuelamx.com/isad/dashboards/ingresosmensuales.asp', "chartBarras");
    //window.onload = cargarDatosGrafica('http://192.168.1.115/isad/dashboards/ingresosMensuales.asp');
    //window.onload = cargarDatosGrafica('./assets/json/miescuela_asp.json', "chartBarras");

});