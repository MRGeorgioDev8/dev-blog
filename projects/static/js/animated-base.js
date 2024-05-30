document.addEventListener("DOMContentLoaded", function() {
    const logo = document.getElementById('logo');
    const span = document.querySelector('#animated-title span');
    const devContainer = document.querySelector('.column.card');

    gsap.set(devContainer, { x: -100, opacity: 0 });
    gsap.to(devContainer, { x: 40, opacity: 1, duration: 1, delay: 0.3, ease: "bounce.inOut" });

    gsap.set(logo, { scale: 2 });
    gsap.to(logo, { scale: 1, duration: 1, delay: 0.3, ease: "power1.inOut" });

    gsap.set(span, { opacity: 0 });
    gsap.to(span, { opacity: 1, duration: 1, delay: 0.4, ease: "bounce.out" });
});