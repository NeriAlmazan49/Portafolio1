document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    let formularioValido = false;
  
    // Event listeners
    document.getElementById('btnValidar').addEventListener('click', validarFormulario);
    document.getElementById('btnDescargar').addEventListener('click', descargarPDF);
    document.getElementById('btnComprar').addEventListener('click', confirmarCompra);
    document.getElementById('btnCancelar').addEventListener('click', () => {
      window.location.href = "PelisPlanet.html";
    });
  });
  
  function validarFormulario() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const edad = parseInt(document.getElementById('edad').value);
    const genero = document.querySelector('input[name="genero"]:checked');
  
    if (!username || !password || isNaN(edad) || !genero) {
      alert("❌ Por favor, complete todos los campos.");
      formularioValido = false;
      return;
    }
  
    if (edad < 13) {
      alert("⚠️ Edad no válida. Debes tener al menos 13 años.");
      formularioValido = false;
      return;
    }
  
    // Guardar datos en el div#resultado
    const resumen = `
      Usuario: ${username}
      Edad: ${edad}
      Género: ${genero.value}
      Método de pago: ${document.getElementById('metodoPago').value}
      Paquete seleccionado: ${document.getElementById('paquete').value}
    `;
    document.getElementById('resultado').innerText = resumen;
  
    alert("✅ Formulario válido. Ahora puedes descargar el PDF o confirmar compra.");
    formularioValido = true;
  }
  
  function descargarPDF() {
    if (!formularioValido) {
      alert("⚠️ Primero valida tus datos con el botón 'Validar datos'");
      return;
    }
  
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const contenido = document.getElementById('resultado').innerText;
  
    doc.text("Comprobante de Pelis Planet", 10, 10);
    doc.text(contenido, 10, 30);
    doc.save("comprobante_pelisplanet.pdf");
  }
  
  function confirmarCompra() {
    if (!formularioValido) {
      alert("⚠️ Valida tus datos antes de comprar");
      return;
    }
  
    if (confirm("¿Confirmar compra? Esta acción no se puede deshacer.")) {
      // Aquí iría la lógica real de pago
      alert("🎉 Compra realizada con éxito. Redirigiendo...");
      setTimeout(() => {
        window.location.href = "../iniciopag.html";
      }, 2000);
    }
  }
