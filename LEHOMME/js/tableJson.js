"use strict";

/*arreglo de objetos que conforman la tabla*/
let productos = [
        { "imagen": "images/pant1.jpg", "name": "PANTALÓN PLIEGUES", "price": "5.990,00 ARS", "stock": "OUT OF STOCK" },
        { "imagen": "images/suda2.jpg", "name": "SUDADERA BÁSICA CAPUCHA", "price": "5.590,00 ARS", "stock": "OUT OF STOCK" },
    ]
/*arreglo de objetos con el que se agregan tres productos aleatorios al tocar en boton Cargar 3*/
let prodRandom = [
    { "imagen": "images/prodRandom/1.jpg", "name": "CAZADORA DOBLE FAZ", "price": "17.990,00 ARS", "stock": "OUT OF STOCK" },
    { "imagen": "images/prodRandom/2.jpg", "name": "ABRIGO ESTRUCTURA", "price": "35.990,00 ARS", "stock": "OUT OF STOCK" },
    { "imagen": "images/prodRandom/3.jpg", "name": "CAZADORA BOMBER CONFORT", "price": "10.990,00 ARS", "stock": "AVAILABLE" },
    { "imagen": "images/prodRandom/4.jpg", "name": "CAZADORA BORREGUILLO", "price": "10.990,00 ARS", "stock": "OUT OF STOCK" },
    { "imagen": "images/prodRandom/5.jpg", "name": "CAZADORA CANGURO", "price": "10.990,00 ARS", "stock": "AVAILABLE" },
    { "imagen": "images/prodRandom/6.jpg", "name": "CAZADORA EFECTO PIEL", "price": "14.990,00 ARS", "stock": "AVAILABLE" },
    { "imagen": "images/prodRandom/7.jpg", "name": "SUDADERA LIMITED EDITION", "price": "9.590,00 ARS", "stock": "OUT OF STOCK" },
    { "imagen": "images/prodRandom/8.jpg", "name": "BOTÍN PIEL SPORT NEGRO", "price": "17.990,00 ARS", "stock": "AVAILABLE" },
    { "imagen": "images/prodRandom/9.jpg", "name": "CAZADORA ACOLCHADA", "price": "17.990,00 ARS", "stock": "AVAILABLE" }
]

let tableJson = document.querySelector(".tableJson");
let cantidadProductos = document.getElementById("cantCol");

/*esta funcion crea el div del producto a partir de la informacion que se encuentra 
en alguna posicion de un arreglo, con sus respectivas clases*/
function createProductDiv(index, arreglo) {
    let newDiv = document.createElement('div');
    let containerStock = document.createElement('div');
    containerStock.classList.add("containerStock");
    newDiv.classList.add("productWrapper");
    let imagen = document.createElement('img');
    imagen.src = arreglo[index].imagen;
    containerStock.appendChild(imagen);
    let stock = document.createElement('div');
    let stockText = document.createElement('p');
    stockText.innerText = arreglo[index].stock;
    if (stockText.innerText == "OUT OF STOCK") {
        stock.classList.add("noStock");
    } else { stock.classList.add("stock"); }
    if ((stockText.innerText == "OUT OF STOCK") && (cantidadProductos.value == "2")) {
        stock.classList.add("noStock");
    } else if (stockText.innerText != "OUT OF STOCK") {
        stock.classList.remove("noStock")
        stock.classList.add("stock");
    }
    stock.appendChild(stockText);
    containerStock.appendChild(stock);
    newDiv.appendChild(containerStock);
    let infoProd = document.createElement('div');
    let nameProd = document.createElement('figcaption');
    nameProd.innerText = arreglo[index].name;
    nameProd.classList.add("uppercase");
    infoProd.appendChild(nameProd);
    let price = document.createElement('p');
    price.innerText = arreglo[index].price;
    price.classList.add("priceProd");
    infoProd.appendChild(price);
    infoProd.classList.add("infoProd");
    newDiv.appendChild(infoProd);
    return newDiv;
}

