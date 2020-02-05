class MenuItem {
    constructor(name, img, size, desc, info) {
        this.name = name;
        this.img = img;
        this.size = size;
        this.desc = desc;
        this.info = info;
    }

    summary() {
        return this.name + ", " + this.size + "g"
    }
}

let menu = [
    new MenuItem(
        "Nothing Burger",
        "img/nothingburger.jpg",
        120,
        "Only salad. Nothing more, nothing less.",
        "May contain traces of nuts."
    ),
    new MenuItem(
        "Veggie Burger",
        "img/gigaburger.jpg",
        90,
        "Contains an assortment of locally produced vegetables.",
        "100% vegan."
    ),
    new MenuItem(
        "Quad Burger",
        "img/quadburger.jpg",
        128,
        "Also available in a 50% larger size (Hexa Burger).",
        "101% non-vegan."
    ),
    new MenuItem(
        "sqrt(-1)",
        "img/void.jpg",
        0,
        "Contains whatever you want.",
        "Safe for everyone."
    ),
    new MenuItem(
        "'Murica",
        "img/murica.jpg",
        1776,
        "F**k Yeah!",
        "Eat at your own risk."
    )
];

function createBurger(n) {
    return "<li>" + menu[n].summary() + "</li>";
}

const vm = new Vue({
    el: '#myID',
    data: {
        burgers:
        "<ul>" +
        createBurger(0) +
        createBurger(1) +
        createBurger(2) +
        createBurger(3) +
        createBurger(4) +
        "</ul>"
    }
})
