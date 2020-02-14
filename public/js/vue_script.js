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
        return this.mapPos !== null
            && this.items.length !== 0
            && this.info.fullname !== ""
            && /\S+@\S+/.test(this.info.email)
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
        missing: false,
    },

    computed: {
        mapMissing: function() {
            return this.missing & this.order.mapPos === null;
        }
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
            /* Update the saved map position to the postition of the click */
            let offset = {
                x: event.currentTarget.getBoundingClientRect().left,
                y: event.currentTarget.getBoundingClientRect().top,
            };
            this.order.mapPos = {
                x: event.clientX - 10 - offset.x,
                y: event.clientY - 10 - offset.y,
            };
        },
    },
});
