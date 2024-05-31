document.addEventListener("DOMContentLoaded", function() {
    const logo = document.getElementById('logo');
    const span = document.querySelector('#animated-title span');
    const devContainer = document.querySelectorAll('.column.card');
    const formWrapper = document.querySelector('.formWrapper');

    gsap.set(devContainer, { x: -100, opacity: 0 });
    gsap.to(devContainer, { x: 40, opacity: 1, duration: 1, delay: 0.5, ease: "bounce.out" });

    gsap.set(logo, { scale: 2 });
    gsap.to(logo, { scale: 1, duration: 1, delay: 0.3, ease: "power1.inOut" });

    gsap.set(span, { opacity: 0 });
    gsap.to(span, { opacity: 1, duration: 1, delay: 0.4, ease: "bounce.out" });

    gsap.set(formWrapper, { y: -100, opacity: 0 });
    gsap.to(formWrapper, { y: 0, opacity: 1, duration: 1, ease: "bounce.out", delay: 0.4 });
    gsap.to(formWrapper, { y: "+=11", duration: 0.5, delay: 1.2 });

    const cardBody = document.querySelector('.card.text-center');
    gsap.set(cardBody, { y: -100, opacity: 0 });
    gsap.to(cardBody, { y: 0, opacity: 1, duration: 1, ease: "bounce.out", delay: 0.4 });
    gsap.to(cardBody, { y: "+=11", duration: 0.5, delay: 1.2 });

    const settings = document.querySelectorAll('.devInfo, .settings, .settings__table');
    gsap.set(settings, { opacity: 0 });
    gsap.to(settings, { opacity: 1, duration: 1, ease: "bounce.out", delay: 0.7 });
});