let menu = [];

fetch('./javascript/productos.json')
    .then(response => response.json())
    .then(data => {
        menu = data;
        cargarmenu(menu);
        console.log(menu)
    })


const contenedorProductos = document.getElementById('contenedor-prod');

const botonCategorias = document.querySelectorAll('.btn-categoria');

let botonesAgregar = document.querySelectorAll(".agregar-prod")

const cantidad = document.querySelector('#cantidad')


function cargarmenu (productosSeleccion) {
    contenedorProductos.innerHTML = " ";

    productosSeleccion.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="detalles-producto">
                <h3 class="titulo-prod"> ${producto.nombre} </h3>
                <p class="precio-prod"> $ ${producto.precio} </p>
                <button class="agregar-prod" id="${producto.id}"> Agregar </button>
            </div>
            `;
        contenedorProductos.append(div);
    });

    actualizarBtnAgregar();

}

cargarmenu(menu);

botonCategorias.forEach(boton => {
    boton.addEventListener ('click', (e) => {
        botonCategorias.forEach(boton => boton.classList.remove("active")); 
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productosSeleccion = menu.filter(menu => menu.categoria === e.currentTarget.id)
            cargarmenu(productosSeleccion);

        } else {
            cargarmenu(menu);
        }
    })
})

function actualizarBtnAgregar() {
    botonesAgregar = document.querySelectorAll(".agregar-prod");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })

}


let prodEnCarrito = localStorage.getItem("productos-en-carrito");


if (prodEnCarrito) {
    productosCarrito = JSON.parse(prodEnCarrito);
    actualizarCantidad();
} else {
    productosCarrito = [];
}

function agregarAlCarrito(e) {
    const idBtn = e.currentTarget.id;
    const prodAgregado = menu.find(producto => producto.id === idBtn );

    if(productosCarrito.some(producto => producto.id === idBtn)) {
        const index = productosCarrito.findIndex(producto => producto.id === idBtn);
        productosCarrito[index].cantidad++;
    } else {
        prodAgregado.cantidad = 1
        productosCarrito.push(prodAgregado);

    }

    actualizarCantidad()

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosCarrito));

}

function actualizarCantidad () {
    let contarCantidad = productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    cantidad.innerHTML = contarCantidad;
}