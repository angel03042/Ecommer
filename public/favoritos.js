import { renderizarCarrito } from './carrito.js';

export function renderizarFavoritos() {
    const listaFavoritos = document.querySelector("#listaFavoritos");
    listaFavoritos.innerHTML = "";

    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    favoritos.forEach(producto => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "bg-white p-2 rounded-lg flex items-center justify-between gap-2 shadow-md";

        const contenedorFavoritos = document.createElement("div");
        contenedorFavoritos.className = 'flex gap-4'

        const img = document.createElement("img");
        img.src = producto.imagen;
        img.className = "w-32 h-32 object-cover rounded-md";

        const div = document.createElement("div");
        div.className = 'flex flex-col justify-between';

        const nombre = document.createElement("p");
        nombre.textContent = producto.nombre;
        nombre.className = "font-bold text-sm md:text-xl";

        // Precio se muestra en movil
        const precio = document.createElement("p");
        precio.textContent = `$ ${producto.precio}`;
        precio.className = "text-base md:text-xl text-green-600 md:pe-10 font-semibold block md:hidden";

        // precio se muestra en dispositivos mas grandes
        const precioGrande = precio.cloneNode(true);
        precioGrande.classList.remove('block', 'md:hidden');
        precioGrande.classList.add('hidden', 'md:block');

        let disponibles = document.createElement("p");
        disponibles.textContent = '+ 10 Disponibles'
        disponibles.className = 'text-sm text-neutral-600'

        const divButton = document.createElement("div");
        divButton.className = 'flex items-center gap-4';

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.className = "text-red-500 font-bold cursor-pointer text-xs md:text-sm mt-1 hover:underline";
        btnEliminar.addEventListener("click", () => {
            favoritos = favoritos.filter(p => p.nombre !== producto.nombre);
            localStorage.setItem('favoritos', JSON.stringify(favoritos));
            renderizarFavoritos();
            mostrarPagina(paginaActual); // actualiza like en lista principal
        });

        const btnComprar = document.createElement("button");
        btnComprar.textContent = 'Comprar'
        btnComprar.className = 'text-green-800 font-bold cursor-pointer text-xs md:text-sm mt-1 hover:underline';

        const btnAgregarCarrito = document.createElement("button");
        btnAgregarCarrito.textContent = 'Agregar Carrito'
        btnAgregarCarrito.className = 'text-blue-800 font-bold cursor-pointer text-xs md:text-sm mt-1 hover:underline';
        // Evento al hacer clic
        btnAgregarCarrito.addEventListener('click', () => {
            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

            // Verificar si el producto ya está en el carrito
            const productoExistente = carrito.find(item => item.nombre === producto.nombre);

            if (!productoExistente) {
                carrito.push(producto); // Agrega el producto si no está
                localStorage.setItem('carrito', JSON.stringify(carrito));
                renderizarCarrito();
            } else {
                alert('El producto ya existe');
            }
        });


        contenedorFavoritos.appendChild(img);
        div.appendChild(nombre);
        div.appendChild(disponibles);
        div.appendChild(precio);
        div.appendChild(divButton);
        divButton.appendChild(btnEliminar);
        divButton.appendChild(btnComprar);
        divButton.appendChild(btnAgregarCarrito)
        contenedorFavoritos.appendChild(div);
        tarjeta.appendChild(contenedorFavoritos);
        tarjeta.appendChild(precioGrande);

        listaFavoritos.appendChild(tarjeta);
    });

    document.querySelector("#contadorFavoritos").textContent = favoritos.length;
}