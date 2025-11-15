import React, { useMemo } from 'react';
import '../styles/Login.css';

const makeRandomRow = (i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  value: (Math.random() * 1000).toFixed(2),
  date: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30)).toLocaleDateString()
});

const Dashboard = () => {
  const rows = useMemo(() => Array.from({ length: 8 }).map((_, i) => makeRandomRow(i)), []);

  return (
    <main style={{ padding: 24 }}>
      <h2 style={{ margin: '6px 0 12px', color: 'var(--text, #111)' }}>Panel</h2>
      <p style={{ margin: '0 0 18px', color: 'var(--muted, #666)' }}>Tabla de información aleatoria</p>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Nombre</th>
              <th style={thStyle}>Valor</th>
              <th style={thStyle}>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                <td style={tdStyle}>{r.id}</td>
                <td style={tdStyle}>{r.name}</td>
                <td style={tdStyle}>${r.value}</td>
                <td style={tdStyle}>{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

const thStyle = {
  textAlign: 'left',
  padding: '10px 12px',
  fontSize: 14,
  color: 'var(--muted, #666)'
};

const tdStyle = {
  padding: '12px',
  fontSize: 14,
  color: 'var(--text, #111)'
};

export default Dashboard;
