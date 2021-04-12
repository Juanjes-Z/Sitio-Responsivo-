const jsonescuela = 'https://mi-escuelamx.com/isad/dashboards/ingresosmensualesnivel.asp';
fetch (jsonescuela).then(resp => {
    
    resp.json(data => {
        console.log(data);
    });

});