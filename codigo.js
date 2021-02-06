"use strict";

// Principal
var oSpotify = new Spotify();
cargarDatos();

// EVENTOS A BOTONES ----------------------------------------------------------------------------------------------------------------------------------
// NavBar
document.getElementById("home").addEventListener("click", mostrarFormHome);
document.getElementById("playlist").addEventListener("click", mostrarFormCrearPlaylist);
document.getElementById("suscripciones").addEventListener("click", mostrarFormSuscripcion);
document.getElementById("inicioSesion").addEventListener("click", mostrarFormInicioSesion);
document.getElementById("cerrarSesion").addEventListener("click", cerrarSesion);

// Formulario Home
document.getElementById("btnFiltrar").addEventListener("click", filtrarDatos);

// Formulario Inicio Sesión
document.getElementById("btnInicioSesion").addEventListener("click", validarFormularioIniSesion);

// Formulario Suscripcion
document.getElementById("btnSuscripcion").addEventListener("click", validarFormularioSuscripcion);

// Formulario Crear Playlist
document.getElementById("radioTodos").addEventListener("click", opcionesTodas);
document.getElementById("radioRock").addEventListener("click", opcionesRock);
document.getElementById("radioPop").addEventListener("click", opcionesPop);
document.getElementById("radioFlamenco").addEventListener("click", opcionesFlamenco);
document.getElementById("btnAñadirCancion").addEventListener("click", añadirCanciones);
document.getElementById("btnEliminarCancion").addEventListener("click", eliminarCanciones);
document.getElementById("btnCrearPlaylist").addEventListener("click", validarFormularioCrearPlaylist);


// FORMULARIOS ----------------------------------------------------------------------------------------------------------------------------------

mostrarFormHome();

// Oculta los formularios por defecto -----------------------------------------------------------------------------------------------
function ocultarFormularios() {
    formFiltradoGenero.style.display = "none";
    formInicioSesión.style.display = "none";
    formSuscripcion.style.display = "none";
    formCrearPlaylist.style.display = "none";
}

// HOME 
function mostrarFormHome(){
    ocultarFormularios();
    formFiltradoGenero.style.display = "block";
}

// CERRAR SESION ----------------------------------------------------------------------------------------------------------
function cerrarSesion(){
    if(oSpotify.sesionIniciada != null){
        oSpotify.cerrarSesion();
        mostrarFormHome();
        alert("Ha cerrado la sesión");
    }else{
        alert("No hay ninguna sesión iniciada");
        mostrarFormInicioSesion();
    }
}

// FORMULARIO DE INICIO DE SESION ----------------------------------------------------------------------------------------------------------
// Muestra el formulario de Inicio de Sesión 
function mostrarFormInicioSesion() {
    if(oSpotify.sesionIniciada == null){
        ocultarFormularios();
        formInicioSesión.style.display = "block";
    }else{
        alert("Ya hay una sesión iniciada");
    }
}

// Limpia los campos del formulario
function limpiarCamposInicioSesion() {
    formInicioSesión.email.value = "";
    formInicioSesión.passwordIni.value = "";
}

