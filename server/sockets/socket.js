const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utilidades/utilidades');


const usuarios = new Usuarios();


io.on('connection', (client) => {


    client.on('entrarChat', (data, callback) => {

        // console.log(data);
        //console.log(client.id);

        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre/sala es necesario'
            });
        }

        //usnir salas
        client.join(data.sala);


        usuarios.agregarPersona(client.id, data.nombre, data.sala);
        // console.log(dataPersona);

        //Este evento se ejecuta cada vez que una persona entra o sale del chat
        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSala(data.sala));

        client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Administrador', `${ data.nombre} se unió`));

        callback(usuarios.getPersonasPorSala(data.sala));

    });


    //notificar a todos los usuarios
    client.on('crearMensaje', (data, callback) => {
        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);

        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);


        //notificar cuando se recibe el mensaje
        callback(mensaje);

    })

    //borrar una persona
    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);

        //client.broadcast.emit('crearMensaje', { usuario: 'Administrador', mesanje: `${personaBorrada.nombre} abandono el chat` });
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${ personaBorrada.nombre} salió`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaBorrada.sala));

    });


    //Mensaje privado
    client.on('mensajePrivado', data => {

        //para sabe que persona esta enviando el mensaje
        let persona = usuarios.getPersona(client.id);

        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));

    })


});