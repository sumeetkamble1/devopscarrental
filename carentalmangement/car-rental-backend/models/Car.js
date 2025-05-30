const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  type: String,
  availableFrom: Date,
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model('Car', carSchema);