// VALIDACIÓN FORMULARIO INICIO DE SESIÓN *********
function validarFormularioIniSesion() {
    let sErrores = "";
    let bValido = true; // en principio el formulario es válido

    // Validación email 1
    let sEmail = formInicioSesión.email.value.trim();
    let oExpRegEm = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!oExpRegEm.test(sEmail)) {
        if (bValido) {
            formInicioSesión.email.focus();
            bValido = false;
        }
        sErrores += "\n- El email no es válido";
        formInicioSesión.email.classList.add("errorForm");
    } else {
        formInicioSesión.email.classList.remove("errorForm");
    }


    // Validación contraseña 
    let sPass = formInicioSesión.passwordIni.value.trim();
    let oExpRegPass = /^(?=(?:.*\d))(?=(?:.*[A-Z]))(?=(?:.*[a-z]))\S{5,10}$/;

    if (!oExpRegPass.test(sPass)) {
        // Si hasta el momento era correcto -> este el primer error
        if (bValido) {
            formInicioSesión.passwordIni.focus();
            bValido = false;
        }
        sErrores += "\n- La contraseña no tiene el formato correcto (de 5 a 10 caracteres)";
        formInicioSesión.passwordIni.classList.add("errorForm");
    } else {
        formInicioSesión.passwordIni.classList.remove("errorForm");
    }

    // --------------------------------------------------------------
    // COMPROBACIÓN FINAL
    if (bValido) { // Si todo OK
        // Inicia sesión si el formulario está relleno correctamente
        let correoUsuario = formInicioSesión.email.value;
        let contraseñaUsuario = formInicioSesión.passwordIni.value;

        let sesionIniciada = oSpotify.iniciarSesion(correoUsuario,contraseñaUsuario);

        if(sesionIniciada == 1){
            alert("Usuario no registrado. Realice una suscripción");
            mostrarFormSuscripcion();
        }else if(sesionIniciada == 2){
            alert("La contraseña no es correcta");
            formSuscripcion.passwordIni.focus();
        }else{
            alert("Sesión iniciada correctamente. Crea tu primera Playlist");
            limpiarCamposInicioSesion();
            mostrarFormCrearPlaylist();
        }

    } else {
        alert(sErrores);
    }

}
// VALIDACIÓN FORMULARIO INICIO DE SESIÓN *********

// FORMULARIO DE SUSCRIPCION ----------------------------------------------------------------------------------------------------------
// Muestra el formulario de Suscripción
function mostrarFormSuscripcion() {
    if(oSpotify.sesionIniciada == null){
        ocultarFormularios();
        formSuscripcion.style.display = "block";
    }else{
        alert("Cierre la sesión para realizar una nueva suscripción");
    }
}

// Limpia los campos del formulario
function limpiarCamposSuscripcion() {
    formSuscripcion.nombre.value = "";
    formSuscripcion.email.value = "";
    formSuscripcion.password.value = "";
    formSuscripcion.password2.value = "";
    formSuscripcion.checkboxPremium_0.checked = false;
}

// Confirmar suscripción
function añadirSuscripcion() {
    let oCliente;
    let nombre = formSuscripcion.nombre.value;
    let email = formSuscripcion.email.value;
    let contraseña = formSuscripcion.password.value;
    let suscripcion = formSuscripcion.checkboxPremium_0.checked;
    if(suscripcion){
        oCliente = new Suscripcion(nombre,email,contraseña,suscripcion);
    }else{
        oCliente = new Cliente(nombre,email,contraseña);
    }

    if (oSpotify.añadirSuscripcion(oCliente)) {
        alert("Cliente añadido");
        limpiarCamposSuscripcion();
        mostrarFormHome();
    } else {
        alert("Ese cliente ya existe");
    }
}

