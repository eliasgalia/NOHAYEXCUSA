document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');
  const nameInput = document.getElementById('reg-nombre');
  const emailInput = document.getElementById('reg-email');
  const passInput = document.getElementById('reg-password');
  const registerMsg = document.getElementById('register-msg');

  const emailRegex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

  function validateName() {
    const name = nameInput.value.trim();
    if (!name) {
      registerMsg.textContent = 'El nombre es obligatorio.';
      registerMsg.className = 'register-msg error-msg';
      return false;
    }
    return true;
  }

  function validateEmail() {
    const email = emailInput.value.trim();
    if (!email) {
      registerMsg.textContent = 'El correo es obligatorio.';
      registerMsg.className = 'register-msg error-msg';
      return false;
    }
    if (!emailRegex.test(email)) {
      registerMsg.textContent = 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.';
      registerMsg.className = 'register-msg error-msg';
      return false;
    }
    return true;
  }

  function validatePassword() {
    const pass = passInput.value;
    if (!pass) {
      registerMsg.textContent = 'La contraseña es obligatoria.';
      registerMsg.className = 'register-msg error-msg';
      return false;
    }
    if (pass.length < 4 || pass.length > 10) {
      registerMsg.textContent = 'La contraseña debe tener entre 4 y 10 caracteres.';
      registerMsg.className = 'register-msg error-msg';
      return false;
    }
    return true;
  }

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

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const okName = validateName();
    const okEmail = validateEmail();
    const okPass = validatePassword();

    if (!okName || !okEmail || !okPass) return;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim().toLowerCase();
    const password = passInput.value;

    const users = loadUsers();
    const existing = users.find(u => u.email === email);

    if (existing) {
      registerMsg.textContent = 'Este correo ya está registrado. Intenta iniciar sesión.';
      registerMsg.className = 'register-msg error-msg';
      return;
    }

    users.push({
      name,
      email,
      password,
      role: 'cliente',
      createdAt: new Date().toISOString()
    });
    saveUsers(users);

    localStorage.setItem('nhu_logged_user', JSON.stringify({
      email,
      loggedAt: new Date().toISOString()
    }));

    registerMsg.textContent = 'Registro exitoso. Sesión iniciada. ¡Bienvenid@!';
    registerMsg.className = 'register-msg success-msg';


    setTimeout(() => {
      window.location.href = 'index.html';
    }, 2000);
  });
});
