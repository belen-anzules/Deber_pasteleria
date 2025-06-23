const carrito = {};

function agregarAlCarrito(articulo) {
  const nombre = articulo.dataset.nombre;
  const precio = parseFloat(articulo.dataset.precio);
  const input = articulo.querySelector('input[type="number"]');
  const errorDiv = articulo.querySelector('.error');
  const cantidad = input.value.trim();

  errorDiv.textContent = '';

  if (cantidad === '') {
    errorDiv.textContent = 'Ingrese una cantidad';
    return;
  }

  const numero = parseInt(cantidad, 10);
  if (isNaN(numero) || numero <= 0) {
    errorDiv.textContent = 'Debe ser un número mayor a 0';
    return;
  }

  if (carrito[nombre]) {
    carrito[nombre].cantidad += numero;
    carrito[nombre].subtotal = carrito[nombre].cantidad * precio;
  } else {
    carrito[nombre] = {
      cantidad: numero,
      precio: precio,
      subtotal: numero * precio
    };
  }

  actualizarCarritoVisual();
}

function actualizarCarritoVisual() {
  const lista = document.getElementById('carrito-lista');
  const subtotalSpan = document.getElementById('subtotal');
  const ivaSpan = document.getElementById('iva');
  const totalSpan = document.getElementById('total');

  lista.innerHTML = '';
  let subtotal = 0;

  for (let nombre in carrito) {
    const item = carrito[nombre];
    const div = document.createElement('div');
    div.className = 'carrito-item';
    div.innerHTML = `
      <span>${nombre} x${item.cantidad} - $${(item.precio * 1.15).toFixed(2)} c/u</span>
      <button onclick="eliminarItem('${nombre}')">❌</button>
    `;
    lista.appendChild(div);
    subtotal += item.precio * item.cantidad;
  }

  const iva = subtotal * 0.15;
  const total = subtotal + iva;

  subtotalSpan.textContent = subtotal.toFixed(2);
  ivaSpan.textContent = iva.toFixed(2);
  totalSpan.textContent = total.toFixed(2);
}

function vaciarCarrito() {
  for (let item in carrito) {
    delete carrito[item];
  }
  actualizarCarritoVisual();
}

function eliminarItem(nombre) {
  delete carrito[nombre];
  actualizarCarritoVisual();
}

function seleccionarEliminar() {
  const nombre = prompt("Escriba el nombre exacto del producto que desea eliminar:");
  if (carrito[nombre]) {
    eliminarItem(nombre);
  } else {
    alert("Ese producto no está en el carrito.");
  }
}

// Asignar eventos a los botones
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.agregar-carrito').forEach((boton) => {
    boton.addEventListener('click', () => {
      const articulo = boton.closest('article');
      agregarAlCarrito(articulo);
    });
  });
});