// VALIDACIÓN FORMULARIO SUSCRIPCIÓN *********
function validarFormularioSuscripcion() {

    let sErrores = "";
    let bValido = true; // en principio el formulario es válido

    // Validación Nombre Usuario
    let sNombreUsuario = formSuscripcion.nombre.value.trim();
    let oExpRegNomUs = /^[A-Za-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑ]{5,10}$/;

    if (!oExpRegNomUs.test(sNombreUsuario)) {
        bValido = false;
        sErrores = "\n- El Nombre de usuario no tiene el formato definido";
        formSuscripcion.nombre.classList.add("errorForm");
        formSuscripcion.nombre.focus();
    } else {
        formSuscripcion.nombre.classList.remove("errorForm");
    }

    // Validación email 1
    let sEmail = formSuscripcion.email.value.trim();
    let oExpRegEm = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!oExpRegEm.test(sEmail)) {
        if (bValido) {
            formSuscripcion.email.focus();
            bValido = false;
        }
        sErrores += "\n- El email no es válido";
        formSuscripcion.email.classList.add("errorForm");
    } else {
        formSuscripcion.email.classList.remove("errorForm");
    }

    // Validación contraseña 1
    let sPass1 = formSuscripcion.password.value.trim();
    let oExpRegPass = /^(?=(?:.*\d))(?=(?:.*[A-Z]))(?=(?:.*[a-z]))\S{5,10}$/;

    if (!oExpRegPass.test(sPass1)) {
        // Si hasta el momento era correcto -> este el primer error
        if (bValido) {
            formSuscripcion.password.focus();
            bValido = false;
        }
        sErrores += "\n- La contraseña 1 no tiene el formato correcto (de 5 a 10 caracteres)";
        formSuscripcion.password.classList.add("errorForm");
    } else {
        formSuscripcion.password.classList.remove("errorForm");
    }

    // Validación contraseña 2 
    let sPass2 = formSuscripcion.password2.value.trim();

    if (!oExpRegPass.test(sPass2)) {
        if (bValido) {
            formSuscripcion.password2.focus();
            bValido = false;
        }
        sErrores += "\n- La contraseña 1 no tiene el formato correcto (de 5 a 10 caracteres)";
        formSuscripcion.password2.classList.add("errorForm");
    } else {
        formSuscripcion.password2.classList.remove("errorForm");
    }

    // Validación de que las dos contraseñas son iguales -----------------------------------------------------------
    //console.log(sPass1);
    //console.log(sPass2);

    if (sPass1 != sPass2) {
        formSuscripcion.password2.focus();
        bValido = false;
        sErrores += "\n- Las contraseñas no coinciden";
        formSuscripcion.password2.classList.add("errorForm");
    } else {
        //alert("Las contraseñas son iguales");
        formSuscripcion.password2.classList.remove("errorForm");
    }

    // --------------------------------------------------------------
    // COMPROBACIÓN FINAL
    if (bValido) { // Si todo OK
        //alert("El formulario se ha rellenado correctamente");
        añadirSuscripcion();
    } else {
        //generamos el alert -------
        alert(sErrores);
    }

}
// VALIDACIÓN FORMULARIO SUSCRIPCIÓN *********

// FORMULARIO DE CREAR PLAYLIST ----------------------------------------------------------------------------------------------------------
// Muestra el formulario de Crear Playlist
function mostrarFormCrearPlaylist() {
    if(oSpotify.sesionIniciada == null){
        alert("Inicie sesión para crear una playlist");
        mostrarFormInicioSesion();
    }else{
        limpiarCamposCrearPlaylist();
        ocultarFormularios();
        formCrearPlaylist.style.display = "block";
    }
}

// Limpia los campos del formulario
function limpiarCamposCrearPlaylist() {
    formCrearPlaylist.nombrePlayList.value = "";
    formCrearPlaylist.radioGenero.value = "todos";
    limpiarComboPlaylist();
    opcionesTodas();
}

// Elimina las canciones de la playlist
function limpiarComboPlaylist() {
    var listaCanciones = document.getElementById("comboCrearPlaylist");
    while (listaCanciones.childElementCount > 0) {
        listaCanciones.removeChild(listaCanciones.childNodes[0]);
    }
}

// Elimina las canciones de la lista
function limpiarComboCrearCanciones() {
    var listaCanciones = document.getElementById("comboCrearCanciones");
    while (listaCanciones.childElementCount > 0) {
        listaCanciones.removeChild(listaCanciones.childNodes[0]);
    }
}

// Da como opción todas las canciones
function opcionesTodas() {
    limpiarComboCrearCanciones();
    let todasCanciones = oSpotify.canciones;
    var listaCanciones = document.getElementById("comboCrearCanciones");

    for (var i = 0; i < todasCanciones.length; i++) {
        var opcion = document.createElement("option");
        opcion.text = todasCanciones[i].titulo;
        opcion.value = todasCanciones[i].titulo;
        listaCanciones.add(opcion);
    }
}

