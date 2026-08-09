const allWrappers = document.querySelectorAll('.wrapper');
const allCarousels = document.querySelectorAll('.carousel');
const allArrowBtns = document.querySelectorAll(".wrapper button");

allWrappers.forEach((wrapper) => {
    const carousel = wrapper.querySelector('.carousel');
    const arrowBtns = wrapper.querySelectorAll('button');
    const firstCardWidth = carousel.querySelector(".card").offsetWidth;
    const carouselChildren = [...carousel.children];

    let isDragging = false, startX, startScrollLeft, timeoutID;
    let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

    carouselChildren.slice(-cardPerView).reverse().forEach((card) => {
        carousel.insertAdjacentHTML("afterBegin", card.outerHTML);
    });

    carouselChildren.slice(0, cardPerView).forEach((card) => {
        carousel.insertAdjacentHTML("beforeEnd", card.outerHTML);
    });

    arrowBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
        });
    });

    const autoPlay = () => {
        // if (window.innerWidth < 800) return;
        timeoutID = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2000);
    };
    autoPlay();

    carousel.addEventListener("mousedown", (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    });

    carousel.addEventListener("scroll", () => {
        if (carousel.scrollLeft === 0) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
            carousel.classList.remove("no-transition");
        } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.offsetWidth;
            carousel.classList.remove("no-transition");
        }
        clearTimeout(timeoutID);
        if (!wrapper.matches(":hover")) autoPlay();
    });
    
    wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutID));
    wrapper.addEventListener("mouseleave", autoPlay);
});