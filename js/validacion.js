document.addEventListener('DOMContentLoaded', () => {
    // Función para validar el formato de email
    function validarEmail(email) {
        const regex = /^[a-zA-Z0-9._-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
        return regex.test(email);
    }

    // Función para validar la longitud de la contraseña
    function validarPassword(password) {
        return password.length >= 4 && password.length <= 10;
    }

    // Validación del formulario de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            const emailInput = document.getElementById('username'); // En tu HTML es 'username'
            const passwordInput = document.getElementById('password');

            const email = emailInput.value;
            const password = passwordInput.value;

            // Prevenir el envío del formulario por defecto
            event.preventDefault();

            if (!validarEmail(email)) {
                // Muestra un mensaje de error personalizado
                alert('El correo electrónico debe ser de @duoc.cl, @profesor.duoc.cl o @gmail.com.');
                emailInput.focus();
                return;
            }

            if (!validarPassword(password)) {
                // Muestra un mensaje de error personalizado
                alert('La contraseña debe tener entre 4 y 10 caracteres.');
                passwordInput.focus();
                return;
            }

            // Si las validaciones pasan, puedes continuar con la lógica de login
            // Aquí puedes agregar la lógica para guardar en localStorage
            const loginMsg = document.getElementById('loginMsg');
            if (localStorage.getItem(email)) {
                if (localStorage.getItem(email) === password) {
                    loginMsg.textContent = "Bienvenido " + email + "!";
                } else {
                    loginMsg.textContent = "Contraseña incorrecta.";
                }
            } else {
                localStorage.setItem(email, password);
                loginMsg.textContent = "Usuario registrado con éxito. Ahora puedes ingresar.";
            }

        });
    }

    // Aquí iría la lógica para los otros formularios (contacto, registro, etc.)
    // que se irán creando.
});
