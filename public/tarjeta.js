export function renderizarTarjeta() {
    const tarjetas = JSON.parse(localStorage.getItem('tarjetas') || '[]');
    const container = document.querySelector("#containerTarjetas");
  
    container.innerHTML = '';
  
    if (tarjetas.length === 0) {
      container.innerHTML = `<p class="text-gray-500">No hay tarjetas guardadas.</p>`;
      return;
    }
  
    tarjetas.forEach((tarjeta, index) => {
      const containerTarjeta = document.createElement("div");
      containerTarjeta.className = 'flex items-center justify-between bg-white px-4 py-2 rounded-lg shadow mb-4';
  
      const infoTarjeta = document.createElement("div");
      infoTarjeta.className = 'flex items-center gap-2 md:gap-6';

      const info = document.createElement("div");
      info.className = 'flex flex-col items-start gap-2'
  
      const inputs = document.createElement("input");
      inputs.type = 'radio';
      inputs.name = 'tarjetas';
  
      const imgTarjeta = document.createElement("img");
      imgTarjeta.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiMwODkxYjIiIGQ9Ik0xNy42NzkgMjEuMjg5cS0xLjgxMiAwLTMuMDcyLTEuMjQ5cS0xLjI2LTEuMjQ4LTEuMjYtMy4wNnQxLjI2LTMuMDY5dDMuMDcyLTEuMjU3cTEuODA2IDAgMy4wNTQgMS4yNnQxLjI0OCAzLjA2N3QtMS4yNDggMy4wNTd0LTMuMDU0IDEuMjVNNCAxOHYtNy42OTJ2LjQ3OVY2em0wLTkuMTkyaDE2VjYuNjE2cTAtLjIzMS0uMTkyLS40MjRUMTkuMzg1IDZINC42MTVxLS4yMyAwLS40MjMuMTkyVDQgNi42MTZ6TTQuNjE1IDE5cS0uNjkgMC0xLjE1My0uNDYyVDMgMTcuMzg0VjYuNjE2cTAtLjY5MS40NjMtMS4xNTNUNC42MTUgNWgxNC43N3EuNjkgMCAxLjE1Mi40NjNUMjEgNi42MTZ2My42MDNxMCAuMzczLS4zMDEuNTQ3dC0uNjQ5LjAzMnEtLjU3My0uMjQyLTEuMjA1LS4zNjZ0LTEuMzEtLjEyNHEtLjg2OCAwLTEuNjY5LjIzcS0uOC4yMy0xLjQ4Mi42NTRINHY2LjE5M3EwIC4yMy4xOTIuNDIzdC40MjMuMTkyaDYuMTUycS4yMTQgMCAuMzU3LjE0M3QuMTQzLjM1N3QtLjE0My4zNTd0LS4zNTcuMTQzem0xMy40NDMtMi4xOHYtMi4zNnEwLS4xNjEtLjExMi0uMjcycS0uMTExLS4xMTItLjI3My0uMTEydC0uMjczLjExMXQtLjExMS4yNzN2Mi4zNTJxMCAuMTYyLjA1NS4zMDFxLjA1Ni4xNC4xODcuMjdsMS42MDIgMS42MDJxLjExMS4xMTIuMjYzLjEyMnQuMjgzLS4xMjJ0LjEzLS4yNzN0LS4xMy0uMjczeiIvPjwvc3ZnPg==';
      imgTarjeta.className = 'w-10 h-10';
  
      const nombreTarjeta = document.createElement("p");
      nombreTarjeta.className = 'font-bold text-sm md:text-xl'
      nombreTarjeta.textContent = tarjeta.nombre;
  
      const numeroTarjeta = document.createElement("p");
      const ultimos4 = tarjeta.numero.slice(-4);
      const oculto = '**** **** **** ' + ultimos4;
      numeroTarjeta.textContent = oculto;
      numeroTarjeta.className = 'font-bold text-xs md:text-base'

      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "Eliminar";
      btnEliminar.className = 'text-red-600 font-bold text-xs md:text-sm';
      btnEliminar.addEventListener("click", () => eliminarTarjeta(index));
  
      const bancoTarjeta = document.createElement("p");
      bancoTarjeta.textContent = 'Débito';
      bancoTarjeta.className = 'font-bold text-sm md:text-base text-emerald-600'
  
      infoTarjeta.appendChild(inputs);
      info.appendChild(nombreTarjeta);
      info.appendChild(numeroTarjeta);
      info.appendChild(btnEliminar)
      infoTarjeta.appendChild(imgTarjeta);
      infoTarjeta.appendChild(info)
      containerTarjeta.appendChild(infoTarjeta);
      containerTarjeta.appendChild(bancoTarjeta);
      container.appendChild(containerTarjeta);
    });
  }
  

  function eliminarTarjeta(index) {
    const tarjetas = JSON.parse(localStorage.getItem('tarjetas') || '[]');
    tarjetas.splice(index, 1); // Eliminar la tarjeta por su índice
    localStorage.setItem('tarjetas', JSON.stringify(tarjetas));
    renderizarTarjeta(); // Volver a mostrar las tarjetas
  }
  