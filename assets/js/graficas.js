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
    ykeys: ['Gasto','perdidas'],
    // Labels for the ykeys -- will be displayed when you hover over the
    // chart.
    labels: ['Gasto', 'perdidas'],

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





//prueba de mago

let draw = false;

init();

/**
 * FUNCTIONS
 */

function init() {
  // initialize DataTables
  const table = $("#dt-table").DataTable();
  // get table data
  const tableData = getTableData(table);
  // create Highcharts
  createHighcharts(tableData);
  // table events
  setTableEvents(table);
}

function getTableData(table) {
  const dataArray = [],
    countryArray = [],
    populationArray = [],
    densityArray = [];

  // loop table rows
  table.rows({ search: "applied" }).every(function() {
    const data = this.data();
    countryArray.push(data[0]);
    populationArray.push(parseInt(data[1].replace(/\,/g, "")));
    densityArray.push(parseInt(data[2].replace(/\,/g, "")));
  });

  // store all data in dataArray
  dataArray.push(countryArray, populationArray, densityArray);

  return dataArray;
}

function createHighcharts(data) {
  Highcharts.setOptions({
    lang: {
      thousandsSep: ","
    }
  });

  Highcharts.chart("chart", {
    title: {
      text: "DataTables to Highcharts"
    },
    subtitle: {
      text: "Data from worldometers.info"
    },
    xAxis: [
      {
        categories: data[0],
        labels: {
          rotation: -45
        }
      }
    ],
    yAxis: [
      {
        // first yaxis
        title: {
          text: "Population (2017)"
        }
      },
      {
        // secondary yaxis
        title: {
          text: "Density (P/Km²)"
        },
        min: 0,
        opposite: true
      }
    ],
    series: [
      {
        name: "Population (2017)",
        color: "#0071A7",
        type: "column",
        data: data[1],
        tooltip: {
          valueSuffix: " M"
        }
      },
      {
        name: "Density (P/Km²)",
        color: "#FF404E",
        type: "spline",
        data: data[2],
        yAxis: 1
      }
    ],
    tooltip: {
      shared: true
    },
    legend: {
      backgroundColor: "#ececec",
      shadow: true
    },
    credits: {
      enabled: false
    },
    noData: {
      style: {
        fontSize: "16px"
      }
    }
  });
}

function setTableEvents(table) {
  // listen for page clicks
  table.on("page", () => {
    draw = true;
  });

  // listen for updates and adjust the chart accordingly
  table.on("draw", () => {
    if (draw) {
      draw = false;
    } else {
      const tableData = getTableData(table);
      createHighcharts(tableData);
    }
  });
}
//fin de la prueba
