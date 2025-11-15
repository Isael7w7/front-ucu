import "../styles/Searcher.css";
import { useState } from "react";

function Searcher() {
  const [filters, setFilters] = useState({
    tipo: "",
    estado: "",
    fecha: "",
    sarca: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Filtros aplicados:", filters);
  };

  return (
    <div className="searcher-container">
      <form className="filtros-form" onSubmit={handleSearch}>
        <div className="filtros-row">
          <div className="filter-group">
            <select
              name="tipo"
              value={filters.tipo}
              onChange={handleChange}
              className="filter-select"
            >
              <option value="">Tipo</option>
              <option value="inundacion">Inundación</option>
              <option value="bache">Bache</option>
              <option value="luminaria">Luminaria Dañada</option>
              <option value="fuga">Fuga de Agua</option>
            </select>
          </div>

          <div className="filter-group">
            <input
              type="text"
              name="estado"
              placeholder="Estado"
              value={filters.estado}
              onChange={handleChange}
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <input
              type="date"
              name="fecha"
              value={filters.fecha}
              onChange={handleChange}
              className="filter-input"
            />
          </div>
        </div>

        <div className="filtros-row">
          <div className="filter-group search-group">
            <svg className="search-icon" aria-hidden="true" viewBox="0 0 24 24">
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>
            <input
              type="text"
              name="sarca"
              placeholder="Buscar"
              value={filters.sarca}
              onChange={handleChange}
              className="filter-input"
            />
          </div>

          <button type="submit" className="btn-buscar">
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Searcher;