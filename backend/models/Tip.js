const mongoose = require('mongoose');

const tipSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  place: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  tipAmount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const Tip = mongoose.model('Tip', tipSchema);

module.exports = Tip;
