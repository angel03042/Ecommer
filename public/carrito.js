export function renderizarCarrito() {
    const listaCarrito = document.querySelector(".listaCarrito");
    listaCarrito.innerHTML = "";

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Calcular el total de productos considerando la cantidad
    const sumaProductos = carrito.reduce((total, producto) => 
        total + (producto.cantidad || 1) * Number(producto.precio), 0);

    const envio = sumaProductos * 0.05;
    const totalFinal = sumaProductos + envio;

    // Actualizar contadores
    const cantidadTotal = carrito.reduce((total, producto) => total + (producto.cantidad || 1), 0);
    document.querySelector("#contadorCarrito").textContent = cantidadTotal;

    document.querySelectorAll(".productos").forEach(el => el.textContent = cantidadTotal);
    document.querySelectorAll(".precioProductos").forEach(el => el.textContent = `$ ${sumaProductos.toFixed(2)}`);
    document.querySelectorAll(".precioEnvio").forEach(el => el.textContent = `$ ${envio.toFixed(2)}`);
    document.querySelectorAll(".precioTotal").forEach(el => el.textContent = `$ ${totalFinal.toFixed(2)}`);


    const resultado = {
        priceProduct: sumaProductos,
        envios: envio,
        resultadoFinal: totalFinal
    }

    localStorage.setItem('resultado', JSON.stringify(resultado));

    // Crear tarjetas de productos
    carrito.forEach((producto, index) => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "bg-white p-2 rounded-lg flex items-center justify-between gap-2 shadow-md";

        const contenedor = document.createElement("div");
        contenedor.className = 'flex gap-4';

        const containerProduct = document.createElement("div");
        containerProduct.className = 'flex flex-col md:flex-row items-center gap-2 md:gap-4';

        const numberContenedor = document.createElement("div");
        numberContenedor.className = 'grid grid-cols-3 gap-2 w-max rounded-lg border-1';

        const buttonMenos = document.createElement("button");
        buttonMenos.className = 'font-bold cursor-pointer px-2 bg-neutral-300 rounded-l-lg';
        buttonMenos.textContent = '-';

        const numberProducto = document.createElement("p");
        numberProducto.className = 'text-center'
        numberProducto.textContent = producto.cantidad || 1;

        const buttonMas = document.createElement("button");
        buttonMas.className = 'text-green-700 font-bold cursor-pointer px-2 bg-neutral-300 rounded-r-lg';
        buttonMas.textContent = '+';

        // Botón para disminuir cantidad
        buttonMenos.addEventListener('click', () => {
            if (producto.cantidad > 1) {
                producto.cantidad--;
            } else {
                producto.cantidad = 1;
            }
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderizarCarrito();
        });

        // Botón para aumentar cantidad
        buttonMas.addEventListener('click', () => {
            producto.cantidad++;
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderizarCarrito();
        });

        const img = document.createElement("img");
        img.src = producto.imagen;
        img.className = "w-32 h-32 object-cover rounded-md";

        const div = document.createElement("div");
        div.className = 'flex flex-col items-start justify-between';

        const nombre = document.createElement("p");
        nombre.textContent = producto.nombre;
        nombre.className = "font-bold text-sm md:text-xl";

        const precio = document.createElement("p");
        const precioTotal = (producto.cantidad || 1) * Number(producto.precio);
        precio.textContent = `$ ${precioTotal.toFixed(2)}`;
        precio.className = "text-base md:text-xl text-green-600 pe-10 font-semibold bold md:hidden";

        const precioGrande = precio.cloneNode(true);
        precioGrande.classList.remove('block','md:hidden');
        precioGrande.classList.add('hidden','md:block');

        const disponibles = document.createElement("p");
        disponibles.textContent = '+ 10 Disponibles';
        disponibles.className = 'text-xs md:text-sm text-neutral-600';

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.className = "text-red-500 font-bold cursor-pointer text-sm hover:underline";
        btnEliminar.addEventListener("click", () => {
            carrito.splice(index, 1);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderizarCarrito();
        });

        // Armado de elementos
        div.appendChild(nombre);
        div.appendChild(precio)
        numberContenedor.appendChild(buttonMenos);
        numberContenedor.appendChild(numberProducto);
        numberContenedor.appendChild(buttonMas);
        containerProduct.appendChild(numberContenedor);
        containerProduct.appendChild(disponibles);
        div.appendChild(containerProduct);
        div.appendChild(btnEliminar);
        contenedor.appendChild(img);
        contenedor.appendChild(div);
        tarjeta.appendChild(contenedor);
        tarjeta.appendChild(precioGrande);

        listaCarrito.appendChild(tarjeta);
    });
}
