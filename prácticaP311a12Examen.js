document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario");
  const tareaInput = document.getElementById("tarea-input");
  const tareaLista = document.getElementById("tarea-lista");

  formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    const textoTarea = tareaInput.value.trim();
    if (textoTarea === "") return;

    const li = document.createElement("li");
    li.className = "tarea-item";

    const span = document.createElement("span");
    span.textContent = textoTarea;

    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "OK";
    botonEliminar.addEventListener("click", function () {
      tareaLista.removeChild(li);
    });

    li.appendChild(span);
    li.appendChild(botonEliminar);
    tareaLista.appendChild(li);

    tareaInput.value = "";
  });
});