/*estas lineas cargan los productos existentes en el arreglo productos*/
let newLine = document.createElement('div');
newLine.classList.add("displayLine");
for (let index = 0; index < productos.length; index++) {
    let newDiv = createProductDiv(index, productos);
    newDiv.children[0].children[0].classList.add("medium");
    newLine.appendChild(newDiv);
}
tableJson.appendChild(newLine);

/*se selecciona el boton vaciar y se le otorgan dos funciones, una que vacia el arreglo
productos que conforma la tabla JSON, es decir, el modelo (js) y otra que vacia la vista (html)*/
let vaciar = document.getElementById("vaciar");
vaciar.addEventListener('click', vaciarTabla);
vaciar.addEventListener('click', vaciarArreglo);

function vaciarArreglo() {
    event.preventDefault();
    for (let index = productos.length - 1; index >= 0; index--) {
        productos.pop();
    }
}

function vaciarTabla() {
    event.preventDefault();
    let hijos = tableJson.children;
    for (let index = hijos.length - 1; index >= 0; index--) {
        hijos[index].remove();
    }
}

/*se selecciona el boton cargar tres y se le otorga la funcion de cargar
tres productos en una linea con sus respectivas clases*/
let btn3 = document.getElementById("btn3").addEventListener('click', () => {
    event.preventDefault();
    let posExistentes = [];
    let threeProducts = document.createElement('div');
    threeProducts.classList.add("displayLine");
    for (let index = 1; index <= 3; index++) {
        let posRandom = Math.floor(Math.random() * 9);
        posRandom = verificarNoRepeticion(posExistentes, posRandom);
        let newDiv = createProductDiv(posRandom, prodRandom);
        newDiv.children[0].children[0].classList.add("small");
        threeProducts.appendChild(newDiv);
        let producto = prodRandom[posRandom];
        productos.push(producto);
        posExistentes.push(posRandom);
    }
    tableJson.appendChild(threeProducts);
    if (innerWidth < 800) { cambiarLayout(); }
}); /*esta funcion verifica que de los tres productos que se cargan, no sean igual entre si*/
function verificarNoRepeticion(arreglo, pos) {
    for (let index = 0; index < arreglo.length; index++) {
        if (arreglo[index] == pos) {
            while (arreglo[index] == pos) {
                pos = Math.floor(Math.random() * 9);
            }
        }
    }
    return pos;
}

/*cuando el select cantidad del formulario se encuentra en 1 se oculta
la carga de informacion del segundo producto, sino se muestra*/
let secondProduct = document.querySelector(".hide");
cantidadProductos.addEventListener('change', mostrarMas);

