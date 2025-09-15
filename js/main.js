document.addEventListener('DOMContentLoaded', () => {
    const productos = [
        { id: 1, nombre: "Proteína en Polvo", precio: 25000, imagen: "images/protein-art.png" },
        { id: 2, nombre: "Bandas de Resistencia", precio: 15000, imagen: "images/banda_resistencia.png" },
        { id: 3, nombre: "Mancuernas Ajustables", precio: 50000, imagen: "images/Mancuernas_ajustables.jpg" },
        { id: 4, nombre: "Ropa Deportiva", precio: 30000, imagen: "images/ropa_deportiva.png" }
    ];

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const productList = document.getElementById('product-list');
    const carritoContainer = document.getElementById('carrito-container');
    const totalCarritoSpan = document.getElementById('total-carrito');
    const cartCountSpan = document.getElementById('cart-count');
    const confirmarCompraBtn = document.getElementById('confirmar-compra-btn');
    const confirmacionCompraMsg = document.getElementById('confirmacion-compra-msg');

    function renderizarProductos() {
        if (!productList) return;
        productList.innerHTML = '';
        productos.forEach(p => {
            const div = document.createElement('div');
            div.className = 'product-card';
            div.innerHTML = `
                <img src="${p.imagen}" alt="${p.nombre}" />
                <h3>${p.nombre}</h3>
                <p>$${p.precio.toLocaleString()}</p>
                <button class="add-to-cart-btn btn" data-id="${p.id}">Añadir al carrito</button>
            `;
            productList.appendChild(div);
        });
    }

    function agregarAlCarrito(id) {
        const p = productos.find(x => x.id === id);
        const item = carrito.find(x => x.id === id);
        if (item) item.cantidad++;
        else carrito.push({ ...p, cantidad: 1 });
        guardarCarrito();
        alert(`${p.nombre} añadido al carrito`);
    }

    function eliminarDelCarrito(id) {
        carrito = carrito.filter(x => x.id !== id);
        guardarCarrito();
        alert('Producto eliminado del carrito');
    }

    function guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderizarCarrito();
        actualizarContador();
    }

    function actualizarContador() {
        if (cartCountSpan) cartCountSpan.textContent = carrito.reduce((t, i) => t + i.cantidad, 0);
    }

    function renderizarCarrito() {
        if (!carritoContainer) return;
        carritoContainer.innerHTML = '';
        if (carrito.length === 0) {
            carritoContainer.innerHTML = '<p>Carrito vacío</p>';
            if (totalCarritoSpan) totalCarritoSpan.textContent = '$0';
            return;
        }
        let total = 0;
        carrito.forEach(item => {
            total += item.precio * item.cantidad;
            const div = document.createElement('div');
            div.className = 'carrito-item';
            div.innerHTML = `
                <img src="${item.imagen}" alt="${item.nombre}" />
                <p>${item.nombre} x${item.cantidad} - $${(item.precio*item.cantidad).toLocaleString()}</p>
                <button class="remove-from-cart-btn" data-id="${item.id}">Eliminar</button>
            `;
            carritoContainer.appendChild(div);
        });
        if (totalCarritoSpan) totalCarritoSpan.textContent = `$${total.toLocaleString()}`;
    }

    document.addEventListener('click', e => {
        if (e.target.classList.contains('add-to-cart-btn'))
            agregarAlCarrito(parseInt(e.target.dataset.id));
        if (e.target.classList.contains('remove-from-cart-btn'))
            eliminarDelCarrito(parseInt(e.target.dataset.id));
    });

    if (confirmarCompraBtn) confirmarCompraBtn.addEventListener('click', () => {
        if (carrito.length === 0) alert('El carrito está vacío');
        else {
            carrito = [];
            guardarCarrito();
            confirmacionCompraMsg.textContent = '¡Compra confirmada!';
        }
    });

    renderizarProductos();
    renderizarCarrito();
    actualizarContador();
});
