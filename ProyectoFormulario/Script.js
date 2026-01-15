const form = document.getElementById("formularioJugador");

const nombreJ = document.getElementById("nombreJ");
const edad = document.getElementById("edad");
const email = document.getElementById("email");

const nombreP = document.getElementById("nombreP");
const clasePersonaje = document.getElementById("clasePersonaje");
const Personalidad = document.getElementById("Personalidad");
const listaPersonalidades = document.getElementById("Personalidades");
const MAX_PERSONALIDADES = 3;

const historiaP=document.getElementById("HistoriaP");
const acepto = document.getElementById("acepto");

const msgNombreJ = document.getElementById("msgNombreJ");
const msgEdad = document.getElementById("msgEdad");
const msgEmail = document.getElementById("msgEmail");

const msgNombreP = document.getElementById("msgNombreP");
const msgClase = document.getElementById("msgClase");
const msgPersonalidad = document.getElementById("msgPersonalidad");
const msgAcepto = document.getElementById("msgAcepto");

const btnReset = document.getElementById("btnReset");
const btnReload = document.getElementById("btnReload");
const btnAñadirPersonalidad = document.getElementById("añadirPersonalidad");
const btnEliminarPersonalidad = document.getElementById("eliminarPersonalidad");
const btnEnviar = document.getElementById("btnEnviar");

// ----------------------
// Habilitar/deshabilitar botón según checkbox
// ----------------------

// Inicia deshabilitado
btnEnviar.setAttribute("disabled", true);

acepto.addEventListener("change", () => {
  btnEnviar.toggleAttribute("disabled");
});

// ----------------------
// Funciones de validación
// ----------------------

function validarNombreJugador() {
  if (nombreJ.value.trim().length < 3 || !isNaN(nombreJ.value[0])) {
    console.warn("Nombre inválido");
    msgNombreJ.textContent = "Nombre inválido (al menos 3 caracteres y que empiece por una letra)";
    msgNombreJ.className = "msg msg-error";
    nombreJ.className="msg msg-error";
    return false
  }
  console.log("Nombre válido")
  msgNombreJ.textContent = "Nombre válido";
  msgNombreJ.className = "msg msg-ok";
  nombreJ.className="msg msg-ok";
  return true
}

function validarEdad() {
  const valor = Number(edad.value);
  if (!Number.isInteger(valor) || valor < 12 || valor > 100) {
    console.warn("Edad inválida");
    msgEdad.textContent = "Edad inválida (12-100 años)";
    msgEdad.className = "msg msg-error";
    edad.className="msg msg-error";
    return false
  }
  console.log("Edad válida")
  msgEdad.textContent = "Edad válida";
  msgEdad.className = "msg msg-ok";
  edad.className="msg msg-ok";
  return true
}

function validarEmail() {
  const valor = email.value.trim();
  if (valor.length < 6 || !valor.includes("@") || !valor.includes(".") || valor.toLowerCase().includes("yahoo.")) {
    console.warn("Email inválido");
    msgEmail.textContent = "Email inválido (al menos 6 caracteres, incluyendo @ y .)";
    msgEmail.className = "msg msg-error";
    email.className="msg msg-error";
    return false
  }
  console.log("Email válido")
  msgEmail.textContent = "Email válido";
  msgEmail.className = "msg msg-ok";
  email.className="msg msg-ok";
  return true
}

function validarNombrePersonaje() {
  const valor = nombreP.value.trim();
  if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{2,}$/.test(valor)){
    console.warn("Nombre inválido");
    msgNombreP.textContent = "Nombre inválido (al menos 2 caracteres y solo debe tener letras)";
    msgNombreP.className = "msg msg-error";
    nombreP.className = "msg msg-error";
    return false;
  }
  msgNombreP.textContent = "Nombre válido";
  msgNombreP.className = "msg msg-ok";
  nombreP.className = "msg msg-ok";
  return true;
}

function validarClase() {
  if (clasePersonaje.value === "") {
    console.warn("Clase inválida")
    msgClase.textContent = "Clase inválida";
    msgClase.className = "msg msg-error";
    clasePersonaje.className="msg msg-error";
    return false
  }
  console.log("Clase válida")
  msgClase.textContent = "Clase válida";
  msgClase.className = "msg msg-ok";
  clasePersonaje.className="msg msg-ok";
  return true
}

