const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  seat: { type: Number, required: true },
  client: { type: String, required: true },
  email: { type: String, required: true },
  concert: { type: Object, required: true, ref: 'Concert' },
});

module.exports = mongoose.model('Seat', seatSchema);
