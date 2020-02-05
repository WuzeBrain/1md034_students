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
	let burger = menu[n].summary();
    let text = document.createTextNode(burger);
    let elem = document.createElement("li");
    elem.appendChild(text);
    return elem;
}

let burgers = document.createElement("ul");
burgers.appendChild(createBurger(0));
burgers.appendChild(createBurger(1));
burgers.appendChild(createBurger(2));
burgers.appendChild(createBurger(3));
burgers.appendChild(createBurger(4));
document.getElementById("myID").appendChild(burgers);


// const vm = new Vue({
//   el: '#myID',
//   data: {
//     arbitraryVariableName: 'Välj en burgare ' + new Date()
//   }
// })
