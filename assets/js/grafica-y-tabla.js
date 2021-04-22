$(document).ready(function () {
    let tabla, grafica, estadistica, rutaJson, porcentaje;
    let chart = [];
    let dataYlabels;
    let ctx;
    let config;

    llenarTablaConf()

    function llenarTablaConf(jsonConfiguracion = "https://mi-escuelamx.com/isad/dashboards/ingresosPorRangoFechasConfiguracion.asp?usuario=Admin&operacion=11") {
        //POR MES
        const tablaM = document.querySelector("#tablaPorMes");
        const tipoGraficaM = document.querySelector("#tipoGraficaPorMes");
        const porcentajeM = document.querySelector("#porcentajePorMes");

        //POR NIVEL
        const tablaN = document.querySelector("#tablaPorNivel");
        const tipoGraficaN = document.querySelector("#tipoGraficaPorNivel");
        const porcentajeN = document.querySelector("#porcentajePorNivel");

        //POR CARRERA
        const tablaCA = document.querySelector("#tablaPorCarrera");
        const tipoGraficaCA = document.querySelector("#tipoGraficaPorCarrera");
        const porcentajeCA = document.querySelector("#porcentajePorCarrera");

        //POR CUENTA
        const tablaCU = document.querySelector("#tablaPorCuenta");
        const tipoGraficaCU = document.querySelector("#tipoGraficaPorCuenta");
        const porcentajeCU = document.querySelector("#porcentajePorCuenta");

        //POR LUGAR PAGO
        const tablaLP = document.querySelector("#tablaPorLugarPago");
        const tipoGraficaLP = document.querySelector("#tipoGraficaPorLugarPago");
        const porcentajeLP = document.querySelector("#porcentajePorLugarPago");
        fetch(jsonConfiguracion).then(resp => {
            resp.json().then(data => {
                for (let i = 0; i < data.length; i++) {
                    estadistica = data[i]["estadistica"];
                    porcentaje  = data[i]["porcentaje"];
                    grafica     = data[i]["grafica"];
                    tabla       = data[i]["tabla"];

                    switch (estadistica) {
                        case "01":
                            porcentajeM.checked = (porcentaje == 1) ? true : false;
                            tipoGraficaM.selectedIndex = grafica + "";
                            tablaM.checked = (tabla == 1) ? true : false;
                            break;

                        case "02":
                            porcentajeN.checked = (porcentaje == 1) ? true : false;
                            tipoGraficaN.selectedIndex = grafica + "";
                            tablaN.checked = (tabla == 1) ? true : false;
                            break;

                        case "03":
                            porcentajeCA.checked = (porcentaje == 1) ? true : false;
                            tipoGraficaCA.selectedIndex = grafica + "";
                            tablaCA.checked = (tabla == 1) ? true : false;
                            break;

                        case "04":
                            porcentajeCU.checked = (porcentaje == 1) ? true : false;
                            tipoGraficaCU.selectedIndex = grafica + "";
                            tablaCU.checked = (tabla == 1) ? true : false;
                            break;

                        case "05":
                            porcentajeLP.checked = (porcentaje == 1) ? true : false;
                            tipoGraficaLP.selectedIndex = grafica + "";
                            tablaLP.checked = (tabla == 1) ? true : false;
                            break;
                    }
                }
                generarTablasYGraficas()
            });
        });
    }

    //enviar formulario
    $('#formularioaenviar').submit(function (ev) {
        //alert($('#formularioaenviar').serialize({  checkboxesAsBools: true}));
        $.ajax({
            type: $('#formularioaenviar').attr('method'),
            url: $('#formularioaenviar').attr('action'),
            data: $('#formularioaenviar').serialize({
                checkboxesAsBools: true
            }),
            success: function (data) {
                //alert($('#formularioaenviar').serialize({ checkboxesAsBools: true }));
                generarTablasYGraficas()
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Error: " + errorThrown);
            }
        });
        ev.preventDefault();
    });

    function generarTablasYGraficas() {
        if ($("#collapseExample").hasClass("show") == true) {
            $("#collapseExample").removeClass("show");
        }

        // const respJson = consJSON(obtenerValoresForm());

        if (document.getElementById("ContainerGraficas")) {
            document.getElementById("ContainerGraficas").remove();
        }

        data = obtenerValoresForm();
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
                default:
                    rutaJson = "";
                    break;
            }

            if (rutaJson != "") {
                generarTablasyGraficas(rutaJson, tabla, grafica, porcentaje, estadistica);
            }
        }
    }

    function obtenerValoresForm() {
        //FECHAS
        let fechaI = document.querySelector("#fechaInicial").value;
        let fechaF = document.querySelector("#fechaFinal").value;

        //POR MES
        let tablaM = document.querySelector("#tablaPorMes").checked ? 1 : 0;
        let tipoGraficaM = document.querySelector("#tipoGraficaPorMes").value;
        let porcentajeM = document.querySelector("#porcentajePorMes").checked ? 1 : 0;

        //POR NIVEL
        let tablaN = document.querySelector("#tablaPorNivel").checked ? 1 : 0;
        let tipoGraficaN = document.querySelector("#tipoGraficaPorNivel").value;
        let porcentajeN = document.querySelector("#porcentajePorNivel").checked ? 1 : 0;

        //POR CARRERA
        let tablaCA = document.querySelector("#tablaPorCarrera").checked ? 1 : 0;
        let tipoGraficaCA = document.querySelector("#tipoGraficaPorCarrera").value;
        let porcentajeCA = document.querySelector("#porcentajePorCarrera").checked ? 1 : 0;

        //POR CUENTA
        let tablaCU = document.querySelector("#tablaPorCuenta").checked ? 1 : 0;
        let tipoGraficaCU = document.querySelector("#tipoGraficaPorCuenta").value;
        let porcentajeCU = document.querySelector("#porcentajePorCuenta").checked ? 1 : 0;

        //POR LUGAR PAGO
        let tablaLP = document.querySelector("#tablaPorLugarPago").checked ? 1 : 0;
        let tipoGraficaLP = document.querySelector("#tipoGraficaPorLugarPago").value;
        let porcentajeLP = document.querySelector("#porcentajePorLugarPago").checked ? 1 : 0;

        let jsonConf = [{
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
        ];

        return jsonConf;
    }

    function generarTablasyGraficas(rutaJson, tabla, grafica, porcentaje, idNewChart) {
        let tipoGrafica = "";
        switch (grafica) {
            case '1':
                tipoGrafica = "bar";
                break;
            case '2':
                tipoGrafica = "line";
                break;
        }

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
            $('#colG' + idNewChart).addClass("p-4 p-md-1 mt-2 item ordenar1 text-end");

            $('#colG' + idNewChart).append('<div  style="position: relative; background-color: #000; z-index: 100;" id="divBtnG' + idNewChart + '"></div>');
            $('#divBtnG' + idNewChart).append('<button  class="btn  btn-borrar btn-danger" value="' + idNewChart + '">X</button>');

            $('#colG' + idNewChart).append('<canvas style="background-color: rgb(255, 255, 255); border-radius: 10px;  box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.137);" id=chart' + idNewChart + ' > ');

            cargarDatosGrafica(rutaJson, 'chart' + idNewChart, tipoGrafica);
        }

        if (tabla == 1 && grafica != 0 && porcentaje == 0) {
            new ResizeSensor(document.getElementById('colG' + idNewChart), function () {
                if (document.getElementById('colG' + idNewChart) != null) {
                    let tamañochart = document.getElementById('chart' + idNewChart).clientHeight + "px";

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
            })
            .catch(error => console.error(error));
        });
    }

    // Obtenemos los valores de los datasets y labels para la grafica para cualquier JSON
    function generaDatasLabels(json) {
        let label = [],
            labels = [],
            data = [],
            datas = [],
            datasets = [],
            datasYlabels = [];
        let DatosJson = json;

        //Obtenemos los nombres de cada campo del JSON
        for (let key in DatosJson.data[0]) {
            label.push(key)
        }

        //crear matriz de labels que iran debajo de la grafica
        let arreglo, concat, matriz = [];
        let posString = [];
        let rgb_val;
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
            rgb_val = 'rgba(' + Math.random() * (240 - 0) + 0 + ', ' + Math.random() * (240 - 0) + 0 + ', ' + Math.random() * (240 - 0) + 0 + ')';
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
        let label = [],
            labels = [],
            data = [],
            datas = [],
            datasets = [],
            datasYlabels = [];
        let DatosJson = json;
        let arreglo, concat, matriz = [];
        let posString = [];

        //Obtenemos los nombres de cada campo del JSON
        for (let key in DatosJson[0]) {
            label.push(key)
        }

        //crear matriz de labels que iran debajo de la grafica
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

        //matriz de colores para la PIE chart
        let bcolors = [];
        for (i = 0; i < labels.length; i++) {
            let rgb_val = 'rgba(' + Math.random() * (240 - 0) + 0 + ', ' + Math.random() * (240 - 0) + 0 + ', ' + Math.random() * (240 - 0) + 0 + ')';
            bcolors.push(rgb_val);
        }

        //Ingresar valores en arreglo de datasets
        datasets.push({
            label: ' Ingresos',
            data: data,
            backgroundColor: bcolors,
            borderWidth: 0,
        })

        datasYlabels.push(labels)
        datasYlabels.push(datasets)

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