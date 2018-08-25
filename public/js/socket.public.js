// import {} from '../js/libs/jquery.min';


var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var tickets = [
    lblTicket1,
    lblTicket2,
    lblTicket3,
    lblTicket4
];

var escritorios = [
    lblEscritorio1,
    lblEscritorio2,
    lblEscritorio3,
    lblEscritorio4,
];


socket.on('estadoActual', (data) => {
    llenarHTML(data.ultimos4);
});

socket.on('ultimos4', (data) => {

    var audio = new Audio('../audio/new-ticket.mp3');
    audio.play();
    llenarHTML(data.ultimos4);
});

function llenarHTML(ultimos4) {
    for (var i = 0; i < ultimos4.length; i++) {
        tickets[i].text('Ticket #' + ultimos4[i].numero);
        escritorios[i].text('Escritorio #' + ultimos4[i].escritorio);
    }
}