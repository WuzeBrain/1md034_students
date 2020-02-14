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
        pastOrders: {},
        states: {},
        missing: false,
    },

    computed: {
        mapMissing: function() {
            return this.missing & this.order.mapPos === null;
        }
    },

    created: function() {
        socket.on('orderAdded', function(data) {
            this.pastOrders[data.orderId] = data.order;
            let t = this.pastOrders;
            this.pastOrders = null;
            this.pastOrders = t;
            this.states[data.orderId] = 0;
        }.bind(this));

        socket.on('nextState', function(id) {
            if (this.states[id] !== undefined) {
                this.states[id]++;
            }
            if (this.states[id] == 3) {
                delete this.pastOrders[id];
                let t = this.pastOrders;
                this.pastOrders = null;
                this.pastOrders = t;
            }
            let t = this.states;
            this.states = null;
            this.states = t;
        }.bind(this));
    },

    methods: {

        addOrder: function() {
            /* Send the current order to the server */
            let fin = this.order.finished();
            if (fin) {
                socket.emit('addOrder', this.order);
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

        stateName: function(id) {
            switch (this.states[id]) {
                case 0:
                    return "Placed";
                case 1:
                    return "In Preparation";
                case 2:
                    return "On the way";
                default:
                    console.log("Invalid state: '", this.states[id], "' on id '", id, "'");
            }
        },
    },
});
