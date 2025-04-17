fetch('./productos.json')
    .then(r => r.json())
    .then(data => {
        const articulos = document.querySelector("#articulos");
        const contenedorPuntos = document.querySelector("#buttonNavegacion"); // contenedor de puntos
        const porPagina = 8;
        let paginaActual = 0;
        let totalPaginas = Math.ceil(data.length / porPagina);
        let puntos = [];

        function crearPuntos() {
            contenedorPuntos.innerHTML = ""; // limpiar puntos anteriores
            puntos = [];

            for (let i = 0; i < totalPaginas; i++) {
                const punto = document.createElement("div");
                punto.className = `w-4 h-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 
                    ${i === 0 ? 'bg-blue-300' : 'bg-white'}`;

                punto.addEventListener("click", () => {
                    paginaActual = i;
                    mostrarPagina(paginaActual);
                    actualizarPuntos();
                });

                contenedorPuntos.appendChild(punto);
                puntos.push(punto);
            }
        }

        function mostrarPagina(pagina) {
            articulos.innerHTML = ""; // limpiar productos anteriores
            let inicio = pagina * porPagina;
            let fin = inicio + porPagina;
            let productosPagina = data.slice(inicio, fin);

            productosPagina.forEach(element => {
                let tarjeta = document.createElement("div");
                let imagenes = document.createElement("div");
                let informacionProducto = document.createElement("div");
                let precioAndLike = document.createElement("div");
                let buttons = document.createElement("div");
                let img = document.createElement("img");
                let nombre = document.createElement("p");
                let categoria = document.createElement("p");
                let precio = document.createElement("p");
                let imgLike = document.createElement("img");
                let buttonCompra = document.createElement("button");
                let buttonAgregarCarrito = document.createElement("button");

                tarjeta.className = 'grid grid-rows-[250px_auto] lg:grid-rows-[400px_auto] gap-4';

                img.src = element.imagen;
                img.className = 'w-full h-full object-cover';

                nombre.textContent = element.nombre;
                nombre.className = 'text-sm md:text-base lg:text-lg font-bold mb-1';

                categoria.textContent = element.categoria;
                categoria.className = 'text-xs md:text-base text-neutral-500 mb-1';

                precioAndLike.className = 'flex justify-between items-center';

                precio.textContent = `$ ${element.precio}`;
                precio.className = 'text-lg md:text-xl font-bold mb-4';

                imgLike.src = 'public/img/like1.svg';
                imgLike.className = 'w-7 cursor-pointer';

                buttons.className = 'flex items-center flex-col lg:flex-row gap-2 lg:gap-6';

                buttonCompra.textContent = 'Comprar Ahora';
                buttonCompra.className = 'border-2 px-2 py-1 font-bold rounded-lg w-full text-sm cursor-pointer';

                buttonAgregarCarrito.textContent = 'Agregar Carrito';
                buttonAgregarCarrito.className = 'bg-emerald-600 px-2 p-1 font-bold rounded-lg w-full text-sm cursor-pointer';

                imagenes.appendChild(img);
                informacionProducto.appendChild(nombre);
                informacionProducto.appendChild(categoria);
                informacionProducto.appendChild(precioAndLike);
                precioAndLike.appendChild(precio);
                precioAndLike.appendChild(imgLike);
                informacionProducto.appendChild(buttons);
                buttons.appendChild(buttonCompra);
                buttons.appendChild(buttonAgregarCarrito);
                tarjeta.appendChild(imagenes);
                tarjeta.appendChild(informacionProducto);
                articulos.appendChild(tarjeta);
            });
        }

        function actualizarPuntos() {
            puntos.forEach((punto, i) => {
                punto.classList.remove("bg-blue-300");
                punto.classList.add("bg-white");
                if (i === paginaActual) {
                    punto.classList.remove("bg-white");
                    punto.classList.add("bg-blue-300");
                }
            });
        }

        crearPuntos();
        mostrarPagina(paginaActual);
    });
