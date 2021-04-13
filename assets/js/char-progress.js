$("#butnP").click(function () {
  let fecha = new Date();
  let idNewChart = fecha.getHours();
  idNewChart = idNewChart + "" + fecha.getMinutes();
  idNewChart = idNewChart + "" + fecha.getSeconds();
  idNewChart = idNewChart + "" + fecha.getMilliseconds();

  //$(".dashboard .container").append('<div class="row" id= row'+idNewChart+'>');
  $('#progressRow').append('<div id="col' + idNewChart + '" style="text-align: right;">');
  $('#col' + idNewChart).addClass("col-12 col-md-4 mt-2 mb-2 p-md-1 p-4");
  $('#col' + idNewChart).append('<button  class="btn  btn-borrar btn-danger" value="' + idNewChart + '" > X </button>');
  $('#col' + idNewChart).append('<div class="porgress-cricle" style="border-radius: 10px;" id=chart' + idNewChart + ' > ');
  cargarDatosChartP('chart' + idNewChart);
});

function cargarDatosChartP(id) {
  let fecha = new Date();
  let idNewChart = fecha.getHours();
  idNewChart = idNewChart + "" + fecha.getMinutes();
  idNewChart = idNewChart + "" + fecha.getSeconds();
  idNewChart = idNewChart + "" + fecha.getMilliseconds();
  let porcentajeRandom = Math.round(Math.random() * (100 - 5) + 5 );
  let colorRandom1='#'+(Math.random() * 0xEEEEEE << 0).toString(16).padStart(6, '0');
  let colorRandom2='#'+(Math.random() * 0xEEEEEE << 0).toString(16).padStart(6, '0');

  var options1 = {
    chart: {
      height: 200,
      type: 'radialBar',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 900,
        animateGradually: {
          enabled: true,
          delay: 888558
        },
        dynamicAnimation: {
          enabled: true,
          speed: 3777
        }
      }
    },
    series: [porcentajeRandom],
    labels: ['P-'+(Math.round(fecha.getMilliseconds()/2))],
    colors: [colorRandom1],
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        gradientToColors: [colorRandom2],
        stops: [0, 80],
  
      },
    },
    plotOptions: {
      radialBar: {
        track: {
          background: '#D4D4D4'
        }
      }
    }
  }
  nuevaGrafica(id, options1)
}

function nuevaGrafica(id, options1) {
  let chart = new ApexCharts(document.querySelector("#"+id), options1);
  chart.render();
}