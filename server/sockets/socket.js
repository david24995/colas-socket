const { TicketControl } = require('../classes/ticket-control')

const ticketControl = new TicketControl();


const { ios } = require('../server');

ios.on('connection', (client) => {

    console.log('Usuario conectado');

    // client.on('disconnect', () => {
    //     console.log('usuario desconectado');
    // });

    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguiente();

        // console.log(siguiente);
        callback(siguiente);

        client.broadcast.emit('actualizar', { siguiente: siguiente });

    });

    const estado = {
        actual: ticketControl.getUltimo(),
        ultimos4: ticketControl.getUltimos4()
    };

    client.emit('estadoActual', estado);


    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback('No hay un escritorio por atender');
        }
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        // console.log(data);
        console.log(atenderTicket);

        callback(atenderTicket);

        client.broadcast.emit('ultimos4', { ultimos4: ticketControl.getUltimos4() });
    });


});