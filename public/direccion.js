export function renderizarDireccion(){
    const direccion = JSON.parse(localStorage.getItem('direccion') || []);
    const resultado = JSON.parse(localStorage.getItem('resultado') || []);
    const container = document.querySelector("#containerDireccion");

    container.innerHTML = '';

    if(direccion.length === 0){
        container.innerHTML = `<p class="text-gray-500">No hay tarjetas guardadas.</p>`;
        return
    }

    direccion.forEach((element, index) => {
        const containerDireccion = document.createElement('div');
        containerDireccion.className = 'flex items-center justify-between bg-white px-4 py-2 rounded-lg shadow mb-4';

        const infoDireccion = document.createElement('div');
        infoDireccion.className = 'flex items-center gap-6';

        const info = document.createElement('div');
        info.className = 'flex flex-col items-start gap-2';

        const inputs = document.createElement('input');
        inputs.type = 'radio';
        inputs.name = 'direcciones';

        const titleDomicilio = document.createElement('p');
        titleDomicilio.textContent = 'Enviar (Domicilio)';
        titleDomicilio.className = 'text-sm md:text-xl font-bold';

        const direccionEnviar = document.createElement('p');
        direccionEnviar.innerHTML = `${element.direccion} <br> ${element.estado}`;
        direccionEnviar.className = 'text-xs md:text-sm';

        const precioEnvio = document.createElement('p');
        precioEnvio.textContent = `$ ${resultado.envios.toFixed(2)}`;
        precioEnvio.className = "text-sm md:text-xl text-green-600 md:pe-10 font-semibold";

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.className = 'text-red-600 font-bold text-xs md:text-sm';
        btnEliminar.addEventListener("click", () => eliminarDireccion(index));

        infoDireccion.appendChild(inputs);
        info.appendChild(titleDomicilio);
        info.appendChild(direccionEnviar);
        info.appendChild(btnEliminar);
        infoDireccion.appendChild(info);
        containerDireccion.appendChild(infoDireccion);
        containerDireccion.appendChild(precioEnvio);
        container.appendChild(containerDireccion);
    });
}

function eliminarDireccion(index) {
    const direccion = JSON.parse(localStorage.getItem('direccion') || '[]');
    direccion.splice(index, 1); // Eliminar la tarjeta por su índice
    localStorage.setItem('direccion', JSON.stringify(direccion));
    renderizarDireccion(); // Volver a mostrar las tarjetas
  }