let scroll = false;
const sectionContainer = document.querySelector('.sectionSlider');
const section1 = document.getElementById('section1');
const section2 = document.getElementById('section2');
const main = document.getElementById('main');



function preventScroll(e) {
    e.preventDefault();
    e.stopPropagation();
}

function MouseWheelHandler(e) {
    let screensize = window.innerWidth;
    if (screensize < 1024) {
        preventScroll(e);
        if (!scroll) {
            scroll = true;
            e = window.event || e;
            let h = window.innerHeight;
            if (e.deltaY < 0) {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
                section1.classList.add('sectionActive');
                section2.classList.remove('sectionActive');

            } else {
                window.scrollTo({
                    top: h,
                    behavior: "smooth"
                });
                section2.classList.add('sectionActive');
                section1.classList.remove('sectionActive');
            }
            sectionContainer.classList.remove('hidden');
            setTimeout(() => {
                scroll = false;
                setTimeout(() => {
                    scroll = false;
                    sectionContainer.classList.add('hidden');
                }, 500);
            }, 500);
        }
    }
}



document.addEventListener("mousewheel", MouseWheelHandler, { passive: false });