function mostrarMas() {
    if (cantidadProductos.value == "2") {
        secondProduct.classList.remove("hide");
        secondProduct.classList.add("formStyle");
    } else {
        secondProduct.classList.remove("formStyle");
        secondProduct.classList.add("hide");
    }
}
/*selecciona los elementos de carga de informacion del primer producto*/
let srcFoto1 = document.getElementById("srcFoto1");
let product1 = document.querySelector(".product1");
let price1 = document.querySelector(".price1");
let stock1 = document.getElementById("stock1");
/*selecciona los elementos de carga de informacion del segundo producto*/
let srcFoto2 = document.getElementById("srcFoto2");
let product2 = document.querySelector(".product2");
let price2 = document.querySelector(".price2");
let stock2 = document.getElementById("stock2");
/*selecciona el boton cargar productos y le otorga la funcion de ya sea
verificar la carga de producto 1 si el select cantidad esta en 1, o verificar
la carga de los 2 productos si el select cantidad esta en 2*/
let btncargar = document.getElementById("btncargar").addEventListener('click', () => {
    event.preventDefault;
    if (cantidadProductos.value == "2") {
        verificarProductos();
        if (innerWidth < 800) { cambiarLayout(); }
    } else {
        let verificado1 = false;
        verificado1 = verificarProducto(product1, price1, srcFoto1, stock1);
        if (verificado1 == true) {
            let newDiv = createProductDiv(productos.length - 1, productos);
            newDiv.children[0].children[0].classList.add("large");
            product1.value = "";
            price1.value = "";
            verificado1 = false;
            let newLine = document.createElement('div');
            newLine.classList.add("displayLine");
            newLine.appendChild(newDiv);
            tableJson.appendChild(newLine);
            if (innerWidth < 800) { cambiarLayout(); }
        }
    }
});
/*esta funcion verifica que la informacion del producto sea valida antes de cargarlo*/
function verificarProducto(product, price, srcFoto, stock) {
    event.preventDefault();
    let verificado = false;
    let productWrapper = { "imagen": "", "name": "", "price": "", "stock": "" };
    product.classList.remove("invalidInput");
    price.classList.remove("invalidInput");
    if (product.value == "") {
        product.classList.add("invalidInput");
    }
    if ((price.value == "") || (price.value < 0) || (price.value > 99999)) {
        price.classList.add("invalidInput");
    }
    if ((product.value != "") && (price.value != "") && (price.value >= 0) && (price.value <= 99999)) {
        productWrapper.imagen = srcFoto.value;
        productWrapper.name = product.value;
        productWrapper.price = price.value + ",00 ARS";
        productWrapper.stock = stock.value;
        productos.push(productWrapper);
        verificado = true;
    }
    return verificado;
}
/*si el select cantidad esta en 2 verifica la informacion de ambos productos*/
function verificarProductos() {
    let verificado1 = false;
    let verificado2 = false
    verificado1 = verificarProducto(product1, price1, srcFoto1, stock1);
    verificado2 = verificarProducto(product2, price2, srcFoto2, stock2);
    if ((verificado1 == true) && (verificado2 == false)) { productos.pop(); }
    if ((verificado2 == true) && (verificado1 == false)) { productos.pop(); }
    if ((verificado1 == true) && (verificado2 == true)) {
        agregarColumnaDoble(productos.length - 2, productos.length - 1);
        product1.value = "";
        price1.value = "";
        product2.value = "";
        price2.value = "";
    }
}
/*funcion que se utiliza para cargar dos productos en una misma fila*/
function agregarColumnaDoble(producto1, producto2) {
    let newDiv = document.createElement("div");
    let divProd1 = createProductDiv(producto1, productos);
    divProd1.children[0].children[0].classList.add("medium");
    let divProd2 = createProductDiv(producto2, productos);
    divProd2.children[0].children[0].classList.add("medium");
    newDiv.appendChild(divProd1);
    newDiv.appendChild(divProd2);
    newDiv.classList.add("displayLine");
    tableJson.appendChild(newDiv);
}

/*selecciona el slider y le otorga una funcion en la que si su valor es menor a la mitad
cambia el layout para que se vean mas productos en una misma fila, si es mayor a la mitad
solo se ve un producto por fila*/
let slider = document.querySelector(".slider");
slider.addEventListener('input', cambiarLayout);

