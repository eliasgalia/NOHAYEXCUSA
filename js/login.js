
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

  emailInput.addEventListener('input', validateEmail);
  passInput.addEventListener('input', validatePassword);


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

    const okEmail = validateEmail();
    const okPass = validatePassword();

    if (!okEmail || !okPass) {
      loginMsg.textContent = 'Corrige los errores del formulario antes de continuar.';
      loginMsg.className = 'login-msg error-msg';
      loginMsg.setAttribute('aria-live', 'polite');
      return;
    }

    const email = emailInput.value.trim().toLowerCase();
    const password = passInput.value;

    const users = loadUsers();
    const existing = users.find(u => u.email === email);

    if (existing) {
    
      if (existing.password === password) {
        localStorage.setItem('nhu_logged_user', JSON.stringify({ email, loggedAt: new Date().toISOString() }));
        loginMsg.textContent = 'Inicio de sesión exitoso. ¡Bienvenid@!';
        loginMsg.className = 'login-msg success-msg';
        loginMsg.setAttribute('aria-live', 'polite');
      } else {
        loginMsg.textContent = 'Contraseña incorrecta. Verifica e intenta nuevamente.';
        loginMsg.className = 'login-msg error-msg';
        loginMsg.setAttribute('aria-live', 'polite');
      }
    } else {
  
      users.push({
        email,
        password, 
        role: 'cliente',
        createdAt: new Date().toISOString()
      });
      saveUsers(users);
      localStorage.setItem('nhu_logged_user', JSON.stringify({ email, loggedAt: new Date().toISOString() }));
      loginMsg.textContent = 'Registro exitoso. Sesión iniciada. ¡Bienvenid@!';
      loginMsg.className = 'login-msg success-msg';
      loginMsg.setAttribute('aria-live', 'polite');
    }
  });

  // (Opcional) limpiezas para pruebas: descomenta si necesitas borrar datos en dev
  // localStorage.removeItem('nhu_users');
  // localStorage.removeItem('nhu_logged_user');
});
