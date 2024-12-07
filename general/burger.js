document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.getElementById('burger-menu');
    const mobileNav = document.getElementById('mobile-nav');

    burgerMenu.addEventListener('click', function() {
        burgerMenu.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });
});