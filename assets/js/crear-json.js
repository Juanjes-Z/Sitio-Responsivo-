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
        console.log("Primero json")
        var DatosJson = JSON.parse(JSON.stringify(json));

        $("#Table ").append('<thead><tr>');
        for (var key in DatosJson.data[1]) {
            $("#Table thead tr").append('<th scope="col">' + key + '</th>');
        }
        $("#Table thead tr").append('<th>Eliminar</th>');
        $("#Table").append('</tr></thead>');

        var entero;
        $("#Table").append(' <tbody id="tbody_id">');
        for (i = 0; i < DatosJson.data.length; i++) {
            $("#tbody_id").append('<tr id="id_' + i + '">');
            for (var key in DatosJson.data[1]) {

                entero = parseFloat(DatosJson.data[i][key], 10);
                if (isNaN(entero) || DatosJson.data[i][key].indexOf("/") != -1 || DatosJson.data[i][key].indexOf("-") != -1) {
                    $("#id_" + i).append('<td scope="col">' + DatosJson.data[i][key] + '</td>');
                } else {
                    $("#id_" + i).append('<td scope="col"> <input type="number"value="' + DatosJson.data[i][key] + '"></input></td>');
                }
            }
            $("#id_" + i).append('<td scope="col"><input type="button" class="borrar btn" value="Eliminar" /></td>');
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

        window.onload =cargarDatos_tabla('../assets/json/file-json-otro-example.json');
        
});