document.addEventListener('DOMContentLoaded', function () {
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptCookiesButton = document.getElementById('accept-cookies');

    if (!localStorage.getItem('cookieAccepted')) {
        cookieConsent.style.display = 'flex'; 
    }

    acceptCookiesButton.addEventListener('click', function () {
        localStorage.setItem('cookieAccepted', 'true'); 
        cookieConsent.style.display = 'none'; 
    });
});
