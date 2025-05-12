import { renderizarFavoritos } from "./favoritos.js";
import { renderizarCarrito } from "./carrito.js";
import { renderizarDireccion } from "./direccion.js";
import { renderizarTarjeta } from "./tarjeta.js";
import { generarTicket, vaciarCarrito } from "./ticket.js";
import { btnDescargarTicket } from "./ticketPDF.js";

// Ocultar secciones antes de cargar
document.getElementById("articulos").style.display = "none";
document.getElementById("buttonNavegacion").style.display = "none";

fetch(
  "https://script.google.com/macros/s/AKfycbwwf4MsmP0c1VyApxeAPzPXsyxg4mQ7ui7TOVL3jbrjJz00Pj9v0WgEFSAuIlCyKspq/exec"
)
  .then((r) => r.json())
  .then((data) => {
    document.getElementById("loading").style.display = "none";
    document.getElementById("articulos").style.display = "grid";
    document.getElementById("buttonNavegacion").style.display = "flex";

    const articulos = document.querySelector("#articulos");
    const contenedorPuntos = document.querySelector("#buttonNavegacion");
    const porPagina = 8;
    let paginaActual = 0;
    let totalPaginas;
    let puntos = [];
    let productosFiltrados = data;

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    function crearPuntos() {
      contenedorPuntos.innerHTML = "";
      puntos = [];
      totalPaginas = Math.ceil(productosFiltrados.length / porPagina);

      for (let i = 0; i < totalPaginas; i++) {
        const punto = document.createElement("div");
        punto.className = `w-4 h-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 
                ${i === 0 ? "bg-blue-300" : "bg-white"}`;

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
      articulos.innerHTML = "";
      let inicio = pagina * porPagina;
      let fin = inicio + porPagina;
      let productosPagina = productosFiltrados.slice(inicio, fin);

      productosPagina.forEach(crearTarjetaProducto);
      actualizarPuntos();
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

    function crearTarjetaProducto(element) {
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

      tarjeta.className = "grid grid-rows-[250px_auto] lg:grid-rows-[400px_auto] gap-4";

      img.src = element.imagen;
      img.className = "w-full h-full object-cover";

      nombre.textContent = element.nombre;
      nombre.className = "text-sm md:text-base lg:text-lg font-bold mb-1";

      categoria.textContent = element.categoria;
      categoria.className = "text-xs md:text-base text-neutral-500 mb-1";

      precioAndLike.className = "flex justify-between items-center";

      precio.textContent = `$ ${element.precio}`;
      precio.className = "text-lg md:text-xl font-bold mb-4";

      const estaFavorito = favoritos.some(
        (fav) => fav.nombre === element.nombre
      );
      imgLike.src = estaFavorito
        ? "public/img/like2.svg"
        : "public/img/like1.svg";
      imgLike.className = "w-7 cursor-pointer";

      imgLike.addEventListener("click", () => {
        const estaActivo = imgLike.src.includes("like2.svg");
        if (estaActivo) {
          imgLike.src = "public/img/like1.svg";
          favoritos = favoritos.filter((p) => p.nombre !== element.nombre);
        } else {
          imgLike.src = "public/img/like2.svg";
          if (!favoritos.some((p) => p.nombre === element.nombre)) {
            favoritos.push(element);
          }
        }
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        renderizarFavoritos();
      });

      buttons.className =
        "flex items-center flex-col lg:flex-row gap-2 lg:gap-6";

      buttonCompra.textContent = "Comprar Ahora";
      buttonCompra.className =
        "border-2 px-2 py-1 font-bold rounded-lg w-full text-sm cursor-pointer";
      buttonCompra.setAttribute("x-on:click", "inicio = 'domicilio'");

      const comprarAhora = {
        nombre: element.nombre,
        categoria: element.categoria,
        precio: element.precio,
        imagen: element.imagen,
      };
      buttonCompra.addEventListener("click", () => {
        localStorage.setItem("producto", JSON.stringify(comprarAhora));
      });

      buttonAgregarCarrito.textContent = "Agregar Carrito";
      buttonAgregarCarrito.className =
        "bg-emerald-600 px-2 p-1 font-bold rounded-lg w-full text-sm cursor-pointer";
      buttonAgregarCarrito.addEventListener("click", () => {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const yaExiste = carrito.some((p) => p.nombre === element.nombre);
        if (!yaExiste) {
          carrito.push(element);
          localStorage.setItem("carrito", JSON.stringify(carrito));
          renderizarCarrito();
        } else {
          alert("Este producto ya está en el carrito.");
        }
      });

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
    }

    function activarBoton(btnActivo) {
      const botones = document.querySelectorAll(".filtro-btn");
      botones.forEach((btn) => {
        btn.classList.remove("border-b-2", "font-bold", "border-b-blue-700");
      });
      btnActivo.classList.add("border-b-2", "font-bold", "border-b-blue-700");
    }

    // Filtrar por categoría
    document.getElementById("btnNewArrival").addEventListener("click", (e) => {
      productosFiltrados = data.filter((p) => p.etiqueta === "NewArrival");
      paginaActual = 0;
      crearPuntos();
      mostrarPagina(paginaActual);
      activarBoton(e.target);
    });

    document.getElementById("btnBestSelling").addEventListener("click", (e) => {
      productosFiltrados = data.filter((p) => p.etiqueta === "BestSelling");
      paginaActual = 0;
      crearPuntos();
      mostrarPagina(paginaActual);
      activarBoton(e.target);
    });

    document.getElementById("btnTopRated").addEventListener("click", (e) => {
      productosFiltrados = data.filter((p) => p.etiqueta === "TopRated");
      paginaActual = 0;
      crearPuntos();
      mostrarPagina(paginaActual);
      activarBoton(e.target);
    });

    // Mostrar todo al inicio (por ejemplo, "New Arrival")
    productosFiltrados = data.filter((p) => p.etiqueta === "NewArrival");
    crearPuntos();
    mostrarPagina(paginaActual);
    renderizarFavoritos();
    renderizarCarrito();
    renderizarDireccion();
    renderizarTarjeta();
    vaciarCarrito();
    btnDescargarTicket();
  });

//Validacion formulario tarjetas
document.querySelector("#formTarjeta").addEventListener("submit", function (e) {
  e.preventDefault();

  const nuevaTarjeta = {
    nombre: document.querySelector("#nombreTitular").value,
    numero: document.querySelector("#numeroTarjeta").value,
  };

  const inputs = document.querySelectorAll(".inputs");
  let camposVacios = false;

  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      input.classList.add("border-red-800");
      camposVacios = true;
    } else {
      input.classList.remove("border-red-800");
    }
  });

  if (camposVacios) {
    document.querySelector("#alertTarjeta").classList.remove("hidden");
    return; // No continuar si hay campos vacíos
  }

  document.querySelector("#alertTarjeta").classList.add("hidden");

  // Obtenemos las tarjetas ya guardadas (o array vacío si no hay ninguna)
  const tarjetasGuardadas = JSON.parse(
    localStorage.getItem("tarjetas") || "[]"
  );

  // Agregamos la nueva tarjeta al array
  tarjetasGuardadas.push(nuevaTarjeta);

  // Guardamos el nuevo array en localStorage
  localStorage.setItem("tarjetas", JSON.stringify(tarjetasGuardadas));

  // Actualizamos la vista
  renderizarTarjeta();

  // Limpiamos el formulario
  e.target.reset();
});

