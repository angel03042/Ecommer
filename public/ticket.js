export function generarTicket() {
    // Obtener fecha y hora
    const fecha = new Date();
  
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const año = fecha.getFullYear();
  
    const horas = fecha.getHours();
    const minutos = String(fecha.getMinutes()).padStart(2, '0');
    const ampm = horas >= 12 ? 'PM' : 'AM';
    const hora12 = String(horas % 12 || 12).padStart(2, '0');
  
    // Asignar valores
    document.getElementById("fecha").textContent = `${dia}/${mes}/${año}`;
    document.getElementById("hora").textContent = `${hora12}:${minutos} ${ampm}`;
  
    // Folio incremental
    let folio = localStorage.getItem("ultimoFolio") || 0;
    folio++;
    localStorage.setItem("ultimoFolio", folio);
    document.getElementById("folio").textContent = folio.toString().padStart(6, '0');

    // Llamar los productos en el carrito
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const resultado = JSON.parse(localStorage.getItem('resultado') || []);

    // contenedor de los productos
    const container = document.querySelector("#container_product_shop");

    // asignacion de los precio totales
    document.querySelector("#Subtotal").textContent = `$ ${resultado.priceProduct.toFixed(2)}`;
    document.querySelector("#envioProduct").textContent = `$ ${resultado.envios.toFixed(2)}`;
    document.querySelector("#total").textContent = `$ ${resultado.resultadoFinal.toFixed(2)}`;

    // limpiar el contenedor por cada compra
    container.innerHTML = '';

    // mostrar los productos comprados
    carrito.forEach(element => {
        const divProduct = document.createElement("div");
        divProduct.className = 'grid grid-cols-5'

        const divNameCategory = document.createElement("div");
        divNameCategory.className = 'col-span-3';

        const nameproduct = document.createElement("p");
        nameproduct.textContent = element.nombre;
        nameproduct.className = 'font-bold text-base'

        const category = document.createElement("p");
        category.textContent = element.categoria;
        category.className = 'text-sm'

        const numberProduct = document.createElement("p");
        numberProduct.textContent = element.cantidad || 1;
        numberProduct.className = 'text-center';

        const priceProducto = document.createElement("p");
        priceProducto.textContent = `$ ${((element.cantidad || 1) * element.precio).toFixed(2)}`;
        priceProducto.className = 'text-end';

        divNameCategory.appendChild(nameproduct);
        divNameCategory.appendChild(category);
        divProduct.appendChild(divNameCategory);
        divProduct.appendChild(numberProduct);
        divProduct.appendChild(priceProducto);
        container.appendChild(divProduct);
    });


}
  