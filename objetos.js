"use strict";

// Clase SPOTIFY
class Spotify{
    constructor(){
        this.canciones = [];
        this.clientes = [];
    }

    // MÉTODOS
    añadirSuscripcion(oCliente){
        let oClienteExistente = null;

        oClienteExistente = _buscarCliente(oCliente.correo);
        console.log(oCliente.correo);
        console.log(oClienteExistente);
        //Si el cliente no existe lo inserto
        if(oClienteExistente == null){
            this.clientes.push(oCliente);
            return true;
        }else{
            //El email existe
            return false;
        }
    }



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
    constructor(nombre,correo,contraseña,listaPlaylists){
        this.nombre = nombre;
        this.correo = correo;
        this.constraseña = contraseña;
        this.listaPlaylists = listaPlaylists;
    }
}

// Clase Suscripcion
class Suscripcion extends Cliente{
    constructor(nombre,correo,contraseña,listaPlaylists,premium){
        super(nombre,correo,contraseña,listaPlaylists);
        this.premium = premium;
    }
}