document.addEventListener("DOMContentLoaded", function() {
    const logo = document.getElementById('logo');
    const span = document.querySelector('#animated-title span');
    const devContainers = document.querySelectorAll('.column.card');
    const formWrapper = document.querySelector('.formWrapper');
    const cardBody = document.querySelector('.card.text-center');
    const settings = document.querySelectorAll('.devInfo, .settings, .settings__table');
    const messagesList = document.querySelector('.messages');
    const inboxTitle = document.querySelector('.inbox__title');
    const messageContainer = document.querySelector('.message');
    const cardContainer = document.querySelector('.auth');

    gsap.set(devContainers, { x: -100, opacity: 0 });

    devContainers.forEach(devContainer => {
        devContainer.addEventListener('mouseover', function() {
            gsap.to(devContainer, { scale: 1.04, boxShadow: "0 0 6px rgba(0, 0, 0, 0.2)", duration: 0.3, ease: "power1.inOut"});
        });
        devContainer.addEventListener('mouseleave', function() {
            gsap.to(devContainer, { scale: 1,  boxShadow: 'none', duration: 0.3, ease: "power1.inOut"});
        });
    });

    gsap.to(devContainers, { x: 40, opacity: 1, duration: 1, delay: 0.3, ease: "bounce.out" });

    gsap.set(logo, { scale: 2 });
    gsap.to(logo, { scale: 1, duration: 1, delay: 0.3, ease: "power1.inOut" });

    gsap.set(span, { opacity: 0.7 });
    gsap.to(span, { opacity: 1, duration: 1, delay: 0.3, ease: "bounce.out" });

    gsap.set(formWrapper, { y: -100, opacity: 0 });
    gsap.to(formWrapper, { y: 0, opacity: 1, duration: 1, ease: "bounce.out", delay: 0.4 });
    gsap.to(formWrapper, { y: "+=11", duration: 0.5, delay: 1.2 });

    gsap.set(cardBody, { y: -100, opacity: 0 });
    gsap.to(cardBody, { y: 0, opacity: 1, duration: 1, ease: "bounce.out", delay: 0.4 });
    gsap.to(cardBody, { y: "+=11", duration: 0.5, delay: 1.2 });

    gsap.set(settings, { opacity: 0 });
    gsap.to(settings, { opacity: 1, duration: 1, ease: "bounce.out", delay: 0.7 });

    gsap.set(messagesList, { opacity: 0 });
    gsap.to(messagesList, { opacity: 1, duration: 1, ease: "bounce.out", delay: 0.7 });

    gsap.set(inboxTitle, { x: -100, opacity: 0 });
    gsap.to(inboxTitle, { x: 0, opacity: 1, duration: 1, ease: "bounce.out", delay: 0.4 });
    gsap.to(inboxTitle, { x: "+=11", duration: 0.5, delay: 1.2 });

    gsap.set(messageContainer, {scale:0, y: -100, opacity: 0 });
    gsap.to(messageContainer, {scale: 1, y: 0, opacity: 1, duration: 0.6, ease: "quad.inOut", delay: 0.3 });

    gsap.set(cardContainer, {opacity: 0 });
    gsap.to(cardContainer, {opacity: 1, ease:"quad.inOut", duration: 0.7 });
});