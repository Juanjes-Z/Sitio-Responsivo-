
const  SideNAvDOM = document.getElementById("theSidenav");

function openNav()
{
    SideNAvDOM.style.boxShadow = "3px 3px 3px 3px #00000030";
    SideNAvDOM.style.width = "200px";

}
  
function closeNav()
{
    SideNAvDOM.style.width = "0";
    SideNAvDOM.style.boxShadow = "none";
}
  /**** Crear menu con json *****/
  function cargarDatosMenuNav(json) {
    fetch (json).then(resp => {
        resp.json().then(data => {
            insertarEnlaces(data);
        });
    });
}

function insertarEnlaces(json){
    for (var key in json[0]) {
            $("#theSidenav").append('<a style="text-transform: capitalize ;" href="#">' + key + '</a>');
    }
}

window.onload = cargarDatosMenuNav('https://mi-escuelamx.com/isad/dashboards/ingresosPorRangoFechasConfiguracion.asp?usuario=Admin&operacion=11');


