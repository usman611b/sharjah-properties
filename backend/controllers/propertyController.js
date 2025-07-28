const Property = require('../models/Property')
const path = require('path')

exports.getAll = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 })
    res.json({
      success: true,
      data: properties
    })
  } catch (error) {
    console.error('Error fetching properties:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch properties'
    })
  }
}

// Get properties by category (Marla size)
exports.getByCategory = async (req, res) => {
  try {
    const { category } = req.params
    let query = {}
    
    switch (category) {
      case '3-4-marla':
        query.marlaSize = { $in: [3, 4] }
        break
      case '5-7-marla':
        query.marlaSize = { $in: [5, 6, 7] }
        break
      case '10-marla':
        query.marlaSize = 10
        break
      case '1-canal':
        query.marlaSize = 1
        break
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid category'
        })
    }
    
    const properties = await Property.find(query).sort({ createdAt: -1 })
    res.json({
      success: true,
      data: properties
    })
  } catch (error) {
    console.error('Error fetching properties by category:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch properties'
    })
  }
}

exports.getOne = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      })
    }
    res.json({
      success: true,
      data: property
    })
  } catch (error) {
    console.error('Error fetching property:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch property'
    })
  }
}

exports.create = async (req, res) => {
  try {
    console.log('🟡 Creating property with data:', req.body)
    console.log('🟡 Files uploaded:', req.files)
    
    // Prepare property data
    const propertyData = {
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      marlaSize: parseInt(req.body.marlaSize),
      propertyType: req.body.propertyType,
      society: req.body.society,
      price: parseInt(req.body.price),
      priceType: req.body.priceType,
      features: req.body.features ? JSON.parse(req.body.features) : [],
      contactInfo: {
        name: req.body.contactName,
        phone: req.body.contactPhone,
        email: req.body.contactEmail
      }
    }
    
    // Handle uploaded images
    if (req.files && req.files.length > 0) {
      propertyData.images = req.files.map(file => ({
        filename: file.filename,
        originalName: file.originalname,
        path: `/uploads/${file.filename}`
      }))
    }
    
    const property = new Property(propertyData)
    await property.save()
    
    console.log('🟡 Property created successfully:', property._id)
    
    res.status(201).json({
      success: true,
      message: 'Property created successfully!',
      data: property
    })
  } catch (error) {
    console.error('🟡 Error creating property:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create property. Please try again.'
    })
  }
}

exports.update = async (req, res) => {
  try {
    const propertyData = { ...req.body }
    
    // Handle uploaded images
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => ({
        filename: file.filename,
        originalName: file.originalname,
        path: `/uploads/${file.filename}`
      }))
      
      // If replacing images, use new ones; if adding, append to existing
      if (req.body.replaceImages === 'true') {
        propertyData.images = newImages
      } else {
        const existingProperty = await Property.findById(req.params.id)
        propertyData.images = [...(existingProperty.images || []), ...newImages]
      }
    }
    
    // Parse features if it's a string
    if (req.body.features && typeof req.body.features === 'string') {
      propertyData.features = JSON.parse(req.body.features)
    }
    
    const property = await Property.findByIdAndUpdate(req.params.id, propertyData, { new: true })
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      })
    }
    res.json({
      success: true,
      message: 'Property updated successfully!',
      data: property
    })
  } catch (error) {
    console.error('Error updating property:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update property'
    })
  }
}

exports.remove = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id)
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      })
    }
    res.json({
      success: true,
      message: 'Property deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting property:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete property'
    })
  }
}

// Get featured properties (latest 3)
exports.getFeatured = async (req, res) => {
  try {
    const properties = await Property.find({ status: 'Available' })
      .sort({ createdAt: -1 })
      .limit(3)
    
    res.json({
      success: true,
      data: properties
    })
  } catch (error) {
    console.error('Error fetching featured properties:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured properties'
    })
  }
}

// Search properties
exports.search = async (req, res) => {
  try {
    const { q, category, society, priceType, minPrice, maxPrice } = req.query
    let query = {}
    
    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { location: { $regex: q, $options: 'i' } },
        { society: { $regex: q, $options: 'i' } }
      ]
    }
    
    if (category) {
      switch (category) {
        case '3-4-marla':
          query.marlaSize = { $in: [3, 4] }
          break
        case '5-7-marla':
          query.marlaSize = { $in: [5, 6, 7] }
          break
        case '10-marla':
          query.marlaSize = 10
          break
        case '1-canal':
          query.marlaSize = 1
          break
      }
    }
    
    if (society) {
      query.society = society
    }
    
    if (priceType) {
      query.priceType = priceType
    }
    
    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = parseInt(minPrice)
      if (maxPrice) query.price.$lte = parseInt(maxPrice)
    }
    
    const properties = await Property.find(query).sort({ createdAt: -1 })
    
    res.json({
      success: true,
      data: properties
    })
  } catch (error) {
    console.error('Error searching properties:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to search properties'
    })
  }
}
