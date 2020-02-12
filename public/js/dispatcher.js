/* jslint es6:true, indent: 4 */
/* global Vue, io */
/* exported vm */
'use strict';

const socket = io();

/* eslint-disable-next-line no-unused-vars */
const vm = new Vue({
    el: '#orders',

    data: {
        orders: {},
        selectedOrder: null
    },

    created: function() {
        socket.on('initialize', function(data) {
            this.orders = data.orders;
        }.bind(this));

        socket.on('currentQueue', function(data) {
            this.orders = data.orders;
        }.bind(this));
    },

    methods: {
        formatInfo: (info) => info.fullname + " (" + info.email + ", " + info.payment + ", " + info.gender + ")",
    }
});
