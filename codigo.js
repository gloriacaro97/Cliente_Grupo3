"use strict";

// Principal
var oSpotify = new Spotify();

// EVENTOS A BOTONES ----------------------------------------------------------------------------------------------------------------------------------
// NavBar
document.getElementById("playlist").addEventListener("click",mostrarFormCrearPlaylist);
document.getElementById("suscripciones").addEventListener("click",mostrarFormSuscripcion);
document.getElementById("inicioSesion").addEventListener("click",mostrarFormInicioSesion);

// Formulario Suscripcion
document.getElementById("btnSuscripcion").addEventListener("click",añadirSuscripcion);

// Formulario Playlist
document.getElementById("mostrarModPlaylist").addEventListener("click",mostrarFormModPlaylist);
document.getElementById("cancelarModPlaylist").addEventListener("click",mostrarFormCrearPlaylist);

// FORMULARIOS ----------------------------------------------------------------------------------------------------------------------------------

// ocultarFormularios(); 
ocultarFormularios();

// Oculta los formularios por defecto -----------------------------------------------------------------------------------------------
function ocultarFormularios() {
    formInicioSesión.style.display = "none";
    formSuscripcion.style.display = "none";
    formCrearPlaylist.style.display = "none";
    formModPlaylist.style.display = "none";
}

// Muestra el formulario de Inicio de Sesión -----------------------------------------------------------------------------------------------
function mostrarFormInicioSesion() {
    ocultarFormularios();
    formInicioSesión.style.display = "block";
}

// FORMULARIO DE SUSCRIPCION ----------------------------------------------------------------------------------------------------------
// Muestra el formulario de Suscripción
function mostrarFormSuscripcion() {
    ocultarFormularios();
    formSuscripcion.style.display = "block";
}

// Confirmar suscripción
function añadirSuscripcion(){
    let oCliente;
    let nombre = formSuscripcion.nombre.value;
    let email = formSuscripcion.email.value;
    let contraseña = formSuscripcion.password.value;
    let suscripcion = formSuscripcion.checkboxPremium_0.checked;
    if(suscripcion){
        oCliente = new Suscripcion(nombre,email,contraseña,[],suscripcion);
    }else{
        oCliente = new Cliente(nombre,email,contraseña,[]);
    }

    if(oSpotify.añadirSuscripcion(oCliente)){
        alert("Cliente añadido");
        formSuscripcion.nombre.value = "";
        formSuscripcion.email.value = "";
        formSuscripcion.password.value = "";
        formSuscripcion.password2.value = "";
        formSuscripcion.checkboxPremium_0.checked = false;
        ocultarFormularios();
    }else{
        alert("Ese cliente ya existe");
    }
}

// Muestra el formulario de Crear Playlist -----------------------------------------------------------------------------------------------
function mostrarFormCrearPlaylist() {
    ocultarFormularios();
    formCrearPlaylist.style.display = "block";
}

// Muestra el formulario de Modificar Playlist -----------------------------------------------------------------------------------------------
function mostrarFormModPlaylist() {
    ocultarFormularios();
    formModPlaylist.style.display = "block";
}

// FUNCIONES DE BUSQUEDA ----------------------------------------------------------------------------------------------------------------
function _buscarCliente(email){
    let oClienteExistente = null;
    oClienteExistente = oSpotify.clientes.find(oCliente => oCliente.correo == email);
    return oClienteExistente;
}