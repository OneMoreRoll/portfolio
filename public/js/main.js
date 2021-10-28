document.addEventListener("DOMContentLoaded", function () {

    // Modification de la navbar au scroll
    window.addEventListener("scroll", function () {

        if (window.scrollY >= 50) {
            document.querySelector(".navbar").classList.add("bg-light");
        } else {
            document.querySelector(".navbar").classList.remove("bg-light");
        }

    });

    // Changement de l'indicateur du carrousel
    var carouselItems = document.querySelectorAll(".carousel-item");
    var indicatorNumber;

    document.querySelector(".carousel-control-prev").addEventListener("click", function () {

        indicatorNumber = parseInt(document.querySelector(".carousel-indicator-number").textContent) - 1;

        if (indicatorNumber < 1) {
            indicatorNumber = carouselItems.length;
        }

        document.querySelector(".carousel-indicator-number").textContent = indicatorNumber;

    });
    document.querySelector(".carousel-control-next").addEventListener("click", function () {

        indicatorNumber = parseInt(document.querySelector(".carousel-indicator-number").textContent) + 1;

        if (indicatorNumber > carouselItems.length) {
            indicatorNumber = 1;
        }

        document.querySelector(".carousel-indicator-number").textContent = indicatorNumber;

    });

});