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
        var DatosJson = JSON.parse(JSON.stringify(json));

        $("#Table ").append('<thead><tr>');
        for (var key in DatosJson.data[0]) {
            $("#Table thead tr").append('<th scope="col">' + key + '</th>');
        }
        $("#Table").append('</tr></thead>');

        function numberWithCommas(x) {
            x = x.toString();
            var pattern = /(-?\d+)(\d{3})/;
            while (pattern.test(x))
                x = x.replace(pattern, "$1,$2");
            return x;
        }
        $("#Table").append(' <tbody id="tbody_id">');
        for (i = 0; i < DatosJson.data.length; i++) {
            $("#tbody_id").append('<tr id="id_' + i + '">');
            for (var key in DatosJson.data[0]) {
                if(isNaN(parseFloat(DatosJson.data[i][key]))){
                    $("#id_" + i).append('<td scope="col">' +DatosJson.data[i][key] + '</td>');
                }else{
                    $("#id_" + i).append('<td scope="col">' +numberWithCommas(parseFloat(DatosJson.data[i][key])) + '</td>');
                }
                
            }
            $("#tbody_id").append('</tr>');
        }
        $("#Table").append(' </tbody>');
    }
    
    $( "select" ).change(function() {
            var str = "";
            $( "select option:selected" ).each(function() {
            str += $( this ).val();
            });
           
            $('tbody').remove();
            $('thead').remove();
            cargarDatos_tabla(str);
            
        })

        window.onload =cargarDatos_tabla('http://192.168.1.115/isad/dashboards/ingresosmensuales.asp');
        //window.onload =cargarDatos_tabla('./assets/json/miescuela_asp.json');
        
});