let tabla_gastos = new Morris.Line({
    // ID of the element in which to draw the chart.
    element: 'myfirstchart',
    // Chart data records -- each entry in this array corresponds to a point on
    // the chart.
    data: [
        { period: '2021', Gasto: 20 },
        { period: '2022', Gasto: 10 },
        { period: '2023', Gasto: 5 },
        { period: '2024', Gasto: 5 },
        { period: '2025', Gasto: 20 }
    ],
    // The name of the data record attribute that contains x-values.
    xkey: 'period',
    // A list of names of data record attributes that contain y-values.
    ykeys: ['Gasto'],
    // Labels for the ykeys -- will be displayed when you hover over the
    // chart.
    labels: ['Gasto'],

    resize: true,

    lineWidth: 1
    
    });

$(document).ready(function(){

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

    $('table thead tr th').click(function(event) {
       
        $("table thead tr th").each(function(){
            $(this).removeClass('sticky-column');

        });

        $(this).addClass('sticky-column');
        let pos = $(this).index()
        
        $("table tbody tr").each(function(){
            $("td").removeClass('sticky-column');

        });

        $("table tbody tr").each(function(){

            $(this).find("td:eq("+(pos-1)+")").addClass('sticky-column');
        });
        
        

    });

    function enviar_datos_chart(){
        let new_data=[]
        new_data=recorrer_inputs_table()
        tabla_gastos.setData(new_data)
    }

    enviar_datos_chart()

	$("table tbody tr").keyup(function(event){
        enviar_datos_chart()
	}); 

    $(document).on('click', '.borrar', function (event) {
        event.preventDefault();
        $(this).closest('tr').remove();
        enviar_datos_chart()
    });

});
