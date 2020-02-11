"use strict";

const socket = io();

const vm = new Vue({
    el: "main",

    data: {
        menu: food,
        order: {
            details: {x: 0, y: 0},
            items: [],
            info: [],
        },
        fullname: "",
        email: "",
        payment: "Bitcoin",
        gender: "Undisclosed",
        burgers: [],
    },

    methods: {

        /* Return a Map entry as a string. */
        show: x => x.join(": "),

        updateOrder: function () {
            /* Update this.order with the form field contents. */
            this.order.items = this.burgers;
            this.order.info = [
                "fullname",
                "email",
                "payment",
                "gender"
            ].map(
                x => [x, vm[x]]
            );
        },

        addOrder: function() {
            /* Send the current order to the server */
            this.updateOrder();
            socket.emit('addOrder', {
                details: this.order.details,
                orderItems: this.order.items,
                customerInfo: this.order.info.map(x => x[1]),
            });
        },

        displayOrder: function(event) {
            /* When you click in the map, a click event object is sent as parameter
            * to the function designated in v-on:click (i.e. this one).
            * The click event object contains among other things different
            * coordinates that we need when calculating where in the map the click
            * actually happened. */
            let offset = {
                x: event.currentTarget.getBoundingClientRect().left,
                y: event.currentTarget.getBoundingClientRect().top,
            };
            this.order.details = {
                x: event.clientX - 10 - offset.x,
                y: event.clientY - 10 - offset.y,
            };
        }
    },
});
