class MenuItem {
    constructor(name, img, size, desc, info) {
        this.name = name;
        this.img = img;
        this.size = size;
        this.desc = desc;
        this.info = info;
    }

    getName() {
        let name = document.createTextNode(this.name);
        let box = document.createElement("div");
        box.className = "cbox bname";
        box.appendChild(name);
        return box;
    }

    getImg() {
        let img = document.createElement("img");
        img.src = this.img;
        img.alt = this.name;
        let box = document.createElement("div");
        box.className = "cbox bimg";
        box.appendChild(img);
        return box;
    }

    getDetails() {
        let size = document.createElement("li");
        size.appendChild(document.createTextNode(this.size + "g"));
        let desc = document.createElement("li");
        desc.appendChild(document.createTextNode(this.desc));
        let info = document.createElement("li");
        info.appendChild(document.createTextNode(this.info));
        let list = document.createElement("ul");
        list.appendChild(size);
        list.appendChild(desc);
        list.appendChild(info);
        let box = document.createElement("div");
        box.className = "box blist";
        box.appendChild(list);
        return box;
    }

    show() {
        let box = document.createElement("div");
        box.className = "box burger";
        box.appendChild(this.getName());
        box.appendChild(this.getImg());
        box.appendChild(this.getDetails());
        return box;
    }
}

const menu = [
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

const burgers = document.getElementById("burgers");
for (let b of menu) {
    burgers.appendChild(b.show());
}