function cambiarLayout() {
    if (slider.value < 50) {
        let hijosTable = tableJson.children;
        for (let index = 0; index < hijosTable.length; index++) {
            let nietosTable = hijosTable[index].children;
            if (nietosTable.length == 1) {
                hijosTable[index].children[0].classList.add("displayGrid1");
            }
            if (nietosTable.length == 2) {
                hijosTable[index].children[0].classList.add("grid1");
                hijosTable[index].children[1].classList.add("grid2");
                hijosTable[index].classList.add("displayGrid2");
            }
            if (nietosTable.length == 3) {
                hijosTable[index].children[0].classList.add("grid1");
                hijosTable[index].children[1].classList.add("grid2");
                hijosTable[index].children[2].classList.add("grid3");
                hijosTable[index].classList.add("displayGrid3");
            }
            if (nietosTable.length >= 2) { /*agrega un tamaño a la imagen y ancho al nombre del producto*/
                if (innerWidth < 374) {
                    nietosTable[0].children[0].classList.add("smallSlider");
                    nietosTable[1].children[0].classList.add("smallSlider");
                }
                nietosTable[0].children[1].children[0].classList.add("widthEllipsis");
                nietosTable[1].children[1].children[0].classList.add("widthEllipsis");
            }
        }
    }
    if (slider.value > 50) {
        let hijosTable = tableJson.children;
        for (let index = 0; index < hijosTable.length; index++) {
            let nietosTable = hijosTable[index].children;
            if (nietosTable.length == 1) {
                hijosTable[index].children[0].classList.add("displayGrid1");
            }
            if (nietosTable.length == 2) {
                hijosTable[index].children[0].classList.remove("grid1");
                hijosTable[index].children[1].classList.remove("grid2");
                hijosTable[index].classList.remove("displayGrid2");
                hijosTable[index].children[0].classList.add("displayGrid1");
                hijosTable[index].children[1].classList.add("displayGrid1");
            }
            if (nietosTable.length == 3) {
                hijosTable[index].children[0].classList.remove("grid1");
                hijosTable[index].children[1].classList.remove("grid2");
                hijosTable[index].children[2].classList.remove("grid3");
                hijosTable[index].classList.remove("displayGrid3");
                hijosTable[index].children[0].classList.add("displayGrid1");
                hijosTable[index].children[1].classList.add("displayGrid1");
                hijosTable[index].children[2].classList.add("displayGrid1");
            }
            if (nietosTable.length >= 2) { /*quita tamaño especifico a la imagen y el ancho al nombre del producto*/
                nietosTable[0].children[0].classList.remove("smallSlider");
                nietosTable[1].children[0].classList.remove("smallSlider");
                nietosTable[0].children[1].children[0].classList.remove("widthEllipsis");
                nietosTable[1].children[1].children[0].classList.remove("widthEllipsis");
            }
        }
    }
}
let existingProduct = document.querySelector(".displayLine"); /*selecciona al producto que tiene pagina propia*/
if (innerWidth > 800) { existingProduct.children[0].classList.remove("displayGrid1") }
/*cuando cambia el tamaño de la pantalla se quitan o agregan clases para conservar su estilo respectivo
ya sea filas en desktop, o dependiendo del slider en el mobile*/
addEventListener('resize', () => {
    let hijosTable = tableJson.children;
    if (innerWidth > 800) {
        for (let index = 0; index < hijosTable.length; index++) {
            let nietosTable = hijosTable[index].children;
            if (nietosTable.length == 1) {
                hijosTable[index].children[0].classList.remove("displayGrid1");
            }
            if (nietosTable.length == 2) {
                hijosTable[index].children[0].classList.remove("grid1");
                hijosTable[index].children[1].classList.remove("grid2");
                hijosTable[index].classList.remove("displayGrid2");
                hijosTable[index].children[0].classList.remove("displayGrid1");
                hijosTable[index].children[1].classList.remove("displayGrid1");
            }
            if (nietosTable.length == 3) {
                hijosTable[index].children[0].classList.remove("displayGrid1");
                hijosTable[index].children[1].classList.remove("displayGrid1");
                hijosTable[index].children[2].classList.remove("displayGrid1");
                hijosTable[index].children[0].classList.remove("grid1");
                hijosTable[index].children[1].classList.remove("grid2");
                hijosTable[index].children[2].classList.remove("grid3");
                hijosTable[index].classList.remove("displayGrid3");
                nietosTable[0].children[1].classList.remove("widthEllipsis");
                nietosTable[1].children[1].classList.remove("widthEllipsis");
            }
            if (nietosTable.length >= 2) {
                nietosTable[0].children[0].classList.remove("smallSlider");
                nietosTable[1].children[0].classList.remove("smallSlider");
                nietosTable[0].children[1].children[0].classList.remove("widthEllipsis");
                nietosTable[1].children[1].children[0].classList.remove("widthEllipsis");
            }
        }
        existingProduct.children[0].classList.remove("displayGrid1");
    }
    if (innerWidth < 800) {
        cambiarLayout();
        existingProduct.children[0].classList.add("displayGrid1");
    }
    if (innerWidth > 374) {
        for (let index = 0; index < hijosTable.length; index++) {
            let nietosTable = hijosTable[index].children;
            if (nietosTable.length >= 2) {
                nietosTable[0].children[0].classList.remove("smallSlider");
                nietosTable[1].children[0].classList.remove("smallSlider");
            }
        }
    }
});
if (innerWidth < 800) { cambiarLayout(); }