document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const passwordChoice = document.getElementById('passwordChoice');
    const manualPasswordFields = document.getElementById('manualPasswordFields');
    const autoPasswordField = document.getElementById('autoPasswordField');
    const generateNicknameButton = document.getElementById('generateNickname');
    const nicknameInput = document.getElementById('nickname');
    const messageDiv = document.getElementById('message');
    let loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    let nicknameAttempts = 0;
    const top100Passwords = ['123456', 'password'];
    const logoutButton = document.getElementById('logout');
    const signButton = document.getElementById('bookne');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const togglePasswordBtn = document.getElementById('togglePasswordBtn');
    const toggleAutoPasswordBtn = document.getElementById('toggleAutoPasswordBtn');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const autoPasswordInput = document.getElementById('autoPassword');

    function isPasswordStrong(password) {
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/;
        return strongPasswordRegex.test(password) && !top100Passwords.includes(password);
    }

    function generateNickname() {
        const randomNickname = 'User' + Math.floor(Math.random() * 10000);
        nicknameAttempts++;
        return randomNickname;
    }

    function validateAge(dob) {
        const birthDate = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            return age - 1;
        }

        return age;
    }

    function generatePassword() {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
        let password = '';
        for (let i = 0; i < 12; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    }

    if (passwordChoice) {
        passwordChoice.addEventListener('change', (event) => {
            if (event.target.value === 'auto') {
                manualPasswordFields.style.display = 'none';
                autoPasswordField.style.display = 'block';
                autoPasswordInput.value = generatePassword();
            } else {
                manualPasswordFields.style.display = 'block';
                autoPasswordField.style.display = 'none';
            }
        });

        if (passwordChoice.value === 'manual') {
            manualPasswordFields.style.display = 'block';
            autoPasswordField.style.display = 'none';
        } else {
            manualPasswordFields.style.display = 'none';
            autoPasswordField.style.display = 'block';
            autoPasswordInput.value = generatePassword();
        }
    }

    if (generateNicknameButton) {
        generateNicknameButton.addEventListener('click', () => {
            if (nicknameAttempts < 5) {
                nicknameInput.value = generateNickname();
            } else {
                nicknameInput.removeAttribute('readonly');
                generateNicknameButton.disabled = true;
            }
        });
    }

    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', () => {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                confirmPasswordInput.type = 'text';
                togglePasswordBtn.textContent = 'Скрыть';
            } else {
                passwordInput.type = 'password';
                confirmPasswordInput.type = 'password';
                togglePasswordBtn.textContent = 'Показать';
            }
        });
    }

    if (toggleAutoPasswordBtn) {
        toggleAutoPasswordBtn.addEventListener('click', () => {
            if (autoPasswordInput.type === 'password') {
                autoPasswordInput.type = 'text';
                toggleAutoPasswordBtn.textContent = 'Скрыть';
            } else {
                autoPasswordInput.type = 'password';
                toggleAutoPasswordBtn.textContent = 'Показать';
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const dob = document.getElementById('dob').value;
            const password = passwordChoice.value === 'manual' ? passwordInput.value : autoPasswordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            const name = document.getElementById('name').value;
            const nickname = nicknameInput.value;
            const agreement = document.getElementById('agreement').checked;
            const role = document.getElementById('role').value;

            if (validateAge(dob) < 16) {
                messageDiv.textContent = 'You must be at least 16 years old to register.';
                return;
            }

            if (passwordChoice.value === 'manual' && (!isPasswordStrong(password) || password !== confirmPassword)) {
                messageDiv.textContent = 'Password does not meet the criteria or passwords do not match.';
                return;
            }

            if (!agreement) {
                messageDiv.textContent = 'You must agree to the User Agreement.';
                return;
            }

            let users = JSON.parse(localStorage.getItem('users')) || [];

            const emailExists = users.some(user => user.email === email);
            if (emailExists) {
                messageDiv.textContent = 'Email is already registered.';
                return;
            }

            const newUser = { phone, email, dob, password, name, nickname, role };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            sessionStorage.setItem('loggedInUser', JSON.stringify(newUser));
            messageDiv.textContent = 'Registration successful!';
            window.location.href = '../main/main.html'; // Перенаправление на главную страницу
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const loginEmail = document.getElementById('loginEmail').value;
            const loginPassword = document.getElementById('loginPassword').value;

            let users = JSON.parse(localStorage.getItem('users')) || [];

            const user = users.find(user => user.email === loginEmail && user.password === loginPassword);
            if (user) {
                messageDiv.textContent = 'Login successful!';
                sessionStorage.setItem('loggedInUser', JSON.stringify(user));
                displayContentBasedOnRole();
                window.location.href = '../main/main.html';
            } else {
                messageDiv.textContent = 'Invalid email or password.';
            }
        });
    }

    function displayContentBasedOnRole() {
        loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser')); // Обновляем данные о вошедшем пользователе
        if (loggedInUser && usernameDisplay) {
            usernameDisplay.textContent = 'Welcome, ' + loggedInUser.nickname;
            usernameDisplay.style.display = 'inline';
            if (logoutButton) logoutButton.style.display = 'inline';
            if (signButton) signButton.style.display = 'none';

            if (loggedInUser.role === 'admin') {
                const adminBlocks = document.querySelectorAll('.admin-only');
                adminBlocks.forEach(block => block.style.display = 'block');

                const adminHiddenBlocks = document.querySelectorAll('.admin-hidden');
                adminHiddenBlocks.forEach(block => block.style.display = 'none');
            } else {
                const adminBlocks = document.querySelectorAll('.admin-only');
                adminBlocks.forEach(block => block.style.display = 'none');

                const adminHiddenBlocks = document.querySelectorAll('.admin-hidden');
                adminHiddenBlocks.forEach(block => block.style.display = 'block');
            }

            if (loggedInUser.role === 'user' || loggedInUser.role === 'admin') {
                const userBlocks = document.querySelectorAll('.user-only');
                userBlocks.forEach(block => block.style.display = 'flex');

                const userHiddenBlocks = document.querySelectorAll('.user-hidden');
                userHiddenBlocks.forEach(block => block.style.display = 'none');
            } else {
                const userBlocks = document.querySelectorAll('.user-only');
                userBlocks.forEach(block => block.style.display = 'none');

                const userHiddenBlocks = document.querySelectorAll('.user-hidden');
                userHiddenBlocks.forEach(block => block.style.display = 'block');
            }
        }
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            sessionStorage.removeItem('loggedInUser');
            if (usernameDisplay) usernameDisplay.style.display = 'none';
            if (logoutButton) logoutButton.style.display = 'none';
            if (signButton) signButton.style.display = 'inline';
            // Можно добавить код для перенаправления на страницу входа, если нужно
            // window.location.href = '../registration/aut.html';
        });
    }

    // Проверяем авторизацию и блокируем переход на ссылки, если пользователь не авторизован
    const servicesLink = document.getElementById('services-link');
    const worksLink = document.getElementById('works-link');
    const contactsLink = document.getElementById('contacts-link');

    function checkAuthorization(event) {
        if (!loggedInUser) {
            event.preventDefault();
            messageDiv.textContent = 'Пожалуйста, войдите в систему, чтобы перейти на эту страницу.';
            messageDiv.style.color = 'red';
            document.body.appendChild(messageDiv);  // Добавить сообщение на страницу
            // window.location.href = '../registration/aut.html';  // Перенаправление на страницу авторизации, если нужно
        }
    }

    servicesLink?.addEventListener('click', checkAuthorization);
    worksLink?.addEventListener('click', checkAuthorization);
    contactsLink?.addEventListener('click', checkAuthorization);

    window.addEventListener('DOMContentLoaded', () => {
        displayContentBasedOnRole();
    });
});
