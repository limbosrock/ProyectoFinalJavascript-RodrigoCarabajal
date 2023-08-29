let prodEnCarrito = localStorage.getItem("productos-en-carrito");
prodEnCarrito = JSON.parse(prodEnCarrito);


const carritoVacio = document.querySelector("#carrito-vacio");

const carritoProductos = document.querySelector("#carrito-productos");

const carritoFinalizar = document.querySelector("#carrito-finalizar");

const carritoComprado = document.querySelector("#gracias");

let btnEliminar = document.querySelectorAll(".carrito-producto-eliminar");

let carritoVaciar = document.querySelector("#carrito-vaciar");

const mostrarTotal = document.querySelector("#total");

const carritoComprar = document.querySelector(".carrito-comprar");


cargarProdCarrito();

carritoVaciar.addEventListener("click", vaciarCarrito);





function cargarProdCarrito(){
    if(prodEnCarrito && prodEnCarrito.length > 0) {
        carritoVacio.classList.add("ocultar");
        carritoProductos.classList.remove("ocultar");
        carritoFinalizar.classList.remove("ocultar");
        carritoComprado.classList.add("ocultar");
    
        carritoProductos.innerHTML = " ";
    
        prodEnCarrito.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("carrito-prod");
            div.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="carrito-prod-titulo">
                    <small> Titulo </small>
                    <h3> ${producto.nombre} </h3>
                </div>
                <div class="carrito-prod-cantidad">
                    <small> Cantidad </small>
                    <p> ${producto.cantidad} </p> 
                </div>
                <div class="carrito-prod-precio">
                    <small> Precio </small>
                    <p> $ ${producto.precio} </p>
                </div>
                <div class="carrito-prod-subtotal">
                    <small> Subtotal </small>
                    <p> $ ${producto.precio * producto.cantidad} </p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}" > Eliminar </button>
                
                `;
    
                carritoProductos.append(div);
        });
    
    } else {
        carritoVacio.classList.remove("ocultar");
        carritoProductos.classList.add("ocultar");
        carritoFinalizar.classList.add("ocultar");
        carritoComprado.classList.add("ocultar");
    }

    actualizarBtnEliminar();
    actualizarTotal();
}




function actualizarBtnEliminar() {
    btnEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    btnEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarProd);
    })
}

function eliminarProd(e){
    let idBtn = e.currentTarget.id;
    const index = prodEnCarrito.findIndex(producto => producto.id === idBtn);
    prodEnCarrito.splice(index, 1);
    cargarProdCarrito(); 
    localStorage.setItem("productos-en-carrito", JSON.stringify(prodEnCarrito));


}




function vaciarCarrito (){
    prodEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(prodEnCarrito));
    cargarProdCarrito();
}


function actualizarTotal(){
    let calcularTotal = prodEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0)
    mostrarTotal.innerText = `$${calcularTotal}`;
}


carritoComprar.addEventListener("click", comprarCarrito);


function comprarCarrito (){
    prodEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(prodEnCarrito));

    carritoVacio.classList.add("ocultar");
    carritoProductos.classList.add("ocultar");
    carritoFinalizar.classList.add("ocultar");
    carritoComprado.classList.remove("ocultar");
    
}

