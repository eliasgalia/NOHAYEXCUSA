
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const emailInput = document.getElementById('login-email');
  const passInput = document.getElementById('login-password');
  const errorEmail = document.getElementById('error-email');
  const errorPass = document.getElementById('error-password');
  const loginMsg = document.getElementById('login-msg');

  
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

<<<<<<< HEAD
    function validateEmail() {
=======
 
  function validateEmail() {
>>>>>>> 175906db0d364c13d4d68cfee665a2af92d69f08
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

<<<<<<< HEAD
    emailInput.addEventListener('input', validateEmail);
  passInput.addEventListener('input', validatePassword);

 
=======
  emailInput.addEventListener('input', validateEmail);
  passInput.addEventListener('input', validatePassword);


>>>>>>> 175906db0d364c13d4d68cfee665a2af92d69f08
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

<<<<<<< HEAD
    form.addEventListener('submit', (e) => {
=======
  
  form.addEventListener('submit', (e) => {
>>>>>>> 175906db0d364c13d4d68cfee665a2af92d69f08
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
<<<<<<< HEAD
      
=======
    
>>>>>>> 175906db0d364c13d4d68cfee665a2af92d69f08
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
<<<<<<< HEAD
      
      users.push({
        email,
        password, // Nota: para la entrega está OK; no es seguro para producción
=======
  
      users.push({
        email,
        password, 
>>>>>>> 175906db0d364c13d4d68cfee665a2af92d69f08
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

<<<<<<< HEAD

=======
  // (Opcional) limpiezas para pruebas: descomenta si necesitas borrar datos en dev
  // localStorage.removeItem('nhu_users');
  // localStorage.removeItem('nhu_logged_user');
>>>>>>> 175906db0d364c13d4d68cfee665a2af92d69f08
});
