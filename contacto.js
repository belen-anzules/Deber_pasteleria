const form = document.getElementById('contactForm');
const btnBorrar = document.getElementById('btnBorrar');
const mensajeEnviado = document.getElementById('mensajeEnviado');
const btnOk = document.getElementById('okEnviado');
const resumenDatos = document.getElementById('resumenDatos');

// Mostrar cuadro al enviar
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const pastel = document.getElementById('pastel').value;
  const comentarios = document.getElementById('comentarios').value;

  resumenDatos.innerHTML = `
    <p><strong>Nombre:</strong> ${nombre}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Tipo de pastel:</strong> ${pastel}</p>
    <p><strong>Comentarios:</strong> ${comentarios || "Ninguno"}</p>
  `;

  mensajeEnviado.style.display = 'block';
});

// Botón OK
btnOk.addEventListener('click', () => {
  mensajeEnviado.style.display = 'none';
  resumenDatos.innerHTML = '';
  form.reset();
});

// Botón Borrar
btnBorrar.addEventListener('click', () => {
  form.reset();
});
