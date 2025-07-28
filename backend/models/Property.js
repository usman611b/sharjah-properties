const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  // Pakistan-specific fields
  marlaSize: {
    type: Number,
    required: true,
    enum: [3, 4, 5, 6, 7, 10, 1] // 1 represents 1 Canal (25 Marla)
  },
  propertyType: {
    type: String,
    required: true,
    enum: ['House', 'Plot', 'Commercial', 'Apartment']
  },
  society: {
    type: String,
    required: true,
    enum: [
      'DHA Phase 1', 'DHA Phase 2', 'DHA Phase 3', 'DHA Phase 4', 'DHA Phase 5', 'DHA Phase 6', 'DHA Phase 7', 'DHA Phase 8',
      'Bahria Town Phase 1', 'Bahria Town Phase 2', 'Bahria Town Phase 3', 'Bahria Town Phase 4', 'Bahria Town Phase 5', 'Bahria Town Phase 6', 'Bahria Town Phase 7', 'Bahria Town Phase 8',
      'Gulberg Greens', 'Gulberg Residencia', 'Gulberg Heights',
      'Park View City', 'Park View Villas',
      'Capital Smart City', 'Capital Valley',
      'Blue World City', 'Blue World City Sports Valley',
      'Lahore Smart City', 'Lahore Gardens',
      'Islamabad Gardens', 'Islamabad Heights',
      'Faisal Town', 'Garden Town', 'Model Town', 'Johar Town',
      'Wapda Town', 'Askari', 'Cantt', 'Defence', 'Gulberg',
      'Other'
    ]
  },
  price: {
    type: Number,
    required: true
  },
  priceType: {
    type: String,
    required: true,
    enum: ['For Sale', 'For Rent']
  },
  // Image upload support
  images: [{
    filename: String,
    originalName: String,
    path: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  // Additional Pakistan-specific features
  features: [{
    type: String,
    enum: [
      'Corner Plot', 'Main Boulevard', 'Park Facing', 'Corner House',
      'Servant Quarter', 'Garage', 'Garden', 'Swimming Pool',
      'Security', 'Electricity', 'Gas', 'Water', 'Sewerage',
      'Road Access', 'Boundary Wall', 'Ready to Build', 'Under Construction'
    ]
  }],
  status: {
    type: String,
    default: 'Available',
    enum: ['Available', 'Sold', 'Rented', 'Under Contract']
  },
  contactInfo: {
    name: String,
    phone: String,
    email: String
  }
}, {
  timestamps: true
})

// Virtual for property category based on Marla size
propertySchema.virtual('category').get(function() {
  if (this.marlaSize === 1) return '1 Canal Project'
  if (this.marlaSize === 10) return '10 Marla Project'
  if (this.marlaSize >= 5 && this.marlaSize <= 7) return '5-7 Marla Project'
  if (this.marlaSize >= 3 && this.marlaSize <= 4) return '3-4 Marla Project'
  return 'Other'
})

// Ensure virtuals are serialized
propertySchema.set('toJSON', { virtuals: true })
propertySchema.set('toObject', { virtuals: true })

module.exports = mongoose.model('Property', propertySchema)
