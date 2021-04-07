
    function cargarDatos_tabla(json) {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: json,
            success: function (data) {
                console.log(data);
                cargarDatos(data)
            }
        });
    }

    function cargarDatos(json)
    {
        var DatosJson = JSON.parse(JSON.stringify(json));

        $("#Table").append('<thead><tr>');
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
                if(typeof DatosJson.data[i][key] == 'string'){
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

        window.onload = cargarDatos_tabla('http://192.168.1.115/isad/dashboards/ingresosMensualesNivel.asp');
        //window.onload = cargarDatos_tabla('http://192.168.1.115/isad/dashboards/ingresosMensuales.asp');
        //window.onload = cargarDatos_tabla('./assets/json/miescuela_asp.json');
        


// Metodo para crear Sticky Column
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