const mongoose = require('mongoose')

const consultationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  consultationType: {
    type: String,
    default: 'General Consultation'
  },
  requirements: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Consultation', consultationSchema)
