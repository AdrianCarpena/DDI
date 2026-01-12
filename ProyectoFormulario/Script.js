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

//Estos los los mensajes que inicialmente están vacios, los rellenare poniendo el mensaje correspondiente.
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



function validarNombreJugador() {
  if (nombreJ.value.trim().length < 3 || !isNaN(nombreJ.value[0])) {
    console.warn("Nombre inválido");
    msgNombreJ.textContent = "Nombre inválido";
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

// EDAD (debe ser un número entre 16 y 60). También cambia de color según como esté.
function validarEdad() {
  const valor = Number(edad.value);

  if (!Number.isInteger(valor) || valor < 12 || valor > 100) {
    console.warn("Edad inválida");
    msgEdad.textContent = "Edad inválida";
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

// El email debe incluir @ y un . , no se admiten emails que contengan yahoo. y debe ser de mínimo 6 caracteres. Tambíen cambia el color
function validarEmail() {
  const valor = email.value.trim();

  if (valor.length < 6 || !valor.includes("@") || !valor.includes(".") || valor.toLowerCase().includes("yahoo.")) {
    console.warn("Email inválido");
    msgEmail.textContent = "Email inválido";
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
    console.warn("El nombre del personaje solo debe tener letras y longitud de al menos 2 caracteres");
    msgNombreP.textContent = "Nombre inválido";
    msgNombreP.className = "msg msg-error";
    nombreP.className = "msg msg-error";
    return false;
  }

  msgNombreP.textContent = "Nombre válido";
  msgNombreP.className = "msg msg-ok";
  nombreP.className = "msg msg-ok";
  return true;
}

// Se debe seleccionar uno de los ciclos, no se puede dejar en blanco, que es la opcion --Elige--.
function validarClase() {
  if (clasePersonaje.value === "") {
    console.warn("Ciclo inválido")
    msgClase.textContent = "Ciclo inválido";
    msgClase.className = "msg msg-error";
    clasePersonaje.className="msg msg-error";
    return false
  }
    console.log("Ciclo válido")
    msgClase.textContent = "Ciclo válido";
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

// El checkbox de las condiciones debe estar aceptado, si no es así saldrá un mensaje de error
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






nombreJ.addEventListener("input", validarNombreJugador);
edad.addEventListener("input", validarEdad);
email.addEventListener("input", validarEmail);

nombreP.addEventListener("input", validarNombrePersonaje);
clasePersonaje.addEventListener("change", validarClase);
acepto.addEventListener("change", validarAcepto);


/*Este es para que al dar a enviar llame a la función declarada abajo.preventDefault según he visto es para que no use el comportamiento por defecto de la 
página al hacer un submit, sino que haga lo que establezco en la función.*/
form.addEventListener("submit", function(e) {
  e.preventDefault();

  //Creo un array de errores
  let errores = [];

  //Si al llamar a la función devuelve false, almacenamos el nombre del campo en el array creado anteriormente.
  if (!validarNombreJugador()) errores.push("NombreJugador");
  if (!validarEdad()) errores.push("Edad");
  if (!validarEmail()) errores.push("Email");
  if (!validarNombrePersonaje()) errores.push("NombrePersonaje");
  if (!validarClase()) errores.push("Clase");
  if (!validarPersonalidad()) errores.push("Personalidad");
  if (!validarAcepto()) errores.push("Condiciones");

  //Si hay algun campo mal mostramos un alert con esos campos
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

  // Redirigir a la página de resumen
  window.location.href = "Resumen.html";
});


//Creo un listener para cuando se pulse el boton de limpiar la página, para ello borro todos los mensajes, puesto que ya de por si el botón vacia los campos sin
//necesidad de recargar la página o yo hacer algo.
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

btnAñadirPersonalidad.addEventListener("click", () => {
  const valor = Personalidad.value;

  if (valor === "") {
    msgPersonalidad.textContent = "Debes elegir una personalidad";
    msgPersonalidad.className = "msg msg-error";
    return;
  }

  const items = listaPersonalidades.children;

  // Máximo 3
  if (items.length >= MAX_PERSONALIDADES) {
    msgPersonalidad.textContent = "Máximo 3 personalidades";
    msgPersonalidad.className = "msg msg-error";
    return;
  }

  // Evitar duplicados
  for (let li of items) {
    if (li.textContent === valor) {
      msgPersonalidad.textContent = "Esa personalidad ya está añadida";
      msgPersonalidad.className = "msg msg-error";
      return;
    }
  }

  // Crear <li>
  const li = document.createElement("li");
  li.textContent = valor;

  // Añadir a la lista
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

