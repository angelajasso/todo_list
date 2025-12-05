// =========================
//  SELECTORES
// =========================

const themeBtn = document.querySelector("#theme-btn");
const form = document.querySelector("#form");
const list = document.querySelector("#list");
const input = document.querySelector("#input");

// =========================
//  TEMA OSCURO
// =========================

const themeSaved = localStorage.getItem("theme");

if (themeSaved === "dark") {
  document.body.classList.add("dark");
  themeBtn.textContent = "☀️";
} else {
  themeBtn.textContent = "🌙";
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeBtn.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    themeBtn.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
});

// =========================
//   TAREAS (OBJETOS)
// =========================

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

// =========================
//  CARGAR TAREAS AL INICIAR
// =========================

document.addEventListener("DOMContentLoaded", () => {
  tareas.forEach((t) => agregarTareaDOM(t));
});

// =========================
//    AGREGAR NUEVA TAREA
// =========================

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const texto = input.value.trim();
  if (texto === "") return;

  // Crear un objeto tarea
  const nuevaTarea = {
    texto,
    completada: false,
  };

  tareas.push(nuevaTarea);
  guardarEnLocalStorage();

  agregarTareaDOM(nuevaTarea);
  input.value = "";
});

// =========================
//     AGREGAR AL DOM
// =========================

function agregarTareaDOM(tarea) {
  const li = document.createElement("li");

  // Contenedor checkbox + texto
  const contenedorCSpan = document.createElement("div");
  contenedorCSpan.classList.add("checkSpan");

  // Checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = tarea.completada;

  // Texto
  const span = document.createElement("span");
  span.textContent = tarea.texto;

  if (tarea.completada) {
    span.classList.add("completada");
  }

  // === Checkbox listener ===
  checkbox.addEventListener("change", () => {
    tarea.completada = checkbox.checked;
    guardarEnLocalStorage();

    if (tarea.completada) {
      span.classList.add("completada");
    } else {
      span.classList.remove("completada");
    }
  });

  contenedorCSpan.append(checkbox, span);

  // =========================
  //    BOTONES (Editar/Eliminar)
  // =========================

  const contenedorBtns = document.createElement("div");
  contenedorBtns.classList.add("acciones");

  const btnEditar = document.createElement("button");
  btnEditar.textContent = "✏️";

  btnEditar.addEventListener("click", () => {
    const nuevoTexto = prompt("Edita la tarea:", tarea.texto);
    if (nuevoTexto && nuevoTexto.trim() !== "") {
      tarea.texto = nuevoTexto.trim();
      span.textContent = tarea.texto;
      guardarEnLocalStorage();
    }
  });

  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "✖";

  btnEliminar.addEventListener("click", () => {
    tareas = tareas.filter((t) => t !== tarea);
    guardarEnLocalStorage();
    li.remove();
  });

  contenedorBtns.append(btnEditar, btnEliminar);

  // Unir todo al <li>
  li.append(contenedorCSpan, contenedorBtns);

  // Agregar a la lista
  list.appendChild(li);
}

// =========================
//   GUARDAR LOCALSTORAGE
// =========================

function guardarEnLocalStorage() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}
