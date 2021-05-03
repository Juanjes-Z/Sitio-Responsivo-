function cargarDatosTabla(json,idTable) {
   
    fetch (json).then(resp => {
        resp.json().then(data => {
            cargarDatos(data, 'table' +idTable)
        })
        .catch(error => errorCargarTabla(idTable, error));
    });
}


function cargarDatos(json, idTable) {
    
    let fecha = new Date();
    let idNewTable = fecha.getHours();
    idNewTable = idNewTable+""+fecha.getMinutes();
    idNewTable = idNewTable+""+ fecha.getSeconds();
    idNewTable = idNewTable+""+ fecha.getMilliseconds();
    var DatosJson = json;

    let alinea="text-center";
    let padding=8;
    let key_mas_diez = [];
    $("#"+idTable).append('<thead class="tehead"><tr>');
    for (var key in DatosJson.data[0]) {
        if (typeof DatosJson.data[0][key] == 'string') {
            for (i = 0; i < DatosJson.data.length; i++) {
                if (DatosJson.data[i][key].length > 10) {
                    alinea="text-start";
                    padding=24;
                    key_mas_diez.push(key);
                }
            }
            
            $("#"+idTable+" thead tr").append('<th scope="col" class="'+alinea+'" style= "padding-left:'+padding+'px;">' + key + '</th>');
            alinea="text-center";
            padding=8;
        }else{
            $("#"+idTable+" thead tr").append('<th scope="col" class="text-end" style="padding-right: 24px;">' + key + '</th>');
        }
    }
    $("#"+idTable).append('</tr></thead>');

    function numberWithCommas(x) {
        x = x.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x))
            x = x.replace(pattern, "$1,$2");
        return x;
    }

    let valorNumericoTabla;
    $("#"+idTable).append(' <tbody id="tid_'+idNewTable+'">');
    for (i = 0; i < DatosJson.data.length; i++) {
        $("#tid_"+idNewTable).append('<tr id="id_' + i+idNewTable + '">');
        for (var key in DatosJson.data[0]) {
            if (typeof DatosJson.data[i][key] == 'string') {
                if(key_mas_diez.indexOf(key) != -1){
                    $("#id_" + i+idNewTable).append('<td class="text-start">' + DatosJson.data[i][key] + '</td>');    
                }
                else{
                    $("#id_" + i+idNewTable).append('<td class="text-center">' + DatosJson.data[i][key] + '</td>');
                }
                
            } else {
                valorNumericoTabla=(DatosJson.data[i][key]=== undefined) ?  "": numberWithCommas(parseFloat(DatosJson.data[i][key]).toFixed(2));
                $("#id_" + i+idNewTable).append('<td class="text-end">' + valorNumericoTabla + '</td>');
            }
        }
        $("#"+idNewTable).append('</tr>');
    }
    $("#"+idTable).append('</tbody>');
}

//window.onload = cargarDatosTabla('https://mi-escuelamx.com/isad/dashboards/ingresosmensualesnivel.asp',"Table");
//window.onload = cargarDatosTabla('http://192.168.1.115/isad/dashboards/ingresosMensuales.asp');
//window.onload = cargarDatosTabla('./assets/json/miescuela_asp.json',"Table");
//window.onload = cargarDatosTabla('https://mi-escuelamx.com/isad/dashboards/ingresosmensuales.asp',"Table");



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