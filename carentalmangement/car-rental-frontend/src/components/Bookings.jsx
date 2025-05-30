import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Bookings.css';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/user/bookings')
      .then(res => setBookings(res.data))
      .catch(err => console.error(err));

    axios.get('http://localhost:3000/admin/cars')
      .then(res => setCars(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bookings-container">
      <h2 className="section-title">📋 All Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map(b => (
          <div key={b._id} className="booking-entry">
            <strong>{b.userName}</strong> booked <em>{b.car.name}</em> on {new Date(b.bookingDate).toLocaleString()}
          </div>
        ))
      )}

      <hr />

      <h2 className="section-title">🚘 All Cars</h2>
      <div className="car-grid">
        {cars.length === 0 ? (
          <p>No cars found.</p>
        ) : (
          cars.map(car => (
            <div key={car._id} className="car-card">
              <img src={car.imageUrl} alt={car.name} />
              <h4>{car.name}</h4>
              <p>Type: {car.type}</p>
              <p>Available from: {new Date(car.availableFrom).toLocaleDateString()}</p>
              <p className={`car-status ${car.available ? 'available' : 'booked'}`}>
                Status: {car.available ? 'Available' : 'Booked'}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Bookings;
