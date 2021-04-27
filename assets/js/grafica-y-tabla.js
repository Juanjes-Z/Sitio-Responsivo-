let tabla, grafica, estadistica, rutaJson, porcentaje, rutaJsonPie;
let chart = [];
let dataYlabels;
let ctx;
let config;
let matirzConfig = [];

let fechaI, fechaF, tablaM, tipoGraficaM, porcentajeM, tablaN, tipoGraficaN,
    porcentajeN, tablaCA, tipoGraficaCA, porcentajeCA, tablaCU, tipoGraficaCU, porcentajeCU,
    tablaLP, tipoGraficaLP, porcentajeLP;

function selectsTableConfig() {
    //FECHAS INICIAL Y FINAL
    fechaI = document.querySelector("#fechaInicial");
    fechaF = document.querySelector("#fechaFinal");

    //POR MES
    tablaM = document.querySelector("#chkTabla1101");
    tipoGraficaM = document.querySelector("#cboGrafica1101");
    porcentajeM = document.querySelector("#chkPorcentaje1101");

    //POR NIVEL
    tablaN = document.querySelector("#chkTabla1102");
    tipoGraficaN = document.querySelector("#cboGrafica1102");
    porcentajeN = document.querySelector("#chkPorcentaje1102");

    //POR CARRERA
    tablaCA = document.querySelector("#chkTabla1103");
    tipoGraficaCA = document.querySelector("#cboGrafica1103");
    porcentajeCA = document.querySelector("#chkPorcentaje1103");

    //POR CUENTA
    tablaCU = document.querySelector("#chkTabla1104");
    tipoGraficaCU = document.querySelector("#cboGrafica1104");
    porcentajeCU = document.querySelector("#chkPorcentaje1104");

    //POR LUGAR PAGO
    tablaLP = document.querySelector("#chkTabla1105");
    tipoGraficaLP = document.querySelector("#cboGrafica1105");
    porcentajeLP = document.querySelector("#chkPorcentaje1105");


    let tableBodyConf = document.querySelector('#tbodyConfig');
    let filasTabla = tableBodyConf.querySelectorAll('tr');
    let fila = [];
    matirzConfig = []
    for (let i = 0; i < filasTabla.length; i++) {
        fila = []
        let tdFilas = filasTabla[i].querySelectorAll('td');

        for (let j = 1; j < tdFilas.length; j++) {
            tdFilas[j].childNodes.forEach(children => {
                fila.push(children);
            });
        }
        matirzConfig.push(fila);
    }

}

function llenarTablaConf(jsonConfiguracion = "https://mi-escuelamx.com/isad/dashboards/ingresosPorRangoFechasConfiguracion.asp?usuario=Admin&operacion=11") {

    fetch(jsonConfiguracion).then(resp => {
        resp.json().then(data => {
            selectsTableConfig();

            for (let i = 0; i < data.length; i++) {
                estadistica = data[i]["estadistica"];
                porcentaje = data[i]["porcentaje"];
                grafica = data[i]["grafica"];
                tabla = data[i]["tabla"];

                document.querySelector("#" + matirzConfig[i][0].id).checked = (tabla == 1) ? true : false;
                document.querySelector("#" + matirzConfig[i][1].id).selectedIndex = grafica + "";
                document.querySelector("#" + matirzConfig[i][2].id).checked = (porcentaje == 1) ? true : false;

            }

        });
    });
}

//enviar formulario
$('#formularioaenviar').submit(function (ev) {
    //alert($('#formularioaenviar').serialize({  checkboxesAsBools: true}));
    $.ajax({
        type: $('#formularioaenviar').attr('method'),
        //url: $('#formularioaenviar').attr('action'),
        url: 'https://mi-escuelamx.com/isad/dashboards/recibeparametros.asp',
        data: $('#formularioaenviar').serialize({
            checkboxesAsBools: true
        }),
        success: function (data) {
            //alert($('#formularioaenviar').serialize({ checkboxesAsBools: true }));
            generarTablasYGraficas(fechaI.value, fechaF.value)
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Error: " + errorThrown);
        }
    });
    ev.preventDefault();
});

function generarTablasYGraficas(fechaIval, fechaFval) {
    if ($("#collapseExample").hasClass("show") == true) {
        $("#collapseExample").removeClass("show");
    }

    let fechasPorParametro = (fechaI != undefined && fechaFval != undefined) ? '?fechainicial=' + fechaIval + '&fechafinal=' + fechaFval + '' : "";
    // const respJson = consJSON(obtenerValoresForm());

    if (document.getElementById("ContainerGraficas")) {
        document.getElementById("ContainerGraficas").remove();
    }

    data = obtenerValoresForm();
    for (let i = 0; i < matirzConfig.length; i++) {
        console.log(matirzConfig[i][5] != undefined? true: false)
        tabla = matirzConfig[i][0].checked? 1:0;
        grafica = matirzConfig[i][2].value;
        porcentaje = matirzConfig[i][3].checked? 1:0;
        rutaJson = 'https://mi-escuelamx.com/isad/dashboards/'+matirzConfig[i][4].value + fechasPorParametro;
        rutaJsonPie = 'https://mi-escuelamx.com/isad/dashboards/'+matirzConfig[i][5].value + fechasPorParametro;


        if (matirzConfig[i][4].value != '' || matirzConfig[i][5].value != '') {
            generarTablasyGraficas(rutaJson, rutaJsonPie, tabla, grafica, porcentaje, estadistica);
        }
    }
}

