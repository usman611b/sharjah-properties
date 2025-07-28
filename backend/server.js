console.log('🟡 Server file started...')
const adminRoutes = require('./routes/admin');
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

const propertyRoutes = require('./routes/propertyRoutes')
const consultationRoutes = require('./routes/consultationRoutes')

const app = express()

// Apply middleware before routes
app.use(cors())
app.use(express.json())

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Sharjah Properties API is running!' })
})

app.get('/api', (req, res) => {
  res.json({ message: 'Sharjah Properties API is running!' })
})

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/properties', propertyRoutes)
app.use('/api/consultations', consultationRoutes)

// Contact consultation route (for frontend compatibility)
app.use('/api/contact', consultationRoutes)

// Connect MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sharjah'
const port = process.env.PORT || 5000

mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  })
  .catch(err => console.error('MongoDB connection error:', err))
