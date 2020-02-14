/* jslint es6:true, indent: 4 */
/* global Vue, io */
/* exported vm */
'use strict';

const socket = io();

/* eslint-disable-next-line no-unused-vars */
const vm = new Vue({
    el: '#orders',

    data: {
        orders: null,
        states: null,
        selectedOrder: null
    },

    created: function() {
        socket.on('initialize', function(data) {
            this.orders = data.orders;
            this.states = data.states;
        }.bind(this));

        socket.on('currentQueue', function(data) {
            this.orders = data.orders;
            this.states = data.states;
        }.bind(this));
    },

    methods: {
        formatInfo: (info) => info.fullname + " (" + info.email + ", " + info.payment + ", " + info.gender + ")",

        stateName: function(id) {
            /* Get the name of the state of an order */
            switch (this.states[id]) {
                case 0:
                    return "prep";
                case 1:
                    return "otw";
                case 2:
                    return "done";
                default:
                    console.log("Invalid state: '", this.states[id], "' on id '", id, "'");
            }
        },

        changeState: function(id) {
            /* Change the state of an order to the next one */
            socket.emit('changeState', id);
        },

        select: function(order) {
            /* Mark an order as selected or unmark it if it is already selected */
            this.selectedOrder = this.selectedOrder !== order ? order : null;
        },
    }
});
