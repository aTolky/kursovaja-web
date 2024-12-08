
    document.addEventListener('DOMContentLoaded', function() {
        const burgerMenu = document.getElementById('burger-menu');
        const mobileNav = document.getElementById('mobile-nav');
        const navLinks = document.querySelectorAll('#mobile-nav a');

        burgerMenu.addEventListener('click', function() {
            burgerMenu.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                burgerMenu.classList.remove('active');
                mobileNav.classList.remove('active');
            });
        });

        document.addEventListener('click', function(event) {
            const isClickInsideMenu = burgerMenu.contains(event.target) || mobileNav.contains(event.target);
            if (!isClickInsideMenu) {
                burgerMenu.classList.remove('active');
                mobileNav.classList.remove('active');
            }
        });
    });

