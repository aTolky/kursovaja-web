document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById("modal");
    var btn = document.getElementById("call-button");
    var span = document.getElementsByClassName("close")[0];
    var loginButton = document.getElementById("login-button");
    var registerButton = document.getElementById("register-button");

    // Открытие модального окна при клике на кнопку
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // Закрытие модального окна при клике на "крестик"
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Закрытие модального окна при клике вне его
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Обработчики событий для кнопок в модальном окне
    loginButton.onclick = function() {
        window.location.href = "../registration/aut.html"; // Перейти на страницу авторизации
    }

    registerButton.onclick = function() {
        window.location.href = "../registration/registr.html"; // Перейти на страницу регистрации
    }
});
