$(document).ready(function () {
    function cargarDatos_tabla(json) {
        $.ajax({
            dataType: 'json',
            scriptCharset: "UTF-8",
            encoding:"UTF-8",
            contentType: "text/json; charset=UTF-8",
            url: json,
            success: function (data) {
                cargarDatos(data)
            }
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
        for (var key in DatosJson.data[0])
        {
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
            if (posString.indexOf(i)==-1) {
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
    function cargarDatos(json) {
        var dataYlabels = generaDatasLabels(json);
        var ctx = document.getElementById('myChart').getContext('2d');
        var config = {
            type: 'bar',
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
        var chart = new Chart(ctx, config);
    }

    //Inicializamos metodo para cargar la grafica al cargar la pagina
    window.onload = cargarDatos_tabla('http://192.168.1.115/isad/dashboards/ingresosMensualesNivel.asp');
    //window.onload = cargarDatos_tabla('http://192.168.1.115/isad/dashboards/ingresosMensuales.asp');
    //window.onload = cargarDatos_tabla('./assets/json/miescuela_asp.json');

});