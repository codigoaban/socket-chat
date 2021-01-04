var socket = io();

//recuperar parametros de la URL
var params = new URLSearchParams(window.location.search);
if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

//recogemos el parametro nombre de la url
var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};


//socket.emit('siguienteTicket', null, function(siguienteTicket) {

socket.on('connect', function() {
    console.log('Conectado al servidor');

    //dato que viene de la URL
    /* socket.emit('entrarChat', { nombre: 'Gladys' }, function(resp) {
         console.log(resp);

     });*/

    socket.emit('entrarChat', usuario, function(resp) {
        console.log(usuario);
        console.log('Usuarios conectados', resp)
    });

});

//Si el servidor me acepta ejecuto un callback


// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('crearMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

//Escuchar cuando un usuario entra o sale de un chat
socket.on('listaPersona', function(personas) {

    console.log(personas);

});


//Escuchar mensaje privado en el cliente
socket.on('mensajePrivado', function(mensaje) {
    console.log('Mensaje privado:', mensaje);
})