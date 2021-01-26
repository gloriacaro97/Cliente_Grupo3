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
    constructor(titulo,artista,disco,año){
        this.titulo = titulo;
        this.artista = artista;
        this.disco = disco;
        this.año = año;
    }
}

// Clase Playlist
class Playlist{
    constructor(nombre,creador,numCanciones,canciones){
        this.nombre = nombre;
        this.creador = creador;
        this.numCanciones = numCanciones;
        this.canciones = canciones;
    }
}

// Clase Cliente
class Cliente{
    constructor(nombre,correo,contraseña,fechaNac){
        this.nombre = nombre;
        this.correo = correo;
        this.constraseña = contraseña;
        this.fechaNac = fechaNac;
    }
}

// Clase Subscripcion
class Subscripcion extends Cliente{
    constructor(nombre,correo,contraseña,fechaNac,premium){
        super(nombre,correo,contraseña,fechaNac);
        this.premium = premium;
    }
}