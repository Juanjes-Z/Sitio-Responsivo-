
    function llenarTablaConf(jsonConfiguracion = "https://mi-escuelamx.com/isad/dashboards/ingresosPorRangoFechasConfiguracion.asp?usuario=Admin&operacion=11") {
        fetch(jsonConfiguracion).then(resp => {
            resp.json().then(data => {
                for (let i = 0; i < data.length; i++) {
                    estadistica = data[i]["estadistica"];
                    porcentaje = data[i]["porcentaje"];
                    grafica = data[i]["grafica"];
                    tabla = data[i]["tabla"];

                    switch (estadistica) {
                        case "01":
                            porcentajeM.checked = (porcentaje == 1) ? true : false;
                            tipoGraficaM.selectedIndex = grafica + "";
                            tablaM.checked = (tabla == 1) ? true : false;
                            break;

                        case "02":
                            porcentajeN.checked = (porcentaje == 1) ? true : false;
                            tipoGraficaN.selectedIndex = grafica + "";
                            tablaN.checked = (tabla == 1) ? true : false;
                            break;

                        case "03":
                            porcentajeCA.checked = (porcentaje == 1) ? true : false;
                            tipoGraficaCA.selectedIndex = grafica + "";
                            tablaCA.checked = (tabla == 1) ? true : false;
                            break;

                        case "04":
                            porcentajeCU.checked = (porcentaje == 1) ? true : false;
                            tipoGraficaCU.selectedIndex = grafica + "";
                            tablaCU.checked = (tabla == 1) ? true : false;
                            break;

                        case "05":
                            porcentajeLP.checked = (porcentaje == 1) ? true : false;
                            tipoGraficaLP.selectedIndex = grafica + "";
                            tablaLP.checked = (tabla == 1) ? true : false;
                            break;
                    }
                }
            });
        });
    }