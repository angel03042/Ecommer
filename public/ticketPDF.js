export function descargarTicketPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Encabezado
  doc.setFontSize(22);
  doc.text("RopsMart", 105, 20, { align: "center" });

  doc.setFontSize(16);
  doc.text("Ticket De Compra", 105, 30, { align: "center" });

  // Fecha, hora, folio
  const fecha = document.getElementById("fecha").textContent;
  const hora = document.getElementById("hora").textContent;
  const folio = document.getElementById("folio").textContent;
  const usuario = "Usuario genérico"; // Puedes cambiarlo dinámicamente

  doc.setFontSize(12);
  doc.text(`Fecha: ${fecha}`, 20, 45);
  doc.text(`Hora: ${hora}`, 20, 52);
  doc.text(`Folio: ${folio}`, 20, 59);
  doc.text(`Usuario: ${usuario}`, 20, 66);

  // Productos
  doc.text("Productos", 20, 78);
  doc.setLineWidth(0.5);
  doc.line(20, 80, 190, 80); // línea horizontal

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let y = 90;
  carrito.forEach((item) => {
    const nombre = item.nombre;
    const categoria = item.categoria;
    const cantidad = item.cantidad || 1;
    const precio = `$ ${(item.precio * cantidad).toFixed(2)}`;

    doc.text(`${nombre} (${categoria})`, 20, y);
    doc.text(`x${cantidad}`, 140, y);
    doc.text(precio, 170, y, { align: "right" });
    y += 8;
  });

  // Totales
  const resultado = JSON.parse(localStorage.getItem("resultado") || "{}");
  const subtotal = `$ ${(resultado.priceProduct || 0).toFixed(2)}`;
  const envio = `$ ${(resultado.envios || 0).toFixed(2)}`;
  const total = `$ ${(resultado.resultadoFinal || 0).toFixed(2)}`;

  y += 10;
  doc.line(20, y, 190, y);
  y += 8;
  doc.text(`Subtotal:`, 140, y);
  doc.text(subtotal, 190, y, { align: "right" });

  y += 8;
  doc.text(`Envío:`, 140, y);
  doc.text(envio, 190, y, { align: "right" });

  y += 8;
  doc.setFontSize(14);
  doc.text(`Total:`, 140, y);
  doc.text(total, 190, y, { align: "right" });

  // Guardar PDF
  doc.save(`RopsMart_${folio}.pdf`);
}



export function btnDescargarTicket(){
    document.getElementById("descargarTicket").addEventListener("click", () => {
    descargarTicketPDF();
    });
}



  