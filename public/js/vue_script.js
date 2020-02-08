"use strict"

const vm = new Vue({
    el: "main",
    data: {
        menu: food,
        order: null,
        fullname: "",
        email: "",
        street: "",
        house: "",
        payment: "Bitcoin",
        gender: "undisclosed",
        burgers: []
    },
    methods: {
        send: function () {
            console.log("Button Clicked!");
            this.order = new Map(
                [
                    "fullname",
                    "email",
                    "street",
                    "house",
                    "payment",
                    "gender",
                    "burgers"
                ].map(
                    x => [x, vm[x]]
                )
            );
            console.log(this.order);
        },
        show: x => x.join(": ")
    }
});
