$(document).ready(function () {

    const consJSON = async (opcConfig) => {
        const urleSend = "https://mi-escuelamx.com/isad/dashboards/recibeparametros.asp";
       
        $.ajax({                        
           type: "POST",                 
           url: urleSend,                     
           data: $("#formulario").serialize(), 
           success: function(data)             
           {
             console.log(data)           
           }
       });
    }

    let tabla, grafica, estadistica, rutaJson, porcentaje;
    $("#butn").click(function () {
        if ($("#collapseExample").hasClass("show") == true) {
            $("#collapseExample").removeClass("show");
        }

        const respJson = consJSON(obtenerValoresForm());
        console.log(consJSON())

        if (document.getElementById("ContainerGraficas")) {
            document.getElementById("ContainerGraficas").remove();
        }

        //jsonGraf = consultarJson();
        fetch("https://mi-escuelamx.com/isad/dashboards/ingresosPorRangoFechasConfiguracion.asp?usuario=Admin&operacion=11").then(resp => {
            resp.json().then(data => {
                for (let i = 0; i < data.length; i++) {
                    tabla = data[i]["tabla"];
                    grafica = data[i]["grafica"];
                    estadistica = data[i]["estadistica"];
                    porcentaje = data[i]["porcentaje"];
                    switch (estadistica) {
                        case "01":
                            rutaJson = 'https://mi-escuelamx.com/isad/dashboards/ingresosmensuales.asp';
                            break;
                        case "02":
                            rutaJson = 'https://mi-escuelamx.com/isad/dashboards/ingresosmensualesnivel.asp';
                            break;
                    }

                    generarTablasyGraficas(rutaJson, tabla, grafica, estadistica, porcentaje);

                }
            });

        });

    });


    function obtenerValoresForm() {

        //FECHAS
        let fechaI = document.querySelector("#fechaI").value;
        let fechaF = document.querySelector("#fechaF").value;

        //POR MES
        let tablaM = document.querySelector("#tablaM").checked ? 1 : 0;
        let tipoGraficaM = document.querySelector("#tipoGraficaM").value;
        let porcentajeM = document.querySelector("#porcentajeM").checked ? 1 : 0;

        //POR NIVEL
        let tablaN = document.querySelector("#tablaN").checked ? 1 : 0;
        let tipoGraficaN = document.querySelector("#tipoGraficaN").value;
        let porcentajeN = document.querySelector("#porcentajeN").checked ? 1 : 0;

        //POR CARRERA
        let tablaCA = document.querySelector("#tablaCA").checked ? 1 : 0;
        let tipoGraficaCA = document.querySelector("#tipoGraficaCA").value;
        let porcentajeCA = document.querySelector("#porcentajeCA").checked ? 1 : 0;

        //POR CUENTA
        let tablaCU = document.querySelector("#tablaCU").checked ? 1 : 0;
        let tipoGraficaCU = document.querySelector("#tipoGraficaCU").value;
        let porcentajeCU = document.querySelector("#porcentajeCU").checked ? 1 : 0;

        //POR LUGAR PAGO
        let tablaLP = document.querySelector("#tablaLP").checked ? 1 : 0;
        let tipoGraficaLP = document.querySelector("#tipoGraficaLP").value;
        let porcentajeLP = document.querySelector("#porcentajeLP").checked ? 1 : 0;

        return [{
                "fechaI": fechaI,
                "fechaF": fechaF
            },
            {
                "estadistica": "01",
                "tabla": tablaM,
                "grafica": tipoGraficaM,
                "porcentaje": porcentajeM
            },
            {
                "estadistica": "02",
                "tabla": tablaN,
                "grafica": tipoGraficaN,
                "porcentaje": porcentajeN
            },
            {
                "estadistica": "03",
                "tabla": tablaCA,
                "grafica": tipoGraficaCA,
                "porcentaje": porcentajeCA
            },
            {
                "estadistica": "04",
                "tabla": tablaCU,
                "grafica": tipoGraficaCU,
                "porcentaje": porcentajeCU
            },
            {
                "estadistica": "05",
                "tabla": tablaLP,
                "grafica": tipoGraficaLP,
                "porcentaje": porcentajeLP
            },
        ]
    }

    function generarTablasyGraficas(rutaJson, tabla, grafica, idNewChart) {
        let tipoGrafica = "";
        switch (grafica) {
            case 1:
                tipoGrafica = "bar";
                break;
            case 2:
                tipoGrafica = "line";
                break;
        }
        /*let fecha = new Date();
        let idNewChart = fecha.getHours();
        idNewChart = idNewChart + "" + fecha.getMinutes();
        idNewChart = idNewChart + "" + fecha.getSeconds();
        idNewChart = idNewChart + "" + fecha.getMilliseconds();*/

        $('#dashboards').append('  <div id="ContainerGraficas" class="col-12">');
        //Se crea fila donde estara la tabla y grafica
        $('#ContainerGraficas').append(' <div class="" id="rowGraficas' + idNewChart + '"></div>');
        $('#rowGraficas' + idNewChart).addClass("d-flex flex-md-row  flex-wrap justify-content-center mt-5");

        //Se crea columna y tabla
        if (tabla == 1) {
            $('#rowGraficas' + idNewChart).append('<div id=colT' + idNewChart + ' class="">');
            $('#colT' + idNewChart).addClass("p-4 p-md-1 mt-2 ordenar2 text-end");
            if (porcentaje == 1) {
                $('#colT' + idNewChart).addClass("item1");
            } else {
                $('#colT' + idNewChart).addClass("item");
            }

            $('#colT' + idNewChart).append('<div  style="position: relative; background-color: #000; z-index: 100;" id="divBtnT' + idNewChart + '"></div>');
            $('#divBtnT' + idNewChart).append('<button  class="btn  btn-borrar btn-danger" value="' + idNewChart + '">X</button>');

            $('#colT' + idNewChart).append('<div class="tabla-contenedor-generated " id="contTable' + idNewChart + '">');
            $('#contTable' + idNewChart).append('<table class="tablaDash table " id=table' + idNewChart + ' > ');

            cargarDatosTabla(rutaJson, 'table' + idNewChart);
        }

        if (porcentaje == 1) {
            $('#rowGraficas' + idNewChart).append('<div id=colGp' + idNewChart + ' class=" ">');
            $('#colGp' + idNewChart).addClass("p-4 p-md-1 mt-2 item2 ordenar1 text-end");

            $('#colGp' + idNewChart).append('<div  style="position: relative; background-color: #000; z-index: 100;" id="divBtnGp' + idNewChart + '"></div>');
            $('#divBtnGp' + idNewChart).append('<button  class="btn  btn-borrar btn-danger" value="' + idNewChart + '">X</button>');

            $('#colGp' + idNewChart).append('<canvas style="background-color: rgb(255, 255, 255); border-radius: 10px;  box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.137);" id=chartp' + idNewChart + ' > ');

            cargarDatosGraficaPie('https://mi-escuelamx.com/isad/dashboards/porcentajeMensualesNIvel.asp', 'chartp' + idNewChart, "pie");
        }

        //Se crea columna y Grafica
        if (grafica != 0) {
            $('#rowGraficas' + idNewChart).append('<div id=colG' + idNewChart + ' class=" ">');
            $('#colG' + idNewChart).addClass("p-4 p-md-1 mt-2 item1 ordenar1 text-end");

            $('#colG' + idNewChart).append('<div  style="position: relative; background-color: #000; z-index: 100;" id="divBtnG' + idNewChart + '"></div>');
            $('#divBtnG' + idNewChart).append('<button  class="btn  btn-borrar btn-danger" value="' + idNewChart + '">X</button>');

            $('#colG' + idNewChart).append('<canvas style="background-color: rgb(255, 255, 255); border-radius: 10px;  box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.137);" id=chart' + idNewChart + ' > ');

            cargarDatosGrafica(rutaJson, 'chart' + idNewChart, tipoGrafica);
        }


        if (tabla == 1 && grafica != 0 && porcentaje == 0) {
            new ResizeSensor(document.getElementById('colG' + idNewChart), function () {
                if (document.getElementById('colG' + idNewChart) != null) {
                    let tamañochart = document.getElementById('chart' + idNewChart).clientHeight * (5.5 / 8) + "px";

                    let tabla = document.getElementById('contTable' + idNewChart);
                    if (tabla != null) {
                        tabla.style.height = tamañochart;
                    }
                }
            });
        }

        if (tabla == 1 && porcentaje == 1) {
            new ResizeSensor(document.getElementById('colGp' + idNewChart), function () {

                if (document.getElementById('colGp' + idNewChart) != null) {
                    let tamañochart = document.getElementById('chartp' + idNewChart).clientHeight + "px";

                    let tabla = document.getElementById('contTable' + idNewChart);
                    if (tabla != null) {
                        tabla.style.height = tamañochart;
                    }
                }
            });
        }
        /*
                if (tabla == 1 && grafica != 0 && porcentaje == 1) {
                    new ResizeSensor(document.getElementById('colGp' + idNewChart), function () {

                        if (document.getElementById('colGp' + idNewChart) != null) {
                            let tamañochart = document.getElementById('chartp' + idNewChart).clientHeight + "px";

                            let tabla = document.getElementById('contTable' + idNewChart);
                            if (tabla != null) {
                                tabla.style.height = tamañochart;
                            }

                            let chartp = document.getElementById('chart' + idNewChart);
                            if (chartp != null) {
                                chartp.style.height = tamañochart;
                            }
                        }
                    });
                }
                */
    }



    $(document).on('click', '.btn-borrar', function (event) {
        $(this).parents("#colG" + $(this).val()).remove();
        $(this).parents("#colT" + $(this).val()).remove();
        $(this).parents("#colGp" + $(this).val()).remove();
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
        var DatosJson = json;

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
                plugins: {
                    legend: {
                        labels: {
                            // This more specific font property overrides the global property
                            font: {
                                size: 10
                            }
                        }
                    }
                },
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

    /***********************  GRAFICA PIE ****************************/
    function cargarDatosGraficaPie(json, id, type) {
        fetch(json).then(resp => {
            resp.json().then(data => {
                cargarDatosChartPie(data, id, type)
            });
        });
    }

    // Obtenemos los valores de los datasets y labels para la grafica para cualquier JSON
    function generaDatasLabelsPie(json) {
        var label = [],
            labels = [],
            data = [],
            datas = [],
            datasets = [],
            datasYlabels = [];
        var DatosJson = json;

        //Obtenemos los nombres de cada campo del JSON
        for (var key in DatosJson[0]) {
            label.push(key)
        }

        //crear matriz de labels que iran debajo de la grafica
        var arreglo, concat, matriz = [];
        var posString = [];
        for (j = 0; j < label.length; j++) {
            arreglo = []
            for (i = 0; i < DatosJson.length; i++) {
                if (typeof DatosJson[i][label[j]] == 'string') {
                    posString.push(j)
                    arreglo.push(DatosJson[i][label[j]])
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
            for (j = 0; j < DatosJson.length; j++) {
                if (posString.indexOf(i) == -1) {

                    data.push(DatosJson[j][label[i]]);
                }
            }
            datas.push(data)
        }

        let bcolors = [];
        for (i = 0; i < labels.length; i++) {
            var rgb_val = 'rgba(' + Math.random() * (240 - 0) + 0 + ', ' + Math.random() * (240 - 0) + 0 + ', ' + Math.random() * (240 - 0) + 0 + ')';
            bcolors.push(rgb_val);
        }

        datasets.push({
            label: ' Ingresos',
            data: data,
            backgroundColor: bcolors,
            borderWidth: 0,
        })



        datasYlabels.push(labels)
        datasYlabels.push(datasets)
        console.log(datasets)

        return datasYlabels;
    }

    function cargarDatosChartPie(json, id, type) {
        dataYlabels = generaDatasLabelsPie(json);
        ctx = document.getElementById(id).getContext('2d');
        config = {
            type: 'pie',
            data: {
                labels: dataYlabels[0],
                datasets: dataYlabels[1],
            },
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