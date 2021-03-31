let draw = false;
function myFunction() {
    init("./assets/json/file-json-tabla.json");
}

function myFunction2() {
    init("./assets/json/file-json-tabla-otro.json");
}

        /**
         * FUNCTIONS
         */
        function init(json_file) {
            // initialize DataTables
            const table = $("#dt-table").DataTable({
                paging: false,
                "ordering": false,
                reponsive: true,
                "ajax": json_file,
                "columnDefs": [{
                    "targets": -1,
                    "data": null,
                    "defaultContent": "<input type='button' class='borrar btn' value='Eliminar' />"
                }]
            });
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
                densityArray = [],
                defectosArray = [];

            // loop table rows
            table.rows({
                search: "applied"
            }).every(function () {
                const data = this.data();
                countryArray.push(data[0]);
                populationArray.push(parseInt(data[1].replace(/\,/g, "")));
                densityArray.push(parseInt(data[2].replace(/\,/g, "")));
                defectosArray.push(parseInt(data[3].replace(/\,/g, "")));
            });

            // store all data in dataArray
            dataArray.push(countryArray, populationArray, densityArray, defectosArray);

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
                    text: "Tabla Titulo"
                },
                subtitle: {
                    text: ""
                },
                xAxis: [{
                    categories: data[0],
                    labels: {
                        rotation: -45
                    }
                }],
                yAxis: [{
                        // first yaxis
                        title: {
                            text: "Ganancias"
                        }
                    },
                    {
                        // secondary yaxis
                        title: {
                            text: "usuarios y defectos"
                        },
                        min: 0,
                        opposite: true
                    }
                ],
                series: [{
                        name: "Ganancias",
                        color: "#0071A7",
                        type: "spline",
                        data: data[1],
                        tooltip: {
                            valueSuffix: " M"
                        }
                    },
                    {
                        name: "Usuarios",
                        color: "#FF404E",
                        type: "spline",
                        data: data[2],
                        yAxis: 1
                    },
                    {
                        name: "Defectos",
                        color: "#0f0",
                        type: "spline",
                        data: data[3],
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