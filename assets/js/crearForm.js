    const tablaBody = document.querySelector('#tbodyConfig');
    const jsonConfiguracion = "https://mi-escuelamx.com/isad/dashboards/ingresosPorRangoFechasConfiguracion.asp?usuario=Admin&operacion=11";

    function crearElementoTablaConfig(estadistica, descripcion, apiTabla, apiPorcentaje) {
        let creaElementoFila, elementoFila, creaElementoTD, elemtoTD,
        elementoCheckbox, elementoSelect, createElemntoOption, createText, elementoText;

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

        /**** añade td para APItabla ****/
        creaElementoTD = document.createElement('td');
        creaElementoTD.style.display = "none";
        elemtoTD = elementoFila.appendChild(creaElementoTD);

        /**** crear text APItabla ****/
        createTextTabla = document.createElement('input');
        createTextTabla.setAttribute('type', 'text');
        createTextTabla.setAttribute('id', 'APItabla' + estadistica);
        createTextTabla.setAttribute('value', apiTabla);
        elementoText = elemtoTD.appendChild(createTextTabla);

        /**** añade td para APIporcentaje ****/
        creaElementoTD = document.createElement('td');
        creaElementoTD.style.display = "none";
        elemtoTD = elementoFila.appendChild(creaElementoTD);

        /**** crear text APIporcentaje ****/
        createTextPorcentaje = document.createElement('input');
        createTextPorcentaje.setAttribute('type', 'text');
        createTextPorcentaje.setAttribute('id', 'APIporcentaje' + estadistica);
        createTextPorcentaje.style.display = "none";
        createTextPorcentaje.setAttribute('value', apiPorcentaje);
        elementoText = elemtoTD.appendChild(createTextPorcentaje);
    }

    function crearTablaConf() {
        fetch(jsonConfiguracion).then(resp => {
            resp.json().then(data => {
                for (let i = 0; i < data.length; i++) {
                    estadistica = data[i]["estadistica"];
                    descripcion = data[i]["descripcion"];
                    apiTabla= ((data[i]["APItabla"]) != undefined)? data[i]["APItabla"]:"undefined";
                    apiPorcentaje= (data[i]["APIporcentaje"]) != undefined?data[i]["APIporcentaje"]:"undefined";
                    crearElementoTablaConfig(estadistica, descripcion, apiTabla, apiPorcentaje )
                }
            });
        });
    }

    
   crearTablaConf();