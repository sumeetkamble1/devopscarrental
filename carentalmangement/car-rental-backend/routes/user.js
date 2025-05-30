const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Car = require('../models/Car');

router.post('/book/:carId', async (req, res) => {
  try {
    const car = await Car.findById(req.params.carId);
    if (!car || !car.available) return res.status(400).send({ message: 'Car not available' });

    car.available = false;
    await car.save();

    const booking = new Booking({
      car: car._id,
      userName: req.body.userName
    });

    await booking.save();
    res.status(201).send(booking);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/bookings', async (req, res) => {
  const bookings = await Booking.find().populate('car');
  res.send(bookings);
});

module.exports = router;