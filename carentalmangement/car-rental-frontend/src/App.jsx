import React, { useState } from 'react';
import Admin from './components/Admin';
import Cars from './components/Cars';
import Bookings from './components/Bookings';

function App() {
  const [page, setPage] = useState('cars');

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <nav style={{ background: '#333', color: '#fff', padding: '10px 20px' }}>
        <h1 style={{ display: 'inline-block', marginRight: '30px' }}>🚗 Car Rental</h1>
        <button onClick={() => setPage('admin')} style={navButtonStyle}>Admin</button>
        <button onClick={() => setPage('cars')} style={navButtonStyle}>Cars</button>
        <button onClick={() => setPage('bookings')} style={navButtonStyle}>Bookings</button>
      </nav>

      <div style={{ padding: '20px' }}>
        {page === 'admin' && <Admin />}
        {page === 'cars' && <Cars />}
        {page === 'bookings' && <Bookings />}
      </div>
    </div>
  );
}

const navButtonStyle = {
  background: 'transparent',
  border: 'none',
  color: '#fff',
  fontSize: '16px',
  marginRight: '20px',
  cursor: 'pointer'
};

export default App;
