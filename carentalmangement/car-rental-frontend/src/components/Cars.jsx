import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cars.css';

function Cars() {
  const [cars, setCars] = useState([]);
  const [userName, setUserName] = useState('');
  const [inputName, setInputName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      axios.get('http://localhost:3000/admin/cars')
        .then(res => setCars(res.data))
        .catch(err => console.error(err));
    }
  }, [isLoggedIn]);

  const login = () => {
    if (inputName === 'sumeet' && password === 'password') {
      setUserName(inputName);
      setIsLoggedIn(true);
    } else {
      alert('Incorrect username or password');
    }
  };

  const openPayment = (car) => {
    if (!car.available) return alert('This car is already booked.');
    setSelectedCar(car);
    setShowPayment(true);
  };

  const confirmPayment = async () => {
    try {
      await axios.post(`http://localhost:3000/user/book/${selectedCar._id}`, { userName });
      alert('Payment successful! Car booked!');
      setShowPayment(false);
      setSelectedCar(null);
      const res = await axios.get('http://localhost:3000/admin/cars');
      setCars(res.data);
    } catch (err) {
      console.error(err);
      alert('Booking failed');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <h2>👤 User Login</h2>
        <input placeholder="Username" value={inputName} onChange={e => setInputName(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={login}>Login</button>
      </div>
    );
  }

  return (
    <div className="cars-container">
      <h2>🚘 All Cars</h2>
      <p>Welcome, {userName}!</p>
      <div className="car-grid">
        {cars.length === 0 ? (
          <p>No cars available</p>
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
              <button
                onClick={() => openPayment(car)}
                disabled={!car.available}
              >
                {car.available ? 'Book' : 'Unavailable'}
              </button>
            </div>
          ))
        )}
      </div>

      {showPayment && selectedCar && (
        <div className="modal">
          <div className="modal-content">
            <h3>💳 Payment</h3>
            <p>Car: <strong>{selectedCar.name}</strong></p>
            <p>Rent: ₹{selectedCar.rent || 500}</p>
            <input placeholder="Card Number " />
            <input placeholder="Expiry" />
            <input placeholder="CVV" />
            <button onClick={confirmPayment}>Confirm Payment</button>
            <button onClick={() => setShowPayment(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cars;
