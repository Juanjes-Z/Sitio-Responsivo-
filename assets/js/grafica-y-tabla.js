$(document).ready(function () {
    function cargarDatos_tabla(json) {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: json,
            success: function (data) {
                cargarDatos(data)
            }
        });
    }

    function cargarDatos(json) {
        var label=[];
        var labels=[];
        var data=[];
        var datas=[];
        var datasets=[];
        var DatosJson = JSON.parse(JSON.stringify(json));

        for (var key in DatosJson.data[0]) {
            label.push(key)
        }

        for (i = 0  ; i < DatosJson.data.length; i++) {
                 labels.push(DatosJson.data[i][label[0]])
        }
 
        for (i=1; i<label.length; i++) {
            data=[];
            for (j = 0; j < DatosJson.data.length; j++) {
               data.push(DatosJson.data[j][label[i]])
            }
            datas.push(data)
        }

        for (i=1; i<label.length; i++) {
            var rgb_val= 'rgba('+Math.random() * (230 - 60) + 0+', '+Math.random() * (230 - 0) + 0+', '+Math.random() * (230 - 0) + 0 +')';
            datasets.push({
                label: label[i],
                data: datas[i-1],
                backgroundColor: rgb_val,
                borderColor: rgb_val
            })
            
        }

        var ctx = document.getElementById('myChart').getContext('2d');
        var config = {
            type: 'line',
            data: {
            labels: labels,
            datasets: datasets
            }
        };
        var chart = new Chart(ctx, config);

        function removeData(chart) {
            const labels_tam=chart.data.labels.length;
            for(i=0; i<labels_tam; i++){
                chart.data.labels.pop();
            }
            chart.data.datasets.forEach((dataset) => {
                dataset.data.pop();
            });
            chart.update();
        }
    }
    
        window.onload = cargarDatos_tabla('http://192.168.1.115/isad/dashboards/ingresosmensuales.asp');
        //window.onload = cargarDatos_tabla('./assets/json/miescuela_asp.json');
        
});

//sticky column
$("table").delegate("thead tr th", "click", function (event) {
    if ($(this).hasClass("sticky-column") == false) {
        $("table thead tr th").each(function () {
            $(this).removeClass('sticky-column');
        });

        $(this).addClass('sticky-column');
        let pos = $(this).index()
        $("table tbody tr").each(function () {
            $("td").removeClass('sticky-column');
        });

        $("table tbody tr").each(function () {
            $(this).find("td:eq(" + (pos) + ")").addClass('sticky-column');
        });
    } else {
        $("table thead tr th").each(function () {
            $(this).removeClass('sticky-column');
        });
        $("table tbody tr").each(function () {
            $("td").removeClass('sticky-column');
        });
    }
});