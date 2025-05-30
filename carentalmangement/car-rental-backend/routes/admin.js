const express = require('express');
const router = express.Router();
const Car = require('../models/Car');

router.post('/add-car', async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).send(car);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/cars', async (req, res) => {
  const cars = await Car.find();
  res.send(cars);
});

module.exports = router;