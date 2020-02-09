"use strict";

const socket = io();

const vm = new Vue({
    el: "main",

    data: {
        orders: {},
        menu: food,
        order: {details: {x: 0, y: 0}, fields: null},
        fullname: "",
        email: "",
        payment: "Bitcoin",
        gender: "undisclosed",
        burgers: [],
        orderID: 0,
    },

    methods: {

        updateOrder: function () {
            /* Update this.order with the form field contents. */
            console.log("Button Clicked!");
            this.order.fields = new Map(
                [
                    "fullname",
                    "email",
                    "payment",
                    "gender",
                    "burgers",
                ].map(
                    x => [x, vm[x]]
                )
            );
            console.log(this.order);
        },

        /* Return a Map entry as a string. */
        show: x => x.join(": "),

        getNext: () => this.orderID++,

        addOrder: function(event) {
            /* When you click in the map, a click event object is sent as parameter
            * to the function designated in v-on:click (i.e. this one).
            * The click event object contains among other things different
            * coordinates that we need when calculating where in the map the click
            * actually happened. */
            this.updateOrder();
            socket.emit('addOrder', {
                orderId: this.getNext(),
                details: this.order.details,
                orderItems: this.order.fields.get("burgers"),
            });
            console.log(this.order.fields.get("burgers"))
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
