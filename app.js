/* jslint node: true */
/* eslint-env node */
'use strict';

// Require express, socket.io, and vue
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

// Pick arbitrary port for server
const port = 3000;
app.set('port', (process.env.PORT || port));

// Serve static assets from public/
app.use(express.static(path.join(__dirname, 'public/')));
// Serve vue from node_modules as vue/
app.use('/vue',
express.static(path.join(__dirname, '/node_modules/vue/dist/')));
// Serve index.html directly as root page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});
// Serve map.html as /map
app.get('/map', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/map.html'));
});
// Serve dispatcher.html as /dispatcher
app.get('/dispatcher', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/dispatcher.html'));
});

// Store data in an object to keep the global namespace clean and
// prepare for multiple instances of data if necessary
class Data {
    constructor() {
        this.orders = {};
        this.orderId = 0;
        this.states = {};
    }
    addOrder(order) {
        /* Adds an order to to the queue */
        // Store the order in an "associative array" with orderId as key
        this.orders[this.orderId] = order;
        this.states[this.orderId] = 0;
        return this.orderId++;
    }
    getAllOrders() {
        return {
            orders: this.orders,
            states: this.states,
        };
    }
}

const data = new Data();

io.on('connection', function(socket) {
    // Send list of orders when a client connects
    socket.emit('initialize', data.getAllOrders());

    // When a connected client emits an "addOrder" message
    socket.on('addOrder', function(order) {
        let orderId = data.addOrder(order);
        // send updated info to all connected clients,
        // note the use of io instead of socket
        emitQueue();
        socket.emit('orderAdded', {
            order: order,
            orderId: orderId,
        })
    }.bind(this));

    socket.on('changeState', function(id) {
        /* Change the state of an order to the next one */
        let state = data.states[id];
        if (state == 2) {
            delete data.orders[id];
        } else {
            data.states[id]++;
        }
        emitQueue();
        io.emit('nextState', id);
    }.bind(this));
});

function emitQueue() {
    io.emit('currentQueue', {
        orders: data.orders,
        states: data.states,
    });
}

/* eslint-disable-next-line no-unused-vars */
const server = http.listen(app.get('port'), function() {
    console.log('Server listening on port ' + app.get('port'));
});