// Da como opción las canciones de género ROCK
function opcionesRock() {
    limpiarComboCrearCanciones();
    let cancionesRock = oSpotify.filtrarCanciones("Rock");
    var listaCanciones = document.getElementById("comboCrearCanciones");

    for (var i = 0; i < cancionesRock.length; i++) {
        var opcion = document.createElement("option");
        opcion.text = cancionesRock[i].titulo;
        opcion.value = cancionesRock[i].titulo;
        listaCanciones.add(opcion);
    }
}

// Da como opción las canciones de género POP
function opcionesPop() {
    limpiarComboCrearCanciones();
    let cancionesPop = oSpotify.filtrarCanciones("Pop");
    var listaCanciones = document.getElementById("comboCrearCanciones");

    for (var i = 0; i < cancionesPop.length; i++) {
        var opcion = document.createElement("option");
        opcion.text = cancionesPop[i].titulo;
        opcion.value = cancionesPop[i].titulo;
        listaCanciones.add(opcion);
    }
}

// Da como opción las canciones de género FLAMENCO
function opcionesFlamenco() {
    limpiarComboCrearCanciones();
    let cancionesFlamenco = oSpotify.filtrarCanciones("Flamenco");
    var listaCanciones = document.getElementById("comboCrearCanciones");

    for (var i = 0; i < cancionesFlamenco.length; i++) {
        var opcion = document.createElement("option");
        opcion.text = cancionesFlamenco[i].titulo;
        opcion.value = cancionesFlamenco[i].titulo;
        listaCanciones.add(opcion);
    }
}

// Añadir canciones a la playlist
function añadirCanciones() {
    var listaCanciones = document.getElementById("comboCrearCanciones");
    var playlist = document.getElementById("comboCrearPlaylist");
    var valoresListaCanciones = listaCanciones.options;
    var valoresPlaylist = playlist.options;

    for (var i = 0; i < valoresListaCanciones.length; i++) {
        var noPasar = false;
        if (valoresListaCanciones[i].selected) {
            for (var j = 0; j < valoresPlaylist.length; j++) {
                if (valoresListaCanciones[i].value == valoresPlaylist[j].value) {
                    noPasar = true;
                }
            }
            if (!noPasar) {
                var opcion = document.createElement("option");
                opcion.text = valoresListaCanciones[i].text;
                opcion.value = valoresListaCanciones[i].value;
                valoresPlaylist.add(opcion);
            }
        }
    }
}

// Eliminar canciones de la playlist
function eliminarCanciones() {
    var playlist = document.getElementById("comboCrearPlaylist");
    var valoresPlaylist = playlist.options;

    for (var i = (valoresPlaylist.length - 1); i >= 0; i--) {
        if (valoresPlaylist[i].selected) {
            playlist.remove(i);
        }
    }
}

// Añadir playlist
function añadirPlaylist(){
    var oCliente = oSpotify.sesionIniciada;
    if(oSpotify.comprobarNumPlaylists(oCliente)){
        alert("No puede añadir más Playlists a su cuenta");
    }else{
        var nombrePlayList = formCrearPlaylist.nombrePlayList.value;
        var comboPlaylist = document.getElementById("comboCrearPlaylist");
        var valoresPlaylist = comboPlaylist.options;
        var cancionesPlaylist = [];

        for(var i = 0; i < valoresPlaylist.length; i++){
            var cancion = _buscarCancion(valoresPlaylist[i].value);
            cancionesPlaylist.push(cancion);
        }

        let numCanciones = cancionesPlaylist.length;
        var oPlaylist = new Playlist(nombrePlayList,oCliente,numCanciones,cancionesPlaylist);

        if(oSpotify.añadirPlaylist(oPlaylist)){
            alert("Playlist añadida correctamente");
            limpiarCamposCrearPlaylist();
        }else{
            alert("Ya existe una playlist con ese nombre");
        }
    }
}

