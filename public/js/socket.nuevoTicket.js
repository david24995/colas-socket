// import {} from '../js/libs/jquery.min';


var socket = io();

socket.on('connect', () => {
    console.log('Conectado al servidor');
});

socket.on('disconnect', () => {
    console.log('Servidor desconectado');
});


$(function() {

    var lbl = $('#lblNuevoTicket');

    socket.on('estadoActual', (data) => {
        lbl.text(data.actual);
    });

    $('button').on('click', () => {
        socket.emit('siguienteTicket', null, (siguiente) => {
            lbl.text(siguiente);
        });
    });

    socket.on('actualizar', (siguiente) => {
        lbl.text(siguiente.siguiente);
    });

});