const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, {
  timestamps: true // This will add createdAt and updatedAt fields
});

module.exports = mongoose.model('Admin', adminSchema);
