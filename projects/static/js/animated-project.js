document.addEventListener("DOMContentLoaded", function() {
    const imageProject = document.querySelector('.singleProject__preview');
    const headerProject = document.querySelectorAll('.singleProject__subtitle');
    const toolStack = document.querySelectorAll('.singleProject__liveLink, .singleProject__developer');
    const projectName = document.querySelector('.singleProject__title');
    const projectInfo = document.querySelectorAll('.singleProject__info, .project--rating');

    gsap.set(projectInfo, {x: 50, opacity: 0});
    gsap.to(projectInfo, {x: 0, opacity: 1, duration: 0.6, ease:'quad.inOut', delay: 0.9 } )
    
    gsap.set(projectName, {y: -50, opacity: 0});
    gsap.to(projectName, {y: 0, opacity: 1, duration: 0.6, ease: 'quad.inOut', delay: 0.8});

    gsap.set(toolStack, { display: 'inline-block', opacity: 0});
    gsap.to(toolStack, {y: 0 ,opacity: 1, duration: 0.3, ease: 'power2.inOut', delay: 1 });

    gsap.set(headerProject, {x: -100, opacity: 0});
    gsap.to(headerProject, {x: 0, opacity: 1, duration: 0.6, ease: 'quad.inOut', delay: 0.7});

    gsap.set(imageProject, { scale: 0, y: -100, opacity: 0 });
    gsap.to(imageProject, { scale: 1, y: 0, opacity: 1, duration: 0.6, ease: "quad.inOut", delay: 0.3 });
});