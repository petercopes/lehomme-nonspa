'use strict';
const sudadera = {
    nombre: 'SUDADERA LAVADA',
    precio: '5.590,00 ARS',
    color: 'green',
    descripcion: 'Sudadera amplia de cuello redondo y manga larga. Acabados en rib.',
    imagenes: ['images/producto/sudadera/img1.webp', 'images/producto/sudadera/img2.webp', 'images/producto/sudadera/img3.webp', 'images/producto/sudadera/img4.webp', 'images/producto/sudadera/img5.webp', 'images/producto/sudadera/img6.webp', 'images/producto/sudadera/img7.webp']

};
const botin = {
    nombre: 'BOTÍN PIEL SPORT MARRON',
    precio: '19.990,00 ARS',
    color: 'brown',
    descripcion: 'BOTÍN SPORT DE PIEL, ACABADO SERRAJE. COLOR MARRON. DISPONE DE DOBLE ELÁSTICO EN LOS LATERALES.',
    imagenes: ['images/producto/botin/img1.webp', 'images/producto/botin/img2.webp', 'images/producto/botin/img3.webp', 'images/producto/botin/img4.webp', 'images/producto/botin/img5.webp', 'images/producto/botin/img6.webp', 'images/producto/botin/img7.webp']

};
const cazadora = {
    nombre: 'CAZADORA DOBLE FAZ EFECTO ANTE',
    precio: '12.590,00 ARS',
    color: 'black',
    descripcion: 'CAZADORA DE CUELLO SOLAPA Y MANGA LARGA. INTERIOR EN BORREGUILLO COMBINADO A TONO.',
    imagenes: ['images/producto/cazadora/img1.webp', 'images/producto/cazadora/img2.webp', 'images/producto/cazadora/img3.webp', 'images/producto/cazadora/img4.webp', 'images/producto/cazadora/img5.webp', 'images/producto/cazadora/img6.webp', 'images/producto/cazadora/img7.webp']

};
let products = [sudadera, cazadora, botin];
const productName = document.querySelector('.productTitle');
const priceM = document.querySelector('.productPrice.mobile');
const priceD = document.querySelector('.productPrice.desktop');
const color = document.querySelector('.productColor')
const productDescription = document.querySelector('.productDescription');
const productSelector = document.getElementById('adminProductSelector');
const productImage = document.querySelector('.bigImg');
productSelector.addEventListener('change', () => {
    let formData = new FormData(productSelector);
    let selectValue = formData.get('productVisualizer');
    switch (selectValue) {
        case 'sudadera':
            updateProductView(products[0]);
            break;
        case 'cazadora':
            updateProductView(products[1]);
            break;
        case 'botin':

            updateProductView(products[2]);
            break;

        default:
            updateProductView(products[0]);
            break;
    }

});


document.addEventListener("DOMContentLoaded", function() {
    updateProductView(products[0]);
});

function updateProductView(product) {
    productName.innerHTML = product.nombre;
    priceM.innerHTML = product.precio;
    priceD.innerHTML = product.precio;
    productDescription.innerHTML = product.descripcion;
    productImage.src = product.imagenes[0];
    color.classList.remove('green', 'black', 'brown');
    color.classList.add(product.color);
    productSliderSetUp(product);
}