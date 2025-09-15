document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');
  const emailInput = document.getElementById('reg-email');
  const passInput = document.getElementById('reg-password');
  const nameInput = document.getElementById('reg-name');
  const errorEmail = document.getElementById('error-email');
  const errorPass = document.getElementById('error-password');
  const errorName = document.getElementById('error-name');
  const registerMsg = document.getElementById('register-msg');

  // Regex para emails permitidos
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

  // Validación del correo
  function validateEmail() {
    const v = emailInput.value.trim();
    if (!v) {
      errorEmail.textContent = 'El correo es requerido.';
      emailInput.setAttribute('aria-invalid', 'true');
      return false;
    }
    if (v.length > 100) {
      errorEmail.textContent = 'El correo no puede tener más de 100 caracteres.';
      emailInput.setAttribute('aria-invalid', 'true');
      return false;
    }
    if (!emailRegex.test(v)) {
      errorEmail.textContent = 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.';
      emailInput.setAttribute('aria-invalid', 'true');
      return false;
    }
    errorEmail.textContent = '';
    emailInput.removeAttribute('aria-invalid');
    return true;
  }

  // Validación de contraseña
  function validatePassword() {
    const p = passInput.value;
    if (!p) {
      errorPass.textContent = 'La contraseña es requerida.';
      passInput.setAttribute('aria-invalid', 'true');
      return false;
    }
    if (p.length < 4 || p.length > 10) {
      errorPass.textContent = 'La contraseña debe tener entre 4 y 10 caracteres.';
      passInput.setAttribute('aria-invalid', 'true');
      return false;
    }
    errorPass.textContent = '';
    passInput.removeAttribute('aria-invalid');
    return true;
  }

  // Validación del nombre
  function validateName() {
    const n = nameInput.value.trim();
    if (!n) {
      errorName.textContent = 'El nombre es requerido.';
      nameInput.setAttribute('aria-invalid', 'true');
      return false;
    }
    if (n.length > 50) {
      errorName.textContent = 'El nombre no puede superar los 50 caracteres.';
      nameInput.setAttribute('aria-invalid', 'true');
      return false;
    }
    errorName.textContent = '';
    nameInput.removeAttribute('aria-invalid');
    return true;
  }

  emailInput.addEventListener('input', validateEmail);
  passInput.addEventListener('input', validatePassword);
  nameInput.addEventListener('input', validateName);

  // Funciones para manejar usuarios en localStorage
  function loadUsers() {
    try {
      return JSON.parse(localStorage.getItem('nhu_users')) || [];
    } catch (e) {
      return [];
    }
  }

  function saveUsers(users) {
    localStorage.setItem('nhu_users', JSON.stringify(users));
  }

  // Evento submit del formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const okEmail = validateEmail();
    const okPass = validatePassword();
    const okName = validateName();

    if (!okEmail || !okPass || !okName) {
      registerMsg.textContent = 'Corrige los errores antes de continuar.';
      registerMsg.className = 'error-msg';
      registerMsg.setAttribute('aria-live', 'polite');
      return;
    }

    const email = emailInput.value.trim().toLowerCase();
    const password = passInput.value;
    const name = nameInput.value.trim();

    const users = loadUsers();
    const existing = users.find(u => u.email === email);

    if (existing) {
      registerMsg.textContent = 'El correo ya está registrado. Intenta iniciar sesión.';
      registerMsg.className = 'error-msg';
      registerMsg.setAttribute('aria-live', 'polite');
      return;
    }

    // Guardar usuario nuevo
    users.push({
      email,
      password,
      name,
      role: 'cliente',
      createdAt: new Date().toISOString()
    });

    saveUsers(users);
    localStorage.setItem('nhu_logged_user', JSON.stringify({ email, loggedAt: new Date().toISOString() }));

    registerMsg.textContent = 'Registro exitoso. Sesión iniciada. ¡Bienvenid@!';
    registerMsg.className = 'success-msg';
    registerMsg.setAttribute('aria-live', 'polite');

    // Limpiar formulario
    form.reset();
  });
});
