document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('login-email');
    const passInput = document.getElementById('login-password');
    const errorEmail = document.getElementById('error-email');
    const errorPass = document.getElementById('error-password');
    const loginMsg = document.getElementById('login-msg');

    const emailRegex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

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
        const p = passInput.value.trim();
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

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailOk = validateEmail();
        const passOk = validatePassword();

        if (!emailOk || !passOk) {
            loginMsg.textContent = 'Corrige los errores antes de continuar.';
            loginMsg.className = 'login-msg error-msg';
            return;
        }

        // Simulación básica: guardar usuario en localStorage
        const users = JSON.parse(localStorage.getItem('nhu_users')) || [];
        const email = emailInput.value.trim().toLowerCase();
        const password = passInput.value;
        const existing = users.find(u => u.email === email);

        if (existing) {
            if (existing.password === password) {
                localStorage.setItem('nhu_logged_user', JSON.stringify({ email, loggedAt: new Date().toISOString() }));
                loginMsg.textContent = 'Inicio de sesión exitoso. ¡Bienvenid@!';
                loginMsg.className = 'login-msg success-msg';
            } else {
                loginMsg.textContent = 'Contraseña incorrecta.';
                loginMsg.className = 'login-msg error-msg';
            }
        } else {
            users.push({ email, password, role: 'cliente', createdAt: new Date().toISOString() });
            localStorage.setItem('nhu_users', JSON.stringify(users));
            localStorage.setItem('nhu_logged_user', JSON.stringify({ email, loggedAt: new Date().toISOString() }));
            loginMsg.textContent = 'Registro exitoso. Sesión iniciada. ¡Bienvenid@!';
            loginMsg.className = 'login-msg success-msg';
        }
    });

    emailInput.addEventListener('input', validateEmail);
    passInput.addEventListener('input', validatePassword);
});
