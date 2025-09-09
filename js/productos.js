// Arreglo de productos, como se especifica en la rúbrica
const productos = [
    { id: 1, nombre: "Proteína en Polvo", precio: 25000, imagen: "https://placehold.co/250x250/000000/FFFFFF?text=Proteína+en+Polvo" },
    { id: 2, nombre: "Bandas de Resistencia", precio: 15000, imagen: "https://placehold.co/250x250/000000/FFFFFF?text=Bandas+de+Resistencia" },
    { id: 3, nombre: "Mancuernas Ajustables", precio: 50000, imagen: "https://placehold.co/250x250/000000/FFFFFF?text=Mancuernas+Ajustables" },
    { id: 4, nombre: "Ropa Deportiva", precio: 30000, imagen: "https://placehold.co/250x250/000000/FFFFFF?text=Ropa+Deportiva" }
];

// Carrito de compras, se inicializa desde localStorage
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para renderizar los productos en la página de productos
function renderizarProductos() {
    const productList = document.getElementById('product-list');
    if (productList) {
        productList.innerHTML = '';
        productos.forEach(producto => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${producto.imagen}" alt="Imagen del producto ${producto.nombre}" />
                <h3>${producto.nombre}</h3>
                <p><strong>$${producto.precio.toLocaleString()}</strong></p>
                <a href="detalle-producto.html?id=${producto.id}" class="btn-detail">Ver Detalle</a>
                <button class="add-to-cart-btn" data-id="${producto.id}">Añadir al carrito</button>
            `;
            productList.appendChild(productCard);
        });
    }
}

// Función para añadir un producto al carrito
function agregarAlCarrito(productoId) {
    const producto = productos.find(p => p.id === productoId);
    if (producto) {
        const itemEnCarrito = carrito.find(item => item.id === productoId);
        if (itemEnCarrito) {
            itemEnCarrito.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }
        guardarCarrito();
        alert(`${producto.nombre} ha sido añadido al carrito.`);
    }
}

// Función para guardar el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
}

// Función para actualizar el contador del carrito en el navbar
function actualizarContadorCarrito() {
    const cartCountElement = document.querySelector('a[href="carrito.html"]');
    if (cartCountElement) {
        const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
        cartCountElement.innerHTML = `<i class="fas fa-shopping-cart"></i> Carrito (${totalItems})`;
    }
}

// Event listener para el botón "Añadir al carrito"
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart-btn')) {
        const productId = parseInt(e.target.dataset.id);
        agregarAlCarrito(productId);
    }
});

// Event listener para cuando la página cargue
document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos();
    actualizarContadorCarrito();
});

// Función para renderizar la página del carrito
function renderizarCarrito() {
    const carritoContainer = document.getElementById('carrito-container');
    if (carritoContainer) {
        carritoContainer.innerHTML = '';
        if (carrito.length === 0) {
            carritoContainer.innerHTML = '<p>El carrito de compras está vacío.</p>';
        } else {
            let total = 0;
            carrito.forEach(item => {
                total += item.precio * item.cantidad;
                const itemDiv = document.createElement('div');
                itemDiv.className = 'carrito-item';
                itemDiv.innerHTML = `
                    <img src="${item.imagen}" alt="${item.nombre}" />
                    <div>
                        <h4>${item.nombre}</h4>
                        <p>Precio: $${item.precio.toLocaleString()}</p>
                        <p>Cantidad: ${item.cantidad}</p>
                        <button data-id="${item.id}" class="btn-eliminar">Eliminar</button>
                    </div>
                `;
                carritoContainer.appendChild(itemDiv);
            });
            document.getElementById('total-carrito').textContent = `$${total.toLocaleString()}`;
        }
    }
}

// Event listener para los botones de eliminar del carrito
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-eliminar')) {
        const productoId = parseInt(e.target.dataset.id);
        eliminarDelCarrito(productoId);
    }
});

function eliminarDelCarrito(productoId) {
    carrito = carrito.filter(item => item.id !== productoId);
    guardarCarrito();
    renderizarCarrito();
}
