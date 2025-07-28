const express = require('express')
const router = express.Router()
const controller = require('../controllers/consultationController')
const authMiddleware = require('../middleware/auth')

// Public routes (no authentication required)
// Main consultation routes
router.post('/', controller.create)

// Contact consultation route (for frontend compatibility)
router.post('/consultation', controller.create)

// Contact form route (for Contact.jsx page)
router.post('/contact', controller.createContact)

// Property viewing scheduling route (for PropertyDetail.jsx page)
router.post('/viewing', controller.createViewing)

// Service consultation route (for Services.jsx page)
router.post('/service', controller.createService)

// Protected routes (authentication required)
// Get all consultations (admin only)
router.get('/', authMiddleware, controller.getAll)

// Admin routes for managing consultations
router.put('/:id/status', authMiddleware, controller.updateStatus)
router.delete('/:id', authMiddleware, controller.delete)

module.exports = router