// VALIDACIÓN FORMULARIO CREAR PLAYLIST *********
function validarFormularioCrearPlaylist() {

    let sErrores = "";
    let bValido = true; // en principio el formulario es válido

    // Validación Nombre Playlist
    let sNombrePlaylist = formCrearPlaylist.nombrePlayList.value.trim();
    let oExpRegNomPlaylist = /^[A-Za-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑ]{5,30}$/;

    if (!oExpRegNomPlaylist.test(sNombrePlaylist)) {
        bValido = false;
        sErrores = "\n- El Nombre de la playlist no es válido";
        formCrearPlaylist.nombrePlayList.classList.add("errorForm");
        formCrearPlaylist.nombrePlayList.focus();
    } else {
        formCrearPlaylist.nombrePlayList.classList.remove("errorForm");
    }

    // Validación Canciones Añadidas
    let sComboPlaylist = document.getElementById('comboCrearPlaylist');

    if (sComboPlaylist.options.length == 0) {
        bValido = false;
        sErrores = "\n- Debe añadir al menos una canción";
        formCrearPlaylist.comboCrearPlaylist.classList.add("errorForm");
        formCrearPlaylist.comboCrearPlaylist.focus();
    } else {
        formCrearPlaylist.comboCrearPlaylist.classList.remove("errorForm");
    }

    // --------------------------------------------------------------
    // COMPROBACIÓN FINAL
    if (bValido) { // Si todo OK
       //alert("El formulario se ha rellenado correctamente");
        añadirPlaylist();
    } else {
        //generamos el alert -------
        alert(sErrores);
    }

}
// VALIDACIÓN FORMULARIO CREAR PLAYLIST *********

// FUNCIONES DE BUSQUEDA ----------------------------------------------------------------------------------------------------------------
function _buscarCliente(email) {
    let oClienteExistente = null;
    oClienteExistente = oSpotify.clientes.find(oCliente => oCliente.correo == email);
    return oClienteExistente;
}

function _buscarPremium(email) {
    let oClientePremium = null;
    oClientePremium = oSpotify.clientes.find(oCliente => oCliente.correo == email && oCliente instanceof Suscripcion);
    return oClientePremium;
}

function _buscarCanciones(generoBuscado) {
    let cancionesGenero = [];
    for (var i = 0; i < oSpotify.canciones.length; i++) {
        if (oSpotify.canciones[i].genero == generoBuscado) {
            cancionesGenero.push(oSpotify.canciones[i]);
        }
    }
    return cancionesGenero;
}

function _buscarCancion(titulo){
    for (var i = 0; i < oSpotify.canciones.length; i++) {
        if (oSpotify.canciones[i].titulo == titulo) {
            return oSpotify.canciones[i];
        }
    }
}

function _buscarPlaylist(oPlaylist){
    var oCliente = oPlaylist.creador;

    for(var i = 0; i < oCliente.listaPlaylists.length; i++){
        if(oCliente.listaPlaylists[i].nombre == oPlaylist.nombre){
            return true;
        }
    }
    return false;
}

// IMPLEMENTACIÓN ARCHIVO XML ----------------------------------------------------------------------------------------------------------------

