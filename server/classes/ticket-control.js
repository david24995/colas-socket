const fs = require('fs');

class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }


}



class TicketControl {


    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];
        this.data = require('../data/data.json');

        if (this.data.hoy === this.hoy) {
            this.ultimo = this.data.ultimo;
            this.tickets = this.data.tickets;
            this.ultimos4 = this.data.ultimos4;
        } else {
            this.reiniciarConteo();
        }

    }
    siguiente() {
        this.ultimo++;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.guardarData();
        return `Ticket ${this.ultimo}`;
    }

    atenderTicket(escritorio) {

        if (this.tickets.length === 0) {
            return 'No hay tickets para atender'
        };

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let nuevoTicket = new Ticket(numeroTicket, escritorio);

        this.ultimos4.unshift(nuevoTicket);

        if (this.ultimos4.length > 4) {
            this.ultimos4.pop();
        }
        this.guardarData();
        console.log(this.ultimos4);
        return nuevoTicket;

    }

    getUltimos4() {
        return this.ultimos4;
    }


    guardarData() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.guardarData();
    }

    getUltimo() {
        return `Ticket ${this.ultimo}`;
    }



}

module.exports = {
    TicketControl
}