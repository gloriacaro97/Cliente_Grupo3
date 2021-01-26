"use strict";

// Principal
var oSpotify = new Spotify();

// FORMULARIOS ----------------------------------------------------------------------------------------------------------------------------------

// ocultarFormularios(); 
ocultarFormularios();

// Oculta los formularios por defecto -----------------------------------------------------------------------------------------------
function ocultarFormularios() {
    formInicioSesión.style.display = "none";
    formSuscripcion.style.display = "none";
    formCrearPlaylist.style.display = "none";
}

// Muestra el formulario de Inicio de Sesión -----------------------------------------------------------------------------------------------
function mostrarFormInicioSesion() {
    ocultarFormularios();
    formInicioSesión.style.display = "block";
}

// Muestra el formulario de Suscripción -----------------------------------------------------------------------------------------------
function mostrarFormSuscripcion() {
    ocultarFormularios();
    formSuscripcion.style.display = "block";
}

// Muestra el formulario de Crear Playlist -----------------------------------------------------------------------------------------------
function mostrarFormCrearPlaylist() {
    ocultarFormularios();
    formCrearPlaylist.style.display = "block";
}