/* jslint es6:true, indent: 4 */
/* global Vue, io, food */
/* exported vm*/
"use strict";

class Order {
    constructor() {
        this.mapPos = null;
        this.items = [];
        this.info = {
            fullname: "",
            email: "",
            payment: "Bitcoin",
            gender: "Undisclosed"
        };
    }
    finished() {
        if (this.mapPos === null || this.items.length === 0) {
            return false;
        }
        for (let val of Object.values(this.info)) {
            if (val === "") {
                return false;
            }
        }
        return true;
    }
}

const socket = io();

/* eslint-disable-next-line no-unused-vars */
const vm = new Vue({
    el: "main",

    data: {
        menu: food,
        order: new Order(),
        pastOrders: [],
        missing: false
    },

    methods: {

        addOrder: function() {
            /* Send the current order to the server */
            let fin = this.order.finished();
            if (fin) {
                socket.emit('addOrder', this.order);
                this.pastOrders.push(this.order);
                this.order = new Order();
            }
            this.missing = !fin;
        },

        updateMapPos: function(event) {
            /* ... */
            let offset = {
                x: event.currentTarget.getBoundingClientRect().left,
                y: event.currentTarget.getBoundingClientRect().top,
            };
            this.order.mapPos = {
                x: event.clientX - 10 - offset.x,
                y: event.clientY - 10 - offset.y,
            };
        }
    },
});
