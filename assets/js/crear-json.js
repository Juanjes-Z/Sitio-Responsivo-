function cargarDatosTabla(json,idTable) {
    $.ajax({
        dataType: 'json',
        scriptCharset: "UTF-8",
        encoding: "UTF-8",
        contentType: "text/json; charset=UTF-8",
        url: json,
        success: function (data) {
            cargarDatos(data, idTable)
        }
    });
}


function cargarDatos(json, idTable) {
    
        let fecha = new Date();
        let idNewTable = fecha.getHours();
        idNewTable = idNewTable+""+fecha.getMinutes();
        idNewTable = idNewTable+""+ fecha.getSeconds();
        idNewTable = idNewTable+""+ fecha.getMilliseconds();
    var DatosJson = JSON.parse(JSON.stringify(json));

    $("#"+idTable).append('<thead><tr>');
    for (var key in DatosJson.data[0]) {
        $("#"+idTable+" thead tr").append('<th scope="col">' + key + '</th>');
    }
    $("#"+idTable).append('</tr></thead>');

    function numberWithCommas(x) {
        x = x.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x))
            x = x.replace(pattern, "$1,$2");
        return x;
    }

    $("#"+idTable).append(' <tbody id="tid_'+idNewTable+'">');
    for (i = 0; i < DatosJson.data.length; i++) {
        $("#tid_"+idNewTable).append('<tr id="id_' + i+idNewTable + '">');
        for (var key in DatosJson.data[0]) {
            if (typeof DatosJson.data[i][key] == 'string') {
                $("#id_" + i+idNewTable).append('<td scope="col">' + DatosJson.data[i][key] + '</td>');
            } else {
                $("#id_" + i+idNewTable).append('<td scope="col">' + numberWithCommas(parseFloat(DatosJson.data[i][key])) + '</td>');
            }
        }
        $("#"+idNewTable).append('</tr>');
    }
    $("#"+idTable).append('</tbody>');
}

window.onload = cargarDatosTabla('http://192.168.1.115/isad/dashboards/ingresosMensualesNivel.asp',"Table");
window.onload = cargarDatosTabla('http://192.168.1.115/isad/dashboards/ingresosMensuales.asp',"Table2");
//window.onload = cargarDatosTabla('http://192.168.1.115/isad/dashboards/ingresosMensuales.asp');
//window.onload = cargarDatosTabla('./assets/json/miescuela_asp.json');



// Metodo para crear Sticky Column

$(".tablaDash").delegate("thead tr th", "click", function (event) {
    if ($(this).hasClass("sticky-column") == false) {
        $(".tablaDash thead tr th").each(function () {
            $(this).removeClass('sticky-column');
        });

        $(this).addClass('sticky-column');
        let pos = $(this).index()
        $(".tablaDash tbody tr").each(function () {
            $("td").removeClass('sticky-column');
        });

        $(".tablaDash tbody tr").each(function () {
            $(this).find("td:eq(" + (pos) + ")").addClass('sticky-column');
        });
    } else {
        $(".tablaDash thead tr th").each(function () {
            $(this).removeClass('sticky-column');
        });
        $(".tablaDash tbody tr").each(function () {
            $("td").removeClass('sticky-column');
        });
    }
});