function validarPersonalidad() {
  const contador = listaPersonalidades.children.length;
  if (contador < 1 || contador > 3) {
    msgPersonalidad.textContent = "Debes elegir entre 1 y 3 personalidades";
    msgPersonalidad.className = "msg msg-error";
    return false;
  }
  msgPersonalidad.textContent = "Personalidad válida";
  msgPersonalidad.className = "msg msg-ok";
  return true;
}

function validarAcepto() {
  if (!acepto.checked) {
    msgAcepto.textContent = "Deben aceptarse las condiciones";
    msgAcepto.className = "msg msg-error";
    return false
  }
  msgAcepto.textContent = "Condiciones aceptadas";
  msgAcepto.className = "msg msg-ok";
  return true
}

// ----------------------
// Listeners de inputs y select
// ----------------------

nombreJ.addEventListener("input", validarNombreJugador);
edad.addEventListener("input", validarEdad);
email.addEventListener("input", validarEmail);

nombreP.addEventListener("input", validarNombrePersonaje);
clasePersonaje.addEventListener("change", validarClase);
acepto.addEventListener("change", validarAcepto);

// ----------------------
// Listener del formulario
// ----------------------

form.addEventListener("submit", function(e) {
  e.preventDefault();

  let errores = [];

  if (!validarNombreJugador()) errores.push("NombreJugador");
  if (!validarEdad()) errores.push("Edad");
  if (!validarEmail()) errores.push("Email");
  if (!validarNombrePersonaje()) errores.push("NombrePersonaje");
  if (!validarClase()) errores.push("Clase");
  if (!validarPersonalidad()) errores.push("Personalidad");
  if (!validarAcepto()) errores.push("Condiciones");

  if (errores.length > 0) {
    alert("Campos no válidos:\n- " + errores.join("\n- "));
    return;
  }

  const datosJugador = {
    nombreJ: nombreJ.value.trim(),
    edad: edad.value.trim(),
    email: email.value.trim(),
  };

  const datosPersonaje = {
    nombreP: nombreP.value.trim(),
    claseP: clasePersonaje.value,
    personalidades: Array.from(listaPersonalidades.children).map(li => li.textContent),
    historia: historiaP.value.trim()
  };

  const datosCompletos = {
    jugador: datosJugador,
    personaje: datosPersonaje
  };

  localStorage.setItem("resumenPersonaje", JSON.stringify(datosCompletos));

  window.location.href = "Resumen.html";
});

// ----------------------
// Botón Reset
// ----------------------

btnReset.addEventListener("click", function() {
  msgNombreJ.textContent = "";
  msgEdad.textContent = "";
  msgEmail.textContent = "";

  msgNombreP.textContent = "";
  msgClase.textContent = "";
  clasePersonaje.className=""
  msgPersonalidad.textContent = "";
  msgAcepto.textContent = "";
});

// ----------------------
// Botones de personalidades
// ----------------------

btnAñadirPersonalidad.addEventListener("click", () => {
  const valor = Personalidad.value;

  if (valor === "") {
    msgPersonalidad.textContent = "Debes elegir una personalidad";
    msgPersonalidad.className = "msg msg-error";
    return;
  }

  const items = listaPersonalidades.children;

  if (items.length >= MAX_PERSONALIDADES) {
    msgPersonalidad.textContent = "Máximo 3 personalidades";
    msgPersonalidad.className = "msg msg-error";
    return;
  }

  for (let li of items) {
    if (li.textContent === valor) {
      msgPersonalidad.textContent = "Esa personalidad ya está añadida";
      msgPersonalidad.className = "msg msg-error";
      return;
    }
  }

  const li = document.createElement("li");
  li.textContent = valor;
  listaPersonalidades.appendChild(li);

  msgPersonalidad.textContent = "Personalidad añadida";
  msgPersonalidad.className = "msg msg-ok";
});

btnEliminarPersonalidad.addEventListener("click", () => {
  const valor = Personalidad.value;

  if (valor === "") {
    msgPersonalidad.textContent = "Debes seleccionar una personalidad para eliminar";
    msgPersonalidad.className = "msg msg-error";
    return;
  }

  const items = Array.from(listaPersonalidades.children);
  const liAEliminar = items.find(li => li.textContent === valor);

  if (!liAEliminar) {
    msgPersonalidad.textContent = "Esa personalidad no está en la lista";
    msgPersonalidad.className = "msg msg-error";
    return;
  }

  listaPersonalidades.removeChild(liAEliminar);

  msgPersonalidad.textContent = "Personalidad eliminada";
  msgPersonalidad.className = "msg msg-ok";
});
