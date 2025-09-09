// LOGIN / REGISTRO BÁSICO
const loginForm = document.getElementById("loginForm");
const loginMsg = document.getElementById("loginMsg");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (localStorage.getItem(user)) {
    // Login
    if (localStorage.getItem(user) === pass) {
      loginMsg.textContent = "Bienvenido " + user + "!";
    } else {
      loginMsg.textContent = "Contraseña incorrecta.";
    }
  } else {
    // Registro
    localStorage.setItem(user, pass);
    loginMsg.textContent = "Usuario registrado con éxito. Ahora puedes ingresar.";
  }
});

// TEST DE PLANES
const testForm = document.getElementById("testForm");
const resultadoTest = document.getElementById("resultadoTest");

testForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const objetivos = testForm.querySelectorAll("select");
  let recomendacion = "";

  if (objetivos[0].value === "Bajar grasa") {
    recomendacion = "Plan Básico recomendado 💪";
  } else if (objetivos[0].value === "Ganar masa muscular") {
    recomendacion = "Plan Intermedio recomendado 🥗";
  } else {
    recomendacion = "Plan Premium recomendado ⚡";
  }

  resultadoTest.textContent = recomendacion;
});