//API codigo postal
fetch("codigosPostales.json")
  .then((res) => res.json())
  .then((data) => {
    document
      .querySelector("#codigoPostal")
      .addEventListener("input", function () {
        const cp = this.value.trim();
        const datos = data[cp];

        if (!datos && cp.length === 5) {
          alert("Código postal no encontrado");
          return;
        }

        // Completar los campos de estado, municipio y colonia
        document.querySelector("#estado").value = datos[0].estado;
        document.querySelector("#municipio").value = datos[0].municipio;

        // Llenar el select de colonia
        const selectColonia = document.querySelector("#colonia");
        selectColonia.innerHTML =
          "<option value=''>Selecciona colonia</option>";
        datos.forEach((info) => {
          selectColonia.innerHTML += `<option value="${info.colonia}">${info.colonia}</option>`;
        });
      });
  })
  .catch((error) => console.error("Error al cargar el archivo JSON:", error));

//validacion formulario direccion
document.querySelector("#formDireccion").addEventListener("submit", (e) => {
  e.preventDefault();

  const nuevaDireccion = {
    direccion: document.querySelector("#direccionEntrega").value,
    estado: document.querySelector("#estado").value,
  };

  const inputs = document.querySelectorAll(".campos");
  const alertDireccion = document.querySelector("#alertDireccion");

  let hayVacios = false;

  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      input.classList.add("border-red-800");
      hayVacios = true;
    } else {
      input.classList.remove("border-red-800");
    }
  });

  if (hayVacios) {
    alertDireccion.classList.remove("hidden");
    alertDireccion.classList.add("block");
    return;
  }

  alertDireccion.classList.remove("block");
  alertDireccion.classList.add("hidden");

  // Obtenemos las direcciones ya guardadas (o array vacío si no hay ninguna)
  const direccionesGuardadas = JSON.parse(
    localStorage.getItem("direccion") || "[]"
  );

  // Agregamos la nueva direccion al array
  direccionesGuardadas.push(nuevaDireccion);

  // Guardamos el nuevo array en localStorage
  localStorage.setItem("direccion", JSON.stringify(direccionesGuardadas));

  renderizarDireccion();

  // Limpiamos el formulario
  e.target.reset();
});

// Generar ticket
document.getElementById("btn-generar-ticket").addEventListener("click", generarTicket);

