document.addEventListener('DOMContentLoaded', () => {

    const productos = [
        { id: 1, nombre: "Proteína en Polvo", precio: 25000, imagen: "images/protein-art.png" },
        { id: 2, nombre: "Bandas de Resistencia", precio: 15000, imagen: "images/banda_resistencia.png" },
        { id: 3, nombre: "Mancuernas Ajustables", precio: 50000, imagen: "images/Mancuernas_ajustables.jpg" },
        { id: 4, nombre: "Ropa Deportiva", precio: 30000, imagen: "images/ropa_deportiva.png" }
    ];

    const blogPosts = [
        { id: 1, titulo: "Caso Curioso #1", descripcion: "Nuestro objetivo es que logres resultados reales, sin excusas. ¡Conoce a Juanito Pérez que bajó 10 kg en un mes!", imagen: "images/blog-1.png" },
        { id: 2, titulo: "Caso Curioso #2", descripcion: "Entrena con los mejores consejos y trucos para tonificar y quemar calorías. Descubre los 5 mejores ejercicios.", imagen: "images/blog-2.png" }
    ];

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const productList = document.getElementById('product-list');
    const blogPostsContainer = document.getElementById('blog-posts-container');
    const carritoContainer = document.getElementById('carrito-container');
    const totalCarritoSpan = document.getElementById('total-carrito');
    const cartCountSpan = document.getElementById('cart-count');
    const contactForm = document.getElementById('contactForm');
    const contactSuccessMsg = document.getElementById('contact-success-msg');

    function renderizarProductos() {
        if (productList) {
            productList.innerHTML = '';
            productos.forEach(producto => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <img src="${producto.imagen}" alt="Imagen del producto ${producto.nombre}" onerror="this.onerror=null;this.src='https://placehold.co/250x250/000000/FFFFFF?text=Imagen+no+encontrada';"/>
                    <h3>${producto.nombre}</h3>
                    <p><strong>$${producto.precio.toLocaleString()}</strong></p>
                    <button class="add-to-cart-btn" data-id="${producto.id}">Añadir al carrito</button>
                `;
                productList.appendChild(productCard);
            });
        }
    }

    function renderizarBlog() {
        if (blogPostsContainer) {
            blogPostsContainer.innerHTML = '';
            blogPosts.forEach(post => {
                const blogPostCard = document.createElement('div');
                blogPostCard.className = 'blog-post-card';
                blogPostCard.innerHTML = `
                    <img src="${post.imagen}" alt="Imagen del blog post ${post.titulo}" onerror="this.onerror=null;this.src='https://placehold.co/250x250/000000/FFFFFF?text=Imagen+no+encontrada';"/>
                    <h3>${post.titulo}</h3>
                    <p>${post.descripcion}</p>
                `;
                blogPostsContainer.appendChild(blogPostCard);
            });
        }
    }
    
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

    function guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarContadorCarrito();
    }
    
    function actualizarContadorCarrito() {
        const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
        if (cartCountSpan) {
            cartCountSpan.textContent = totalItems;
        }
    }

    function renderizarCarrito() {
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
                        </div>
                    `;
                    carritoContainer.appendChild(itemDiv);
                });
                if (totalCarritoSpan) {
                     totalCarritoSpan.textContent = `$${total.toLocaleString()}`;
                }
            }
        }
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('contact-name');
            const emailInput = document.getElementById('contact-email');
            const messageInput = document.getElementById('contact-message');

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();

            const errorName = document.getElementById('error-name');
            const errorEmail = document.getElementById('error-email');
            const errorMessage = document.getElementById('error-message');

            errorName.textContent = '';
            errorEmail.textContent = '';
            errorMessage.textContent = '';
            
            let valid = true;

            if (name === '') {
                errorName.textContent = 'El nombre es requerido.';
                valid = false;
            } else if (name.length > 100) {
                errorName.textContent = 'El nombre no puede exceder los 100 caracteres.';
                valid = false;
            }

            const emailRegex = /^[a-zA-Z0-9._-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
            if (email === '') {
                errorEmail.textContent = 'El correo electrónico es requerido.';
                valid = false;
            } else if (!emailRegex.test(email)) {
                errorEmail.textContent = 'Formato de correo inválido. Solo se aceptan @duoc.cl, @profesor.duoc.cl, @gmail.com.';
                valid = false;
            } else if (email.length > 100) {
                errorEmail.textContent = 'El correo electrónico no puede exceder los 100 caracteres.';
                valid = false;
            }

            if (message === '') {
                errorMessage.textContent = 'El mensaje es requerido.';
                valid = false;
            } else if (message.length > 500) {
                errorMessage.textContent = 'El mensaje no puede exceder los 500 caracteres.';
                valid = false;
            }

            if (valid) {
                contactSuccessMsg.textContent = '¡Mensaje enviado con éxito!';
                contactSuccessMsg.style.color = '#4CAF50';
                contactForm.reset();
            } else {
                 contactSuccessMsg.textContent = '';
            }
        });
    }

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const productId = parseInt(e.target.dataset.id);
            agregarAlCarrito(productId);
        }
    });

    renderizarProductos();
    renderizarBlog();
    actualizarContadorCarrito();
    renderizarCarrito();
});
