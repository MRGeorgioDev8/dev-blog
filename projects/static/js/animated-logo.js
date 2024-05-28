document.addEventListener("DOMContentLoaded", function() {
    const logo = document.getElementById('logo');

    gsap.set(logo, { scale: 2 });

    gsap.to(logo, { scale: 1, duration: 1, ease: "power1.inOut" });
});