function cargarXML(filename) {
    if (window.XMLHttpRequest){
        var xhttp = new XMLHttpRequest();
    } else {// code for IE5 and IE6
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET", filename, false);

    xhttp.send();

    return xhttp.responseXML;
}

function cargarDatos(){
    var oXML = cargarXML("canciones.xml");
    var oCanciones = oXML.getElementsByTagName("cancion");

    // Cargo las canciones
    for(var i = 0; i < oCanciones.length; i++){
        var titulo = oCanciones[i].getElementsByTagName("titulo")[0].textContent;
        var artista = oCanciones[i].getElementsByTagName("artista")[0].textContent;
        var disco = oCanciones[i].getElementsByTagName("disco")[0].textContent;
        var año = oCanciones[i].getElementsByTagName("año")[0].textContent;
        var genero = oCanciones[i].getAttribute("genero");

        var cancion = new Cancion(titulo, artista, disco, año, genero);

        oSpotify.añadirCancion(cancion);
    }
}

// GESTIÓN HOME --------------------------------------------------------------------------------------------------------------------------------------

cargarCanciones();
cargarTabla();

function cargarCanciones(){
    var oXML = cargarXML("canciones.xml");
    var oCanciones = oXML.querySelectorAll("cancion");
    var sGeneros = [];

    // Creo una lista de canales sin repetición
    for(var i=0; i < oCanciones.length;i++){
        if(sGeneros.indexOf(oCanciones[i].getAttribute("genero")) < 0){
            sGeneros.push(oCanciones[i].getAttribute("genero"));
        }
    }

    // Creo los radio button necesarios
    for(var j=0;j<sGeneros.length;j++){
        var oRBT = document.createElement("input");
        oRBT.setAttribute("type","radio");
        oRBT.setAttribute("name","rbtGenero");
        oRBT.setAttribute("value",sGeneros[j]);
        var oTexto = document.createTextNode(sGeneros[j]);
        var oBR = document.createElement("BR");

        var oLabel = document.querySelector("label[for='rbtGenero']");
        oLabel.appendChild(oRBT);
        oLabel.appendChild(oTexto);
        oLabel.appendChild(oBR);
    }
}


function cargarTabla() {
    var oXML = cargarXML("canciones.xml");
    var oCanciones = oXML.querySelectorAll("cancion");
    //var oProgramasFecha = [];

    // Filtrar programas que se emitan en la fecha seleccionada
    /*for (var i=0; i< oProgramas.length; i++){
        var oFecha = oProgramas[i].querySelector("fecha");

        if (oFecha.textContent == sFecha){
            oProgramasFecha.push(oProgramas[i]);
        }
    }*/

    // Crear la tabla
    var oTabla = document.createElement("TABLE");
    oTabla.classList.add("table");
    oTabla.classList.add("table-bordered");
    oTabla.classList.add("table-hover");

    //Crear fila encabezado
    var oTHead = oTabla.createTHead();
    var oFila = oTHead.insertRow(-1);
    var oCelda = document.createElement("TH");
    oCelda.textContent = "Título";
    oFila.appendChild(oCelda);

    oCelda = document.createElement("TH");
    oCelda.textContent = "Artista";
    oFila.appendChild(oCelda);

    oCelda = document.createElement("TH");
    oCelda.textContent = "Disco";
    oFila.appendChild(oCelda);

    oCelda = document.createElement("TH");
    oCelda.textContent = "Año";
    oFila.appendChild(oCelda);

    oCelda = document.createElement("TH");
    oCelda.textContent = "Género";
    oFila.appendChild(oCelda);

    //Crear filas de contenido
    var oTBody = document.createElement("TBODY");
    oTabla.appendChild(oTBody);

    for(var j=0; j<oCanciones.length;j++){

        oFila = oTBody.insertRow(-1);
        oCelda = oFila.insertCell(-1);
        oCelda.textContent = oCanciones[j].querySelector("titulo").textContent;

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = oCanciones[j].querySelector("artista").textContent;

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = oCanciones[j].querySelector("disco").textContent;

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = oCanciones[j].querySelector("año").textContent;

        oCelda = oFila.insertCell(-1);
        oCelda.textContent = oCanciones[j].getAttribute("genero");
        oFila.dataset.genero =  oCelda.textContent;
    }

    var oResultado = document.querySelector("#resultado");
    for(var l=1; l< oResultado.children.length; l++){
        oResultado.children[l].parentNode.removeChild(oResultado.children[l]);
    }

    oResultado.appendChild(oTabla);
}

function filtrarDatos() {
    mostrarTodos();

    var sGenero = formFiltradoGenero.rbtGenero.value;

    if (sGenero != "todos"){
        var oFilas = document.querySelectorAll("tr[data-genero]");

        for(var i=0;i < oFilas.length; i++){
            if (oFilas[i].dataset.genero != sGenero)
                oFilas[i].classList.add("invisible");
        }
    }
}

function mostrarTodos(){
    var oFilasInvisibles=document.querySelectorAll(".invisible");
    for(var i=0;i < oFilasInvisibles.length; i++){
        oFilasInvisibles[i].classList.remove("invisible");
    }
}