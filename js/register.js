document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
    const nameInput = document.getElementById('register-name');
    const emailInput = document.getElementById('register-email');
    const passInput = document.getElementById('register-password');
    const passConfirmInput = document.getElementById('register-password-confirm');
    const errorName = document.getElementById('error-name');
    const errorEmail = document.getElementById('error-email');
    const errorPass = document.getElementById('error-password');
    const errorPassConfirm = document.getElementById('error-password-confirm');
    const registerMsg = document.getElementById('register-msg');

    const emailRegex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

    function validateName() {
        const v = nameInput.value.trim();
        if (!v) {
            errorName.textContent = 'El nombre es requerido.';
            return false;
        }
        if (v.length > 100) {
            errorName.textContent = 'El nombre no puede exceder 100 caracteres.';
            return false;
        }
        errorName.textContent = '';
        return true;
    }

    function validateEmail() {
        const v = emailInput.value.trim();
        if (!v) {
            errorEmail.textContent = 'El correo es requerido.';
            return false;
        }
        if (!emailRegex.test(v)) {
            errorEmail.textContent = 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.';
            return false;
        }
        errorEmail.textContent = '';
        return true;
    }

    function validatePassword() {
        const p = passInput.value;
        if (!p) {
            errorPass.textContent = 'La contraseña es requerida.';
            return false;
        }
        if (p.length < 4 || p.length > 10) {
            errorPass.textContent = 'La contraseña debe tener entre 4 y 10 caracteres.';
            return false;
        }
        errorPass.textContent = '';
        return true;
    }

    function validatePasswordConfirm() {
        if (passInput.value !== passConfirmInput.value) {
            errorPassConfirm.textContent = 'Las contraseñas no coinciden.';
            return false;
        }
        errorPassConfirm.textContent = '';
        return true;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameOk = validateName();
        const emailOk = validateEmail();
        const passOk = validatePassword();
        const passConfirmOk = validatePasswordConfirm();

        if (!nameOk || !emailOk || !passOk || !passConfirmOk) {
            registerMsg.textContent = 'Corrige los errores antes de continuar.';
            registerMsg.className = 'register-msg error-msg';
            return;
        }

        // Guardar usuario en localStorage
        const users = JSON.parse(localStorage.getItem('nhu_users')) || [];
        const email = emailInput.value.trim().toLowerCase();
        const password = passInput.value;
        users.push({ name: nameInput.value.trim(), email, password, role: 'cliente', createdAt: new Date().toISOString() });
        localStorage.setItem('nhu_users', JSON.stringify(users));

        registerMsg.textContent = 'Registro exitoso. ¡Ahora puedes iniciar sesión!';
        registerMsg.className = 'register-msg success-msg';
        form.reset();
    });

    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passInput.addEventListener('input', validatePassword);
    passConfirmInput.addEventListener('input', validatePasswordConfirm);
});
