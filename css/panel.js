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

  carrito[nombre] = {
    cantidad: numero,
    precio: precio,
    subtotal: numero * precio
  };

  // Actualizar visualmente el carrito después de agregar
  actualizarCarritoVisual();

  console.log('Carrito actual:', carrito);
}
