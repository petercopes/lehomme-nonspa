"use strict";


const image = document.querySelector('.imgWrapper img');
const imageWrapper = document.querySelector('.imgWrapper');
const progressBarr = document.querySelector('.sidebarProgress');
const miniaturesWrapper = document.querySelector('.displayMiniatures');
let imgPosition = 1;
let scroll = false;
const mobileImgPositioners = Array.from(document.querySelectorAll('.mobileProductSlider.mobile .sectionReference'));
const mobileImgPosContainer = document.querySelector('.mobileProductSlider');
let actualProduct = {};

function setSectionActive() {
    for (let elem of mobileImgPositioners) {
        elem.classList.remove('sectionActive');
    }
    mobileImgPositioners[imgPosition - 1].classList.add('sectionActive');
    mobileImgPosContainer.classList.remove('hidden');
    setTimeout(() => {
        mobileImgPosContainer.classList.add('hidden');
    }, 500);

}

function setProgressBar() {
    progressBarr.style.height = `${(14.28 * imgPosition)}%`;
}

function preventScroll(e) {
    e.preventDefault();
    e.stopPropagation();
}
const miniaturesIDs = ["mini1", "mini2", "mini3", "mini4", "mini5", "mini6", "mini7"];

function setminiatures(producto) {
    miniaturesIDs.forEach((miniature, index) => {
        const elem = document.getElementById(miniature);
        elem.src = producto.imagenes[index];
    });
}

function mapMiniatures() {
    miniaturesIDs.forEach((miniature, index) => {
        const elem = document.getElementById(miniature);
        elem.addEventListener('click', () => {
            image.src = elem.src;
            imgPosition = index + 1;
            setProgressBar();
        });
    });
}

function toggleOpacity() {
    miniaturesWrapper.classList.toggle('opacity');
}
imageWrapper.addEventListener('mouseenter', toggleOpacity);
imageWrapper.addEventListener('mouseleave', toggleOpacity);

const runOnScroll = (event, product) => {
    preventScroll(event);
    if (!scroll) {
        scroll = true;
        const maxPos = 7;

        if (event.deltaY < 0) {

            if (imgPosition > 1) {
                imgPosition = imgPosition - 1;
                image.src = actualProduct.imagenes[imgPosition - 1];
                setProgressBar();
                setSectionActive();
            }
        } else {

            if (imgPosition < maxPos) {
                imgPosition = imgPosition + 1;
                image.src = actualProduct.imagenes[imgPosition - 1];
                setProgressBar();
                setSectionActive();
            }
        }
        setTimeout(() => {
            scroll = false;
        }, 500);
    }
};

function productSliderSetUp(product) {
    imgPosition = 1;

    setProgressBar();
    image.removeEventListener('wheel', function() {
        runOnScroll(event, actualProduct);
    });
    actualProduct = product;
    image.addEventListener('wheel', function() {
        runOnScroll(event, product);
    });

    setminiatures(product);
    mapMiniatures();
}