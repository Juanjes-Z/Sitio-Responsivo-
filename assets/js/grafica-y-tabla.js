var url = 'http://192.168.1.115/isad/dashboards/ingresosmensuales.asp';

var options = {
  chart: {
      height: 350,
      type: 'bar',
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
  }
}

var chart = new ApexCharts(
  document.querySelector("#chart"),
  options
);

chart.render();

$.getJSON(url, function(response) {
    chart.updateSeries([{
      name: 'Sales',
      data: response
    }])
  });


//sticky
$("#dt-table").delegate("thead tr th", "click", function (event) {
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