function obtenerValoresForm() {
    //POR MES
    let tablaMes = tablaM.checked ? 1 : 0;
    let tipoGraficaMes = tipoGraficaM.value;
    let porcentajeMes = porcentajeM.checked ? 1 : 0;

    //POR NIVEL
    let tablaNivel = tablaN.checked ? 1 : 0;
    let tipoGraficaNivel = tipoGraficaN.value;
    let porcentajeNivel = porcentajeN.checked ? 1 : 0;

    //POR CARRERA
    let tablaCarrera = tablaCA.checked ? 1 : 0;
    let tipoGraficaCarrera = tipoGraficaCA.value;
    let porcentajeCarrera = porcentajeCA.checked ? 1 : 0;

    //POR CUENTA
    let tablaCuenta = tablaCU.checked ? 1 : 0;
    let tipoGraficaCuenta = tipoGraficaCU.value;
    let porcentajeCuenta = porcentajeCU.checked ? 1 : 0;

    //POR LUGAR PAGO
    let tablaLugarPago = tablaLP.checked ? 1 : 0;
    let tipoGraficaLugarPago = tipoGraficaLP.value;
    let porcentajeLugarPago = porcentajeLP.checked ? 1 : 0;

    let jsonConf = [{
            "estadistica": "01",
            "tabla": tablaMes,
            "grafica": tipoGraficaMes,
            "porcentaje": porcentajeMes
        },
        {
            "estadistica": "02",
            "tabla": tablaNivel,
            "grafica": tipoGraficaNivel,
            "porcentaje": porcentajeNivel
        },
        {
            "estadistica": "03",
            "tabla": tablaCarrera,
            "grafica": tipoGraficaCarrera,
            "porcentaje": porcentajeCarrera
        },
        {
            "estadistica": "04",
            "tabla": tablaCuenta,
            "grafica": tipoGraficaCuenta,
            "porcentaje": porcentajeCuenta
        },
        {
            "estadistica": "05",
            "tabla": tablaLugarPago,
            "grafica": tipoGraficaLugarPago,
            "porcentaje": porcentajeLugarPago
        },
    ];

    return jsonConf;
}

function generarTablasyGraficas(rutaJson, rutaJsonPie, tabla, grafica, porcentaje, idNewChart) {
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

    if (porcentaje == 1 && rutaJsonPie != '') {
        $('#rowGraficas' + idNewChart).append('<div id=colGp' + idNewChart + ' class=" ">');
        $('#colGp' + idNewChart).addClass("p-4 p-md-1 mt-2 item2 ordenar1 text-end");

        $('#colGp' + idNewChart).append('<div  style="position: relative; background-color: #000; z-index: 100;" id="divBtnGp' + idNewChart + '"></div>');
        $('#divBtnGp' + idNewChart).append('<button  class="btn  btn-borrar btn-danger" value="' + idNewChart + '">X</button>');

        $('#colGp' + idNewChart).append('<canvas style="background-color: rgb(255, 255, 255); border-radius: 10px;  box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.137);" id=chartp' + idNewChart + ' > ');

        cargarDatosGraficaPie(rutaJsonPie, 'chartp' + idNewChart, "pie");
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

    if (tabla == 1 && porcentaje == 1 && rutaJsonPie != '') {
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
    let activarbarraStac = (type != 'line') ? {
        x: {
            stacked: true
        },
        y: {
            stacked: true
        }
    } : {
        x: {
            stacked: false
        },
        y: {
            stacked: false
        }
    };
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
            scales: activarbarraStac
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
            resp.json()
                .then(data => {
                    cargarDatosChartPie(data, id, type)
                })
        })
        .catch(error => console.error(error + " SE genero un error en la consulta de la tabla y grafica"));;
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

llenarTablaConf();

//Inicializamos metodo para cargar la grafica al cargar la pagina
//window.onload = cargarDatosGrafica('https://mi-escuelamx.com/isad/dashboards/ingresosmensualesnivel.asp', "chartBarras");
//window.onload = cargarDatosGrafica('https://mi-escuelamx.com/isad/dashboards/ingresosmensuales.asp', "chartBarras");
//window.onload = cargarDatosGrafica('http://192.168.1.115/isad/dashboards/ingresosMensuales.asp');
//window.onload = cargarDatosGrafica('./assets/json/miescuela_asp.json', "chartBarras");