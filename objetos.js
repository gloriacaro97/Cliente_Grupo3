"use strict";

// Clase SPOTIFY
class Spotify{
    constructor(){
        this.canciones = [];
        this.clientes = [];
    }

    // MÉTODOS




}

// Clase Canción
class Cancion{
    constructor(titulo,artista,disco,año,genero){
        this.titulo = titulo;
        this.artista = artista;
        this.disco = disco;
        this.año = año;
        this.genero = genero;
    }
}

// Clase Playlist
class Playlist{
    constructor(nombre,creador,numCanciones,listaCanciones){
        this.nombre = nombre;
        this.creador = creador;
        this.numCanciones = numCanciones;
        this.listaCanciones = listaCanciones;
    }
}

// Clase Cliente
class Cliente{
    constructor(nombre,correo,contraseña,fechaNac,listaPlaylists){
        this.nombre = nombre;
        this.correo = correo;
        this.constraseña = contraseña;
        this.fechaNac = fechaNac;
        this.listaPlaylists = listaPlaylists;
    }
}

// Clase Subscripcion
class Subscripcion extends Cliente{
    constructor(nombre,correo,contraseña,fechaNac,listaPlaylists,premium){
        super(nombre,correo,contraseña,fechaNac,listaPlaylists);
        this.premium = premium;
    }
}