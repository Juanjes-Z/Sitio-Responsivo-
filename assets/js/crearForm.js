    const tablaBody = document.querySelector('#tbodyConfig');
    const jsonConfiguracion = "https://mi-escuelamx.com/isad/dashboards/ingresosPorRangoFechasConfiguracion.asp?usuario=Admin&operacion=11";

    function crearElementoTablaConfig(estadistica, descripcion) {
        let creaElementoFila, elementoFila, creaElementoTD, elemtoTD,
        elementoCheckbox, elementoSelect, createElemntoOption;

        creaElementoFila = document.createElement('tr');
        elementoFila = tablaBody.appendChild(creaElementoFila);

        /**** añade titulo ****/
        creaElementoTD = document.createElement('td');
        elemtoTD = elementoFila.appendChild(creaElementoTD);
        elemtoTD.innerText = descripcion;

        /**** añade td para checkbox tabla ****/
        creaElementoTD = document.createElement('td');
        elemtoTD = elementoFila.appendChild(creaElementoTD);

        /**** crear checkbox tabla ****/
        createCheckboxTabla = document.createElement('input');
        createCheckboxTabla.setAttribute('type', 'checkbox');
        createCheckboxTabla.setAttribute('id', 'chkTabla11' + estadistica);
        elementoCheckbox = elemtoTD.appendChild(createCheckboxTabla);


        /**** añade td para checkbox porcentaje ****/
        creaElementoTD = document.createElement('td');
        elemtoTD = elementoFila.appendChild(creaElementoTD);

        /**** crear checkbox porcentaje ****/
        createCheckboxTabla = document.createElement('select');
        createCheckboxTabla.setAttribute('id', 'cboGrafica11' + estadistica);
        elementoSelect = elemtoTD.appendChild(createCheckboxTabla);

        createElemntoOption = document.createElement('Option');
        createElemntoOption.innerText = "No Graficar";
        createElemntoOption.setAttribute('value', '0');
        elemtoOption = elementoSelect.appendChild(createElemntoOption);

        createElemntoOption = document.createElement('Option');
        createElemntoOption.innerText = "Barras";
        createElemntoOption.setAttribute('value', '1');
        elemtoOption = elementoSelect.appendChild(createElemntoOption);

        createElemntoOption = document.createElement('Option');
        createElemntoOption.innerText = "Linea";
        createElemntoOption.setAttribute('value', '2');
        elemtoOption = elementoSelect.appendChild(createElemntoOption);


        /**** añade td para checkbox porcentaje ****/
        creaElementoTD = document.createElement('td');
        elemtoTD = elementoFila.appendChild(creaElementoTD);

        /**** crear checkbox porcentaje ****/
        createCheckboxTabla = document.createElement('input');
        createCheckboxTabla.setAttribute('type', 'checkbox');
        createCheckboxTabla.setAttribute('id', 'chkPorcentaje11' + estadistica);
        elementoCheckbox = elemtoTD.appendChild(createCheckboxTabla);
    }

    function crearTablaConf() {
        fetch(jsonConfiguracion).then(resp => {
            resp.json().then(data => {
                for (let i = 0; i < data.length; i++) {
                    estadistica = data[i]["estadistica"];
                    descripcion = data[i]["descripcion"];
                    crearElementoTablaConfig(estadistica, descripcion)
                }
            });
        });
    }

    
   crearTablaConf();