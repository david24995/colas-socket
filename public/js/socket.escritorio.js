// import {} from '../js/libs/jquery.min';

var socket = io();

let getParams = new URLSearchParams(window.location.search);
if (!getParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = getParams.get('escritorio');

console.log(escritorio);

$('h1').text('Escritorio ' + escritorio);


$('button').on('click', () => {

    socket.emit('atenderTicket', { escritorio: escritorio }, (data) => {
        if (data === 'No hay tickets para atender') {
            $('small').text(`${data}`);
            alert('No hay tickets');
            return;
        }

        $('small').text(`Ticket #${data.numero}`);

    });

});