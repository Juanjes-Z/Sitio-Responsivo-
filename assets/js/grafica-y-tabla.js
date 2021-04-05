let draw = false;

var options = {
    chart: {
    },
    dataLabels: {
        enabled: false
    },
    series: [],
    title: {
        text: 'Ajax Example',
    },
    noData: {
      text: 'Loading...'
    },
    xaxis: {
        categories: ['ENE', 'FEB', 'MAR','ABR'],
      }
  }
  
  var chart = new ApexCharts(
    document.querySelector("#chart"),
    options
  );
  
  chart.render();
        /**
         * FUNCTIONS
         */
         
        function init() 
        {
            // initialize DataTables
            const table = $("#dt-table").DataTable({
                paging: false,
                "ordering": false,
                reponsive: true,
                searching: false,
                "ajax": './assets/json/miescuela_asp.json',
                "columns": [
                    { "data": "mes" },
                    { "data": "ingreso" },
                    {
                        "targets": -1,
                        "data": null,
                        "defaultContent": "<input type='button' class='borrar btn' value='Eliminar' />"
                    }
                ]
            });
            
            // get table data
            const tableData = getTableData(table);
            // create Highcharts
            createHighcharts(tableData);
            
            // table events
            setTableEvents(table);

            /*$( "select" ).change(function() {
                var str = "";
                $( "select option:selected" ).each(function() {
                    str += $( this ).val();
                    switch(str){
                        case "1":
                            table.ajax.url( './assets/json/file-json-tabla.json' ).load();
                            break;
                        case "2":
                            table.ajax.url( './assets/json/file-json-tabla-otro.json' ).load();
                            break;
                    }
                });
            })*/
        }

        function getTableData(table) {
            const dataArray = [],
                countryArray = [],
                populationArray = []

            // loop table rows
            table.rows({
                search: "applied"
            }).every(function () {
                const data = this.data();
                countryArray.push(data["mes"]);
                populationArray.push(parseInt(data["ingreso"]));
            });

            // store all data in dataArray
            dataArray.push(countryArray, populationArray);

            console.log(dataArray)
            return dataArray;
        }

        function createHighcharts(data) {
            chart.updateSeries(
                [
                {
                    name: 'Ganancias',
                    data: data[1]
                }
                ])
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

            $(document).on('click', '.borrar', function (event) {

                table.row($(this).parents('tr')).remove().draw(false);
                const tableData = getTableData(table);
                createHighcharts(tableData);
            });
        }
        

    //sticky
        $("#dt-table").delegate( "thead tr th", "click", function(event) {
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

    window.onload = init();