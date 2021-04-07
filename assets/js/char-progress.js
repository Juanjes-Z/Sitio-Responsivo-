var options1 = {
    chart: {
        height: 250,
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
    series: [70],
    labels: ['Progreso 1'],
    colors: ["#20Ef47"],
    fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          gradientToColors: ["#Fdaf4a"],
          stops: [0, 80],
         
        },
      },
      plotOptions: {
        radialBar: {
            track: {
              background: '#777'
            }
        }
    }
  }
  
  var chart1 = new ApexCharts(document.querySelector("#progress-1"), options1);
  
  chart1.render();

  var options2 = {
    chart: {
        height: 250,
        type: 'radialBar',
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 909,
          animateGradually: {
              enabled: true,
              delay: 9999
          },
          dynamicAnimation: {
              enabled: true,
              speed: 1999
          }
      }
    },
    series: [40],
    labels: ['Progreso 2'],
    plotOptions: {
      radialBar: {
          track: {
            background: '#777'
          }
      }
  }
  }
  
  var chart2 = new ApexCharts(document.querySelector("#progress-2"), options2);
  
  chart2.render();

  chart2.updateSeries([60])

  var options3 = {
    chart: {
        height: 250,
        type: 'radialBar',
    },
    series: [100],
    labels: ['Progreso 3'],
    colors: ["#665AE3"],
    plotOptions: {
      radialBar: {
          track: {
            background: '#777'
          }
      }
  }
  }
  
  var chart3 = new ApexCharts(document.querySelector("#progress-3"), options3);
  
  chart3.render();
  
  