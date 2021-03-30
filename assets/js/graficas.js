$(document).ready(function () {
    function obtener_data_de_json(json) {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: json,
            success: function (data) {
                cargarDatos_graf(data)
            }
        });
    }

    function cargarDatos_graf(json) {
        var DatosJson = JSON.parse(JSON.stringify(json));

        let labels_array=[]

        for (var key in DatosJson.data[1]) {
           console.log(key);
           labels_array.push(key)
        }

        for (i = 0; i < DatosJson.data.length; i++) {
            $("#tbody_id").append('<tr id="id_' + i + '">');
            for (var key in DatosJson.data[1]) {
                console.log(DatosJson.data[i][key])
            }
        }
    }
    
    

    
    obtener_data_de_json('../assets/json/file-json-otro-example.json')
});

let tabla_gastos = new Morris.Line({
    // ID of the element in which to draw the chart.
    element: 'myfirstchart',
    // Chart data records -- each entry in this array corresponds to a point on
    // the chart.
    data: [{
            period: '0',
            Gasto: 0
        },
        {
            period: '0',
            Gasto: 0
        },
        {
            period: '0',
            Gasto: 0
        },
        {
            period: '0',
            Gasto: 0
        },
        {
            period: '0',
            Gasto: 0
        }
    ],
    // The name of the data record attribute that contains x-values.
    xkey: 'period',
    // A list of names of data record attributes that contain y-values.
    ykeys: ['Gasto'],
    // Labels for the ykeys -- will be displayed when you hover over the
    // chart.
    labels: ['Gasto', 'Perdidas'],

    resize: true,

    lineWidth: 1

});

$(document).ready(function () {

    //sticky column
    $("#Table").delegate( "thead tr th", "click", function(event) {
       if($(this).hasClass("sticky-column")== false){
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
        }
        else{
            $("table thead tr th").each(function () {
                $(this).removeClass('sticky-column');
            });
            $("table tbody tr").each(function () {
                $("td").removeClass('sticky-column');
            });
        }
    });

    
     //Recorrer el table para obtener los valores de la input
     function recorrer_inputs_table(){
        var data=[]
      
            $("table tbody tr").each(function(){
                
                var fecha = $(this).find("td:eq(0)").text();
                var total = $(this).find("td:eq(1)").children('input').val();
            
                if(total=="" || total==undefined){
                    total=0
                }
                data.push({ period: fecha, Gasto: total });
            });
                
                return data
    }
        //cargar los datos en el la grafica
        function enviar_datos_chart(){
            let new_data=[]
            new_data=recorrer_inputs_table()
            tabla_gastos.setData(new_data)
            console.log("enviados")
        }

        //detectar si se presinaron teclas
        $("#Table").delegate( "tbody tr", "keyup", function(event) {
            enviar_datos_chart()
    	}); 
    

    //boton borrar
    $(document).on('click', '.borrar', function (event) {
        event.preventDefault();
        $(this).closest('tr').remove();
        enviar_datos_chart()
    });

    $( "select" ).change(function() {
        enviar_datos_chart()
        
    })
    setTimeout(enviar_datos_chart,0.001);
});