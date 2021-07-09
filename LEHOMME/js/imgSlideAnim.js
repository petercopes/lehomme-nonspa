const image = document.querySelector("#img1");
const leftSwipeButton = document.querySelector('.leftSwipe');
const rightSwipeButton = document.querySelector('.rightSwipe');

function swipeImage() {
    if (image.src.includes('images/home1.jpg')) {
        image.classList.add('hidden');
        setTimeout(() => {
            image.src = "images/home2.jpg";
            image.classList.remove('hidden');
        }, 300);

    } else {
        image.classList.add('hidden');
        setTimeout(() => {
            image.src = "images/home1.jpg";
            image.classList.remove('hidden');
        }, 200);

    }
}
leftSwipeButton.addEventListener('click', swipeImage);
rightSwipeButton.addEventListener('click', swipeImage);