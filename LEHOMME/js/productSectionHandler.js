window.onbeforeunload = () => {
    window.scrollTo(0, 0);
}
let movement = false;
let pos = 0;
const section1 = document.getElementById('sectionProduct1');
const section2 = document.getElementById('sectionProduct2');
const section3 = document.getElementById('sectionProduct3');
const footer = document.querySelector('footer .mobile .aboutUs');
const title = document.querySelector('.infoWrapper');
const sectionContainer = document.querySelector('.sectionSlider');


function preventScroll(e) {
    e.preventDefault();
    e.stopPropagation();
}

function MouseWheelHandler(e) {
    let screensize = window.innerWidth;

    if (screensize < 1024) {
        preventScroll(e);
        if (!movement) {
            movement = true;
            if (e.deltaY < 0) {
                if (pos === 1) {
                    window.scroll({
                        top: 0,
                        behavior: "smooth"
                    });
                    pos = 0;
                    section1.classList.add('sectionActive');
                    section2.classList.remove('sectionActive');
                } else  if (pos === 2) {
                    window.scroll({
                        top: title.offsetTop,
                        behavior: "smooth"
                    });
                    pos = 1;
                    section2.classList.add('sectionActive');
                    section3.classList.remove('sectionActive');
                }
            } else {
                if (pos === 0) {
                    window.scroll({
                        top: title.offsetTop,
                        behavior: "smooth"
                    });

                    pos = 1;
                    section2.classList.add('sectionActive');
                    section1.classList.remove('sectionActive');
                } else if (pos === 1) {
                    window.scroll({
                        top: footer.offsetTop,
                        behavior: "smooth"
                    });
                    pos = 2;

                    section3.classList.add('sectionActive');
                    section2.classList.remove('sectionActive');
                }
            }
            sectionContainer.classList.remove('hidden');
            setTimeout(() => {
                movement = false;
                setTimeout(() => {
                    scroll = false;
                    sectionContainer.classList.add('hidden');
                }, 500);
            }, 1500);
            return;
        }
    }
}

document.addEventListener("wheel", () => {
    e = event;
    MouseWheelHandler(e);
}, { passive: false });