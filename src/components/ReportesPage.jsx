import Searcher from "./Searcher";
import ReporteDetalle from "./ReporteDetalle.jsx";
import { useState } from "react";
import { useEffect } from "react";
const REPORTES_STORAGE_KEY = "reportesPendientes_v1";

async function fetchReportesPendientes() {
  try {
    // El endpoint espera una solicitud POST; enviamos un body vacío JSON como payload mínimo
    const res = await fetch(
      "https://ucudigital.onrender.com/api/reportesPendientes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    // Normaliza la respuesta para guardar siempre un array en localStorage
    const reportesArray = Array.isArray(data) ? data : data?.reportes || [];

    localStorage.setItem(REPORTES_STORAGE_KEY, JSON.stringify(reportesArray));

    // Notifica a la aplicación que hay datos nuevos (opcional, los componentes pueden escucharlo)
    window.dispatchEvent(
      new CustomEvent("reportesPendientes:updated", { detail: reportesArray })
    );

    return reportesArray;
  } catch (error) {
    console.error("Error fetching reportes pendientes:", error);
    return null;
  }
}

// Ejecuta la consulta al cargar la página y también intenta inmediatamente
if (typeof window !== "undefined") {
  // Si el evento load aún no ocurrió, lo ejecutamos una vez al producirse
  window.addEventListener("load", fetchReportesPendientes, { once: true });
  // También intentamos ahora (cubre entornos donde el módulo se importa después del load)
  setTimeout(fetchReportesPendientes, 0);
}

// Hook opcional para que componentes React puedan usar los datos y actualizarse al evento
export function useReportesPendientes() {
  const [reportesPendientes, setReportesPendientes] = (function () {
    // Evitar repetir imports del usuario: usamos useEffect importado arriba y devolvemos un par compatible con useState
    // Aquí devolvemos funciones que permiten integrarlo fácilmente dentro del componente existente si decide cambiar.
    const stateRef = {
      value:
        JSON.parse(localStorage.getItem(REPORTES_STORAGE_KEY) || "null") ||
        null,
    };
    function get() {
      return stateRef.value;
    }
    function set(v) {
      stateRef.value = v;
      localStorage.setItem(REPORTES_STORAGE_KEY, JSON.stringify(v));
      window.dispatchEvent(
        new CustomEvent("reportesPendientes:updated", { detail: v })
      );
    }
    return [get, set];
  })();

  useEffect(() => {
    // Actualiza localStorage si aún no hay datos
    const current = JSON.parse(
      localStorage.getItem(REPORTES_STORAGE_KEY) || "null"
    );
    if (!current || !Array.isArray(current) || current.length === 0) {
      fetchReportesPendientes().then((fetched) => {
        if (fetched) {
          // set localStorage and notify
          localStorage.setItem(REPORTES_STORAGE_KEY, JSON.stringify(fetched));
          window.dispatchEvent(
            new CustomEvent("reportesPendientes:updated", { detail: fetched })
          );
        }
      });
    }
    // No hay cleanup necesario
  }, []);

  return {
    storageKey: REPORTES_STORAGE_KEY,
    fetchReportesPendientes,
    // Lectura directa desde localStorage para integrarse sin cambiar mucho el componente
    getAll: () =>
      JSON.parse(localStorage.getItem(REPORTES_STORAGE_KEY) || "[]"),
  };
}
function ReportesPage() {
  const [reportes, setReportes] = useState([]);
  const [allReportes, setAllReportes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [reporteSeleccionado, setReporteSeleccionado] = useState(null);

  useEffect(() => {
    let mounted = true;

    setLoading(true);
    setError(null);

    fetchReportesPendientes()
      .then((data) => {
        if (!mounted) return;
        let list = [];
        if (data && Array.isArray(data)) {
          list = data;
        } else if (data && data.reportes && Array.isArray(data.reportes)) {
          list = data.reportes;
        } else {
          // Intentar cargar desde localStorage como fallback
          const fromStorage = JSON.parse(
            localStorage.getItem(REPORTES_STORAGE_KEY) || "[]"
          );
          list = Array.isArray(fromStorage) ? fromStorage : [];
        }
        setAllReportes(list);
        setReportes(list);
      })
      .catch((err) => {
        console.error("Error cargando reportes pendientes:", err);
        if (mounted) setError(err.message || String(err));
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    const handleUpdate = (e) => {
      const updated =
        e?.detail ??
        JSON.parse(localStorage.getItem(REPORTES_STORAGE_KEY) || "[]");
      const list = Array.isArray(updated) ? updated : [];
      setAllReportes(list);
      setReportes(list);
    };

    window.addEventListener("reportesPendientes:updated", handleUpdate);

    return () => {
      mounted = false;
      window.removeEventListener("reportesPendientes:updated", handleUpdate);
    };
  }, []);

  // Filtrar reportes usando la lista completa en memoria (o localStorage como fallback)
  const handleFilter = (filters) => {
    const { tipo, estado, fecha } = filters || {};
    const source =
      allReportes && allReportes.length
        ? allReportes
        : JSON.parse(localStorage.getItem(REPORTES_STORAGE_KEY) || "[]");

    // Si no hay filtros, mostrar todo
    const noFilters = !tipo && !estado && !fecha;
    if (noFilters) {
      setReportes(source);
      return;
    }

    const filtered = source.filter((r) => {
      // Filtrar por tipo si se indicó
      if (tipo && String(r.tipo).toLowerCase() !== String(tipo).toLowerCase())
        return false;

      // Filtrar por estado: buscamos el valor exacto 'pendiente' o 'realizado'
      if (estado) {
        const estadoLower = String(estado).toLowerCase();
        const rEstado = String(r.estado || "").toLowerCase();
        if (estadoLower === "pendiente") {
          if (rEstado !== "pendiente") return false;
        } else if (estadoLower === "realizado") {
          if (rEstado !== "realizado") return false;
        } else {
          // Soporta coincidencia textual por si llegan otros valores
          if (!rEstado.includes(estadoLower)) return false;
        }
      }

      if (fecha) {
        // fecha del filtro viene en formato yyyy-mm-dd; intentamos comparar con formatos dd/mm o ISO
        const sel = new Date(fecha);
        if (!isNaN(sel.getTime())) {
          const selDayMonth = `${String(sel.getDate()).padStart(
            2,
            "0"
          )}/${String(sel.getMonth() + 1).padStart(2, "0")}`;
          const rFecha = String(r.fecha || "");
          if (!rFecha.includes(selDayMonth) && !rFecha.includes(fecha))
            return false;
        }
      }

      return true;
    });

    setReportes(filtered);
  };

  const getEstadoLabel = (estado) => {
    const labels = {
      recibido: "Recibido",
      "en-proceso": "En proceso",
      finalizado: "Finalizado",
    };
    return labels[estado] || estado;
  };

  const getEstadoColor = (estado) => {
    switch (String(estado)) {
      case "recibido":
        return "#dc3545"; // rojo
      case "en-proceso":
        return "#ffc107"; // amarillo/naranja
      case "finalizado":
        return "#28a745"; // verde
      default:
        return "#6c757d"; // gris por defecto
    }
  };

  const handleEstadoChange = (reporteId, nuevoEstado) => {
    // Actualiza tanto la colección filtrada como la colección completa (allReportes)
    setReportes((prevReportes) =>
      prevReportes.map((reporte) =>
        reporte.id === reporteId ? { ...reporte, estado: nuevoEstado } : reporte
      )
    );

    setAllReportes((prevAll) => {
      const updated = prevAll.map((reporte) =>
        reporte.id === reporteId ? { ...reporte, estado: nuevoEstado } : reporte
      );
      try {
        localStorage.setItem(REPORTES_STORAGE_KEY, JSON.stringify(updated));
        window.dispatchEvent(
          new CustomEvent("reportesPendientes:updated", { detail: updated })
        );
      } catch (err) {
        console.warn("No se pudo persistir el cambio en localStorage:", err);
      }
      return updated;
    });

    setReporteSeleccionado((prev) =>
      prev ? { ...prev, estado: nuevoEstado } : null
    );
  };

  return (
    <div className="reportes-page">
      <div className="reportes-header">
        <h1>Gestión de Reportes</h1>
        <p>Administra y da seguimiento a los reportes ciudadanos</p>
      </div>

      <div className="reportes-content">
        <div className="filtros-section">
          <div className="filtros-header">
            <h2>Filtros</h2>
          </div>
          <Searcher onSearch={handleFilter} />
        </div>

        <div className="reportes-table-section">
          <div className="table-wrapper">
            <table className="reportes-table">
              <thead>
                <tr>
                  <th>Folio</th>
                  <th>Tipo</th>
                  <th>Descripción</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {reportes.map((reporte, index) => (
                  <tr key={index}>
                    <td data-label="Folio">{reporte.id}</td>
                    <td data-label="Tipo">
                      <span
                        className="tipo-badge"
                        style={{ backgroundColor: reporte.color }}
                      ></span>
                      {reporte.tipo}
                    </td>
                    <td data-label="Descripción">{reporte.descripcion}</td>
                    <td data-label="Estado">
                      <span
                        className="estado-badge"
                        style={{
                          backgroundColor: getEstadoColor(reporte.estado),
                          color:
                            reporte.estado === "en-proceso" ? "#222" : "#fff",
                        }}
                      >
                        {getEstadoLabel(reporte.estado)}
                      </span>
                    </td>
                    <td data-label="Fecha">{reporte.fecha}</td>
                    <td data-label="Acción">
                      <button
                        className="btn-ver-detalles"
                        onClick={() => setReporteSeleccionado(reporte)}
                        title="Ver detalles del reporte"
                      >
                        Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {reporteSeleccionado && (
        <ReporteDetalle
          reporte={reporteSeleccionado}
          onClose={() => setReporteSeleccionado(null)}
          onEstadoChange={handleEstadoChange}
        />
      )}
    </div>
  );
}

export default ReportesPage;
