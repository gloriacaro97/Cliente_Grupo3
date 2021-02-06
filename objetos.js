"use strict";

// Clase SPOTIFY
class Spotify{
    constructor(){
        this.canciones = [];
        this.clientes = [];
        this.sesionIniciada = null;
    }

    // MÉTODOS
    cerrarSesion(){
        this.sesionIniciada = null;
    }

    iniciarSesion(email,password){
        let oClienteExistente = null;
        oClienteExistente = _buscarCliente(email);

        if(oClienteExistente == null){
            return 1; // No existe el usuario
        }else{
            if(oClienteExistente.contraseña != password){
                return 2; // Contraseña incorrecta
            }else{
                this.sesionIniciada = oClienteExistente;
                return 0; // Todo correcto
            }
        }
    }

    añadirSuscripcion(oCliente){
        let oClienteExistente = null;

        oClienteExistente = _buscarCliente(oCliente.correo);
        //Si el cliente no existe lo inserto
        if(oClienteExistente == null){
            this.clientes.push(oCliente);
            return true;
        }else{
            //El email existe
            return false;
        }
    }

    añadirPlaylist(oPlaylist){
        var oCliente = oPlaylist.creador;
        if(_buscarPlaylist(oPlaylist)){
            return false; // Ya existe una playlist con ese nombre
        }else{
            oCliente.listaPlaylists.push(oPlaylist);
            return true; // Todo correcto
        }
    }

    filtrarCanciones(generoBuscado){
        let cancionesGenero = _buscarCanciones(generoBuscado);
        return cancionesGenero;
    }

    comprobarNumPlaylists(oCliente){
        var oClientePremium = null;
        oClientePremium = _buscarPremium(oCliente.correo);

        if(oClientePremium != null){
            return false; // El cliente es premium y tiene un número ilimitado de Playlists
        }else{
            if(oCliente.listaPlaylists.length() == 3){
                return true; // El cliente no es premium y tiene el máximo de Playlists permitidas
            }else{
                return false;
            }
        }
    }

    añadirCancion(cancion){
        this.canciones.push(cancion);
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
    constructor(nombre,correo,contraseña){
        this.nombre = nombre;
        this.correo = correo;
        this.contraseña = contraseña;
        this.listaPlaylists = [];
    }
}

// Clase Suscripcion
class Suscripcion extends Cliente{
    constructor(nombre,correo,contraseña,premium){
        super(nombre,correo,contraseña);
        this.premium = premium;
    }
}