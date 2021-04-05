var options1 = {
    chart: {
        height: 250,
        type: 'radialBar',
    },
    series: [70],
    labels: ['Progreso 1'],
    colors: ["#20E647"],
    fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          gradientToColors: ["#000"],
          stops: [0, 100]
        }
      },
  }
  
  var chart1 = new ApexCharts(document.querySelector("#progress-1"), options1);
  
  chart1.render();

  var options2 = {
    chart: {
        height: 250,
        type: 'radialBar',
    },
    series: [40],
    labels: ['Progreso 2'],
  }
  
  var chart2 = new ApexCharts(document.querySelector("#progress-2"), options2);
  
  chart2.render();


  var options3 = {
    chart: {
        height: 250,
        type: 'radialBar',
    },
    series: [100],
    labels: ['Progreso 3'],
    colors: ["#665AE3"],
  }
  
  var chart3 = new ApexCharts(document.querySelector("#progress-3"), options3);
  
  chart3.render();
  
  chart2.updateSeries([30])