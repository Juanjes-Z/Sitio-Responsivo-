function cargarDatosTabla(json,idTable) {
   
    fetch (json).then(resp => {
        resp.json().then(data => {
            cargarDatos(data, idTable)
        });
    
    });
}


function cargarDatos(json, idTable) {
    
        let fecha = new Date();
        let idNewTable = fecha.getHours();
        idNewTable = idNewTable+""+fecha.getMinutes();
        idNewTable = idNewTable+""+ fecha.getSeconds();
        idNewTable = idNewTable+""+ fecha.getMilliseconds();
    var DatosJson = JSON.parse(JSON.stringify(json));

    $("#"+idTable).append('<thead class="tehead"><tr>');
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

//window.onload = cargarDatosTabla('https://mi-escuelamx.com/isad/dashboards/ingresosmensualesnivel.asp',"Table");
//window.onload = cargarDatosTabla('http://192.168.1.115/isad/dashboards/ingresosMensuales.asp');
//window.onload = cargarDatosTabla('./assets/json/miescuela_asp.json',"Table");
window.onload = cargarDatosTabla('https://mi-escuelamx.com/isad/dashboards/ingresosmensuales.asp',"Table");



// Metodo para crear Sticky Column

$(document).on('click', '.tablaDash > .tehead > tr > th', function (event) {
    if ($(this).hasClass("sticky-column") == false) {
        $(this).closest(".tablaDash").children("thead").children("tr").children("th").each(function () {
            $(this).removeClass('sticky-column');
        });

        $(this).addClass('sticky-column');

        $(this).closest(".tablaDash").children("tbody").children("tr").children("td").each(function () {
            $(this).removeClass('sticky-column');
        });
        
        let pos = $(this).index();
        $(this).closest(".tablaDash").children("tbody").children("tr").each(function () {
            $(this).find("td:eq(" + (pos) + ")").addClass('sticky-column');
        });
    } else {
        $(this).closest(".tablaDash").children(".tehead").children("tr").children("th").each(function () {
            $(this).removeClass('sticky-column');
        });
        $(this).closest(".tablaDash").children("tbody").children("tr").children("td").each(function () {
            $(this).removeClass('sticky-column');
        });
    }
});