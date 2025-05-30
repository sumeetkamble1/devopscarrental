import React, { useState } from 'react';
import axios from 'axios';
import './Admin.css';

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [type, setType] = useState('');
  const [availableFrom, setAvailableFrom] = useState('');
  const [availableFromTime, setAvailableFromTime] = useState('');
  const [availableToTime, setAvailableToTime] = useState('');
  const [rent, setRent] = useState('');

  const login = () => {
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
    } else {
      alert('Incorrect username or password');
    }
  };

  const addCar = async () => {
    if (!name || !imageUrl || !type || !availableFrom || !availableFromTime || !availableToTime || !rent) {
      alert('Please fill all fields');
      return;
    }

    try {
      await axios.post('http://localhost:3000/admin/add-car', {
        name,
        imageUrl,
        type,
        availableFrom,
        availableFromTime,
        availableToTime,
        rent
      });
      alert('Car added!');
      setName('');
      setImageUrl('');
      setType('');
      setAvailableFrom('');
      setAvailableFromTime('');
      setAvailableToTime('');
      setRent('');
    } catch (err) {
      console.error(err);
      alert('Error adding car');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="login-form">
        <h2>🔒 Admin Login</h2>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={login}>Login</button>
      </div>
    );
  }

  return (
    <div>
      <h2>🛠️ Admin Panel: Add Car</h2>
      <div className="form-container">
        <input placeholder="Car Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Image URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
        <input placeholder="Car Type (e.g., SUV)" value={type} onChange={e => setType(e.target.value)} />
        <input type="date" value={availableFrom} onChange={e => setAvailableFrom(e.target.value)} />
        <input type="time" value={availableFromTime} onChange={e => setAvailableFromTime(e.target.value)} />
        <input type="time" value={availableToTime} onChange={e => setAvailableToTime(e.target.value)} />
        <input type="number" placeholder="Rent Amount (e.g., 500)" value={rent} onChange={e => setRent(e.target.value)} />
        <button onClick={addCar}>Add Car</button>
      </div>
    </div>
  );
}

export default Admin;
