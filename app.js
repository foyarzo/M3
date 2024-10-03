class Producto {
    constructor(nombre, precio, imagen) {
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.imagen = imagen;
    }
}

class Carrito {
    constructor() {
        this.productos = [];
    }

    agregarProducto(producto, cantidad) {
        let productoExistente = this.productos.find(p => p.producto.nombre === producto.nombre);
        if (productoExistente) {
            productoExistente.cantidad += cantidad;
        } else {
            this.productos.push({ producto, cantidad });
        }
        this.mostrarDetalles();
    }

    eliminarProducto(nombreProducto) {
        this.productos = this.productos.filter(p => p.producto.nombre !== nombreProducto);
        this.mostrarDetalles();
    }

    calcularTotal() {
        return this.productos.reduce((total, p) => total + p.producto.precio * p.cantidad, 0);
    }

    mostrarDetalles() {
        let detalles = document.getElementById('detallesCompra');
        detalles.innerHTML = "<h3>Carrito de Compras</h3>";
        if (this.productos.length === 0) {
            detalles.innerHTML += "<p>No hay productos en el carrito aún.</p>";
        } else {
            this.productos.forEach(p => {
                detalles.innerHTML += `
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <p>Producto: ${p.producto.nombre}, Cantidad: ${p.cantidad}, Precio: $${(p.producto.precio * p.cantidad).toLocaleString('es-CL')} CLP</p>
                        <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito('${p.producto.nombre}')">
                            <i class="fas fa-trash-alt"></i> Eliminar
                        </button>
                    </div>
                `;
            });
            detalles.innerHTML += `<h4>Total: $${this.calcularTotal().toLocaleString('es-CL')} CLP</h4>`;
        }
    }

    finalizarCompra() {
        if (this.productos.length === 0) {
            alert("No hay productos en el carrito.");
        } else {
            this.mostrarResumenCompra();
            let resumenModal = new bootstrap.Modal(document.getElementById('resumenModal'));
            resumenModal.show();
            this.productos = [];
            this.mostrarDetalles();
        }
    }

    mostrarResumenCompra() {
        let resumenBody = document.getElementById('resumenBody');
        resumenBody.innerHTML = "<h5>Resumen de la compra</h5>";
        this.productos.forEach(p => {
            resumenBody.innerHTML += `<p>Producto: ${p.producto.nombre}, Cantidad: ${p.cantidad}, Precio Total: $${(p.producto.precio * p.cantidad).toLocaleString('es-CL')} CLP</p>`;
        });
        resumenBody.innerHTML += `<h4>Total: $${this.calcularTotal().toLocaleString('es-CL')} CLP</h4>`;
    }
}

let carrito = new Carrito();

let productosDisponibles = [
    new Producto("Palta Hass", 2500, "https://d26z5keclpxl8.cloudfront.net/web-dist/fotos/productos/994/jpg/palta_hass_chilena_5845_600x600.jpg"),
    new Producto("Leche Colun", 850, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwx3VAbBOvjzpZuIZHqNtMvqYynV3ayTvBYQ&s"),
    new Producto("Pan Marraqueta", 500, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0pdSVaewUsqLv9tLMOQuDcVOSHYIMdz4Oeg&s"),
    new Producto("Queso Chanco", 3500, "https://www.frutasbosquemar.cl/wp-content/uploads/2020/06/queso-chanco-1.webp")
];

function mostrarProductosDisponibles() {
    let listaProductos = document.getElementById('listaProductos');
    productosDisponibles.forEach(producto => {
        let card = document.createElement('div');
        card.classList.add('col-md-6', 'mb-4');

        card.innerHTML = `
            <div class="card">
                <img src="${producto.imagen}" class="card-img-top producto-img" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">Precio: $${producto.precio.toLocaleString('es-CL')} CLP</p>
                    <input type="number" class="form-control mb-2" id="cantidad-${producto.nombre}" value="1" min="1">
                    <button class="btn btn-primary w-100" onclick="agregarAlCarrito('${producto.nombre}')">
                        <i class="fas fa-cart-plus"></i> Agregar al carrito
                    </button>
                </div>
            </div>
        `;

        listaProductos.appendChild(card);
    });
}

function agregarAlCarrito(nombreProducto) {
    let producto = productosDisponibles.find(p => p.nombre === nombreProducto);
    let cantidad = parseInt(document.getElementById(`cantidad-${nombreProducto}`).value);
    if (producto && cantidad > 0) {
        carrito.agregarProducto(producto, cantidad);
    }
}

function eliminarDelCarrito(nombreProducto) {
    carrito.eliminarProducto(nombreProducto);
}

function finalizarCompra() {
    carrito.finalizarCompra();
}

mostrarProductosDisponibles();
