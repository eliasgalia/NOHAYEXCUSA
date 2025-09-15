document.addEventListener('DOMContentLoaded', () => {

    const productos = [
        { id: 1, nombre: "Proteína en Polvo", precio: 25000, imagen: "images/productos/protein-art.png" },
        { id: 2, nombre: "Bandas de Resistencia", precio: 15000, imagen: "images/productos/banda_resistencia.png" },
        { id: 3, nombre: "Mancuernas Ajustables", precio: 50000, imagen: "images/productos/Mancuernas_ajustables.jpg" },
        { id: 4, nombre: "Ropa Deportiva", precio: 30000, imagen: "images/productos/ropa_deportiva.png" }
    ];

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const productList = document.getElementById('product-list');
    const carritoContainer = document.getElementById('carrito-container');
    const totalCarritoSpan = document.getElementById('total-carrito');
    const cartCountSpan = document.getElementById('cart-count');
    const confirmarCompraBtn = document.getElementById('confirmar-compra-btn');
    const confirmacionCompraMsg = document.getElementById('confirmacion-compra-msg');

    // Render productos
    function renderizarProductos() {
        if (!productList) return;
        productList.innerHTML = '';
        productos.forEach(p => {
            const div = document.createElement('div');
            div.className = 'producto';
            div.innerHTML = `
                <img src="${p.imagen}" alt="Imagen de ${p.nombre}" onerror="this.src='https://placehold.co/1080x1080/000000/FFFFFF?text=Imagen+no+encontrada';">
                <h3 class="product-name">${p.nombre}</h3>
                <p class="product-price">CLP $${p.precio.toLocaleString()}</p>
                <button class="btn add-to-cart-btn" data-id="${p.id}">Añadir al carrito</button>
            `;
            productList.appendChild(div);
        });
    }

    // Render carrito
    function renderizarCarrito() {
        if (!carritoContainer) return;
        carritoContainer.innerHTML = '';
        if (carrito.length === 0) {
            carritoContainer.innerHTML = '<p>El carrito de compras está vacío.</p>';
            totalCarritoSpan.textContent = `$0`;
            return;
        }

        let total = 0;
        carrito.forEach(item => {
            total += item.precio * item.cantidad;
            const div = document.createElement('div');
            div.className = 'carrito-item';
            div.innerHTML = `
                <img src="${item.imagen}" alt="Producto ${item.nombre}">
                <div class="item-details">
                    <h4>${item.nombre}</h4>
                    <p>Precio: CLP $${item.precio.toLocaleString()}</p>
                    <p>Cantidad: ${item.cantidad}</p>
                </div>
                <div class="item-actions">
                    <button class="btn remove-from-cart-btn" data-id="${item.id}">Eliminar</button>
                </div>
            `;
            carritoContainer.appendChild(div);
        });

        totalCarritoSpan.textContent = `CLP $${total.toLocaleString()}`;
    }

    // Añadir producto al carrito
    function agregarAlCarrito(id) {
        const producto = productos.find(p => p.id === id);
        if (!producto) return;

        const item = carrito.find(i => i.id === id);
        if (item) item.cantidad++;
        else carrito.push({ ...producto, cantidad: 1 });

        guardarCarrito();
        showAlert(`${producto.nombre} añadido al carrito.`);
    }

    // Eliminar producto del carrito
    function eliminarDelCarrito(id) {
        carrito = carrito.filter(i => i.id !== id);
        guardarCarrito();
        showAlert('Producto eliminado.');
    }

    // Guardar carrito en localStorage
    function guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarContador();
        renderizarCarrito();
    }

    // Contador en navbar
    function actualizarContador() {
        const totalItems = carrito.reduce((sum, i) => sum + i.cantidad, 0);
        if (cartCountSpan) cartCountSpan.textContent = totalItems;
    }

    // Confirmar compra
    function confirmarCompra() {
        if (carrito.length === 0) {
            confirmacionCompraMsg.textContent = 'El carrito está vacío.';
            confirmacionCompraMsg.style.color = '#e53935';
        } else {
            carrito = [];
            guardarCarrito();
            confirmacionCompraMsg.textContent = '¡Compra confirmada con éxito!';
            confirmacionCompraMsg.style.color = '#4CAF50';
        }
    }

    // Mensaje temporal
    function showAlert(msg) {
        const alertDiv = document.createElement('div');
        alertDiv.textContent = msg;
        alertDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #333;
            color: #fff;
            padding: 15px 25px;
            border-radius: 8px;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.5s;
        `;
        document.body.appendChild(alertDiv);
        setTimeout(() => alertDiv.style.opacity = '1', 10);
        setTimeout(() => {
            alertDiv.style.opacity = '0';
            setTimeout(() => document.body.removeChild(alertDiv), 500);
        }, 2000);
    }

    // Eventos botones
    document.addEventListener('click', e => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            agregarAlCarrito(parseInt(e.target.dataset.id));
        }
        if (e.target.classList.contains('remove-from-cart-btn')) {
            eliminarDelCarrito(parseInt(e.target.dataset.id));
        }
    });

    if (confirmarCompraBtn) confirmarCompraBtn.addEventListener('click', confirmarCompra);

    // Inicialización
    renderizarProductos();
    renderizarCarrito();
    actualizarContador();

});
