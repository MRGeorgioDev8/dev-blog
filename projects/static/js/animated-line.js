document.addEventListener("DOMContentLoaded", function () {
    let animatedBorders = document.querySelectorAll(".header__menuItem");

    animatedBorders.forEach(function (animatedLi) {
        animatedLi.addEventListener("mouseenter", function () {
            this.classList.add("border-hover");
        });

        animatedLi.addEventListener("mouseleave", function () {
            this.classList.remove("border-hover");
        });
    });
});