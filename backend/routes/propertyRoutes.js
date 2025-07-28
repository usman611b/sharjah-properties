const express = require('express')
const router = express.Router()
const controller = require('../controllers/propertyController')
const { uploadMultiple } = require('../middleware/upload')
const authMiddleware = require('../middleware/auth')

// Public routes (no authentication required)
// Get all properties
router.get('/', controller.getAll)

// Get properties by category
router.get('/category/:category', controller.getByCategory)

// Get featured properties
router.get('/featured', controller.getFeatured)

// Search properties
router.get('/search', controller.search)

// Get single property
router.get('/:id', controller.getOne)

// Protected routes (authentication required)
// Create property with image upload
router.post('/', authMiddleware, uploadMultiple, controller.create)

// Update property with image upload
router.put('/:id', authMiddleware, uploadMultiple, controller.update)

// Delete property
router.delete('/:id', authMiddleware, controller.remove)

module.exports = router
