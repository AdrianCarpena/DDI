/* Inicialmente obtengo las referencias a todos los elementos que voy a usar, para ello utilizo getElementById.
En el caso de los módulos al ser más de uo utilizo getElementsByName.
*/
const form = document.getElementById("formMatricula");

const nombre = document.getElementById("nombre");
const edad = document.getElementById("edad");
const email = document.getElementById("email");
const ciclo = document.getElementById("ciclo");
const modulos = document.getElementsByName("modulos");
const acepto = document.getElementById("acepto");

//Estos los los mensajes que inicialmente están vacios, los rellenare poniendo el mensaje correspondiente.
const msgNombre = document.getElementById("msgNombre");
const msgEdad = document.getElementById("msgEdad");
const msgEmail = document.getElementById("msgEmail");
const msgCiclo = document.getElementById("msgCiclo");
const msgMods = document.getElementById("msgMods");
const msgAcepto = document.getElementById("msgAcepto");

const btnReset = document.getElementById("btnReset");
const btnReload = document.getElementById("btnReload");




// NOMBRE (mínimo 3 caracteres). Cambia de color según esté bien o mal.
function validarNombre() {
  if (nombre.value.trim().length < 3) {
    console.warn("Nombre inválido");
    msgNombre.textContent = "Nombre inválido";
    msgNombre.className = "msg msg-error";
    nombre.className="msg msg-error";
    return false
  }
    console.log("Nombre válido")
    msgNombre.textContent = "Nombre válido";
    msgNombre.className = "msg msg-ok";
    nombre.className="msg msg-ok";
    return true
  
}

// EDAD (debe ser un número entre 16 y 60). También cambia de color según como esté.
function validarEdad() {
  const valor = Number(edad.value);

  if (isNaN(valor) || valor < 16 || valor > 60) {
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

// Se debe seleccionar uno de los ciclos, no se puede dejar en blanco, que es la opcion --Elige--.
function validarCiclo() {
  if (ciclo.value === "") {
    console.warn("Ciclo inválido")
    msgCiclo.textContent = "Ciclo inválido";
    msgCiclo.className = "msg msg-error";
    ciclo.className="msg msg-error";
    return false
  }
    console.log("Ciclo válido")
    msgCiclo.textContent = "Ciclo válido";
    msgCiclo.className = "msg msg-ok";
    ciclo.className="msg msg-ok";
    return true
}

//Ambos checkboxes deben estar marcados, uso un bucle for para recorrerlos y ver si estan o nó marcados.
function validarModulos() {
  let contador = 0;

  for (let i = 0; i < modulos.length; i++) {
    if (modulos[i].checked) contador++;
  }

  //En caso de haber menos de 2 marcados saldrá un mensaje de error.
  if (contador < 2) {
    msgMods.textContent = "Seleccione al menos 2 módulos";
    msgMods.className = "msg msg-error";
    return false
  }
  msgMods.textContent = "Módulos correctos";
  msgMods.className = "msg msg-ok";
  return true
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


//En estas lineas establezco los listener a los campos para que cada vez que se inserte algo se llame a la función correspondiente.
nombre.addEventListener("input", validarNombre);
edad.addEventListener("input", validarEdad);
email.addEventListener("input", validarEmail);
ciclo.addEventListener("change", validarCiclo);
acepto.addEventListener("change", validarAcepto);
for (let i = 0; i < modulos.length; i++) {
  modulos[i].addEventListener("change", validarModulos);
}


/*Este es para que al dar a enviar llame a la función declarada abajo.preventDefault según he visto es para que no use el comportamiento por defecto de la 
página al hacer un submit, sino que haga lo que establezco en la función.*/
form.addEventListener("submit", function(e) {
  e.preventDefault();

  //Creo un array de errores
  let errores = [];

  //Si al llamar a la función devuelve false, almacenamos el nombre del campo en el array creado anteriormente.
  if (!validarNombre()) errores.push("Nombre");
  if (!validarEdad()) errores.push("Edad");
  if (!validarEmail()) errores.push("Email");
  if (!validarCiclo()) errores.push("Ciclo");
  if (!validarModulos()) errores.push("Módulos");
  if (!validarAcepto()) errores.push("Condiciones");

  //Si hay algun campo mal mostramos un alert con esos campos
  if (errores.length > 0) {
    alert("Campos no válidos:\n- " + errores.join("\n- "));
    return;
  }

  //Si se llega esta aquí significa que no hay errores pues antes hicimos un return, que acabaría la función.
  //Ahora recojo los módulos seleccionados
  let modulosSeleccionados = [];
  for (let i = 0; i < modulos.length; i++) {
    if (modulos[i].checked) modulosSeleccionados.push(modulos[i].value);
  }

  //Finalmente tras recuperar el valor de cada campo cambiamos el html de la página de forma que muestre un resumen de lo enviado.Para ello usamos comillas de ejecución
  document.body.innerHTML = `
    <h1>Resumen de matrícula</h1>
    <p><strong>Alumno:</strong> ${nombre.value}</p>
    <p><strong>Edad:</strong> ${edad.value}</p>
    <p><strong>Email:</strong> ${email.value}</p>
    <p><strong>Ciclo:</strong> ${ciclo.value}</p>
    <p><strong>Módulos:</strong> ${modulosSeleccionados.join(", ")}</p>
    <p><strong>Observaciones:</strong> ${document.getElementById("obs").value}</p>
  `;
});


//Creo un listener para cuando se pulse el boton de limpiar la página, para ello borro todos los mensajes, puesto que ya de por si el botón vacia los campos sin
//necesidad de recargar la página o yo hacer algo.
btnReset.addEventListener("click", function() {
  msgNombre.textContent = "";
  msgEdad.textContent = "";
  msgEmail.textContent = "";
  msgCiclo.textContent = "";
  msgMods.textContent = "";
  msgAcepto.textContent = "";
});

//Creo el listener del boton que recarga la página, al pulsarlo llamo a una función declarada abajo que únicamente recarga la página.
btnReload.addEventListener("click", function() {
  location.reload();
});
