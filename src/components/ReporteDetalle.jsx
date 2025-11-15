import "../styles/ReporteDetalle.css";
import { useState } from "react";
import html2pdf from "html2pdf.js";
// /* eslint-disable react/prop-types */

function ReporteDetalle({ reporte, onClose, onEstadoChange }) {
  const [estadoEditando, setEstadoEditando] = useState(reporte.estado);
  const [mostrarConfirm, setMostrarConfirm] = useState(false);

  const categorias = {
    inundacion: "Inundación",
    bache: "Bache",
    servicioElectrico: "Servicio Eléctrico",
    servicioPotable: "Servicio Potable",
  };

  const estadosDisponibles = [
    { value: "recibido", label: "Recibido", color: "#dc3545" },
    { value: "en-proceso", label: "En proceso", color: "#ffc107" },
    { value: "finalizado", label: "Finalizado", color: "#28a745" },
  ];

  const handleDescargarPDF = async () => {
    const original = document.getElementById("reporte-pdf-content");
    if (!original) return;

    // Clonar el contenido para evitar problemas de overlay/estilos y asegurar visibilidad
    const clone = original.cloneNode(true);

    // Convertir imágenes externas a data URLs para evitar problemas CORS con html2canvas
    const imgs = Array.from(clone.querySelectorAll("img"));
    await Promise.all(
      imgs.map(async (img) => {
        try {
          // si ya es data URL, saltar
          if (!img.src || img.src.startsWith("data:")) return;
          const res = await fetch(img.src, { mode: "cors" });
          const blob = await res.blob();
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              img.src = reader.result;
              resolve(true);
            };
            reader.onerror = () => resolve(false);
            reader.readAsDataURL(blob);
          });
        } catch (err) {
          // Si no se puede convertir, ocultar la imagen para no romper el canvas
          img.remove();
        }
      })
    );

    // Crear contenedor temporal fuera de la vista para renderizar el PDF correctamente
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.left = "-9999px";
    container.style.top = "0";
    container.style.background = "white";
    container.appendChild(clone);
    document.body.appendChild(container);

    // Opciones mejoradas para html2pdf/html2canvas
    const opt = {
      margin: [10, 10, 10, 10],
      filename: `reporte_${reporte.id}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, allowTaint: false },
      jsPDF: { orientation: "portrait", unit: "mm", format: "a4" },
    };

    try {
      // esperar un poco para asegurar que todos los recursos carguen en el clon
      await new Promise((r) => setTimeout(r, 350));
      await html2pdf().set(opt).from(clone).save();
    } catch (err) {
      console.error("Error generando PDF:", err);
      alert("Error al generar el PDF. Revisa consola.");
    } finally {
      // limpiar
      document.body.removeChild(container);
    }
  };

  const handleGuardarEstado = () => {
    if (estadoEditando !== reporte.estado) {
      onEstadoChange(reporte.id, estadoEditando);
      setMostrarConfirm(false);
    } else {
      setMostrarConfirm(false);
    }
  };

  const estadoActual = estadosDisponibles.find(
    (e) => e.value === estadoEditando
  );

  return (
    <div className="reporte-detalle-overlay" onClick={onClose}>
      <div className="reporte-detalle-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="reporte-detalle-header">
          <div className="reporte-detalle-titulo">
            <h2>Detalle del Reporte</h2>
            <span className="reporte-folio">Folio: {reporte.id}</span>
          </div>
          <button className="btn-cerrar" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Contenido para PDF */}
        <div id="reporte-pdf-content" className="reporte-contenido">
          <div className="pdf-header">
            <div className="pdf-logo">X</div>
            <div className="reporte-detalle-titulo">
              <h2>Municipio de XuxCu — Detalle de Reporte</h2>
              <span className="reporte-folio">Folio: {reporte.id}</span>
            </div>
          </div>

          <div className="reporte-info-principal">
            <div className="info-grid">
              <div className="info-item">
                <label>Folio</label>
                <p>{reporte.id}</p>
              </div>
              <div className="info-item">
                <label>Categoría</label>
                <p>{categorias[reporte.tipo] || reporte.tipo}</p>
              </div>
              <div className="info-item">
                <label>Fecha de Reporte</label>
                <p>{reporte.fecha}</p>
              </div>
              <div className="info-item">
                <label>Estado</label>
                <p>{estadosDisponibles.find((e) => e.value === reporte.estado)?.label}</p>
              </div>
            </div>
          </div>

          <div className="reporte-datos-ciudadano">
            <h3>Datos del Ciudadano</h3>
            <div className="datos-grid">
              <div className="dato-item">
                <label>Nombre</label>
                <p>{reporte.nombre}</p>
              </div>
              <div className="dato-item">
                <label>Apellido</label>
                <p>{reporte.apellido}</p>
              </div>
              <div className="dato-item">
                <label>Correo</label>
                <p>{reporte.correo}</p>
              </div>
              <div className="dato-item">
                <label>Teléfono</label>
                <p>{reporte.telefono}</p>
              </div>
            </div>
          </div>

          <div className="reporte-ubicacion">
            <h3>Ubicación del Reporte</h3>
            <div className="ubicacion-grid">
              <div className="ubicacion-item">
                <label>Latitud</label>
                <p>{reporte.lat}</p>
              </div>
              <div className="ubicacion-item">
                <label>Longitud</label>
                <p>{reporte.lng}</p>
              </div>
            </div>
            <div className="mapa-placeholder">
              <p>📍 Ubicación: ({reporte.lat}, {reporte.lng})</p>
            </div>
          </div>

          <div className="reporte-descripcion">
            <h3>Descripción del Problema</h3>
            <div className="descripcion-texto">
              <p>{reporte.descripcion}</p>
            </div>
          </div>

        </div>

        {/* Acciones */}
        <div className="reporte-detalle-acciones">
          <div className="estado-editor">
            <label>Cambiar Estado</label>
            <select
              value={estadoEditando}
              onChange={(e) => setEstadoEditando(e.target.value)}
              className="estado-select"
            >
              {estadosDisponibles.map((estado) => (
                <option key={estado.value} value={estado.value}>
                  {estado.label}
                </option>
              ))}
            </select>
          </div>

          <div className="botones-acciones">
            <button
              className="btn-descargar-pdf"
              onClick={handleDescargarPDF}
              title="Descargar reporte en PDF"
            >
              📥 Descargar PDF
            </button>
            <button
              className="btn-guardar"
              onClick={() => setMostrarConfirm(true)}
              disabled={estadoEditando === reporte.estado}
            >
              💾 Guardar Cambios
            </button>
            <button className="btn-cancelar" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>

        {/* Modal de confirmación */}
        {mostrarConfirm && (
          <div className="confirmacion-modal" onClick={() => setMostrarConfirm(false)}>
            <div className="confirmacion-contenido" onClick={(e) => e.stopPropagation()}>
              <h3>Confirmar cambio de estado</h3>
              <p>
                ¿Deseas cambiar el estado a <strong>{estadoActual?.label}</strong>?
              </p>
              <div className="confirmacion-botones">
                <button
                  className="btn-confirmar"
                  onClick={handleGuardarEstado}
                >
                  Confirmar
                </button>
                <button
                  className="btn-cancelar-confirm"
                  onClick={() => setMostrarConfirm(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReporteDetalle;
