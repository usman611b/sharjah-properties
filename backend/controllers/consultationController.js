const Consultation = require('../models/Consultation')

exports.create = async (req, res) => {
  console.log('🟡 Consultation create endpoint called')
  console.log('🟡 Request body:', req.body)
  
  try {
    // Validate required fields
    const { name, email, phone, consultationType, requirements } = req.body
    
    console.log('🟡 Validating fields:', { name, email, phone, consultationType, requirements })
    
    if (!name || !email || !phone) {
      console.log('🟡 Validation failed - missing required fields')
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and phone are required' 
      })
    }

    const consultation = new Consultation({
      name,
      email,
      phone,
      consultationType: consultationType || 'General Consultation',
      requirements: requirements || '',
      status: 'pending',
      submittedAt: new Date()
    })

    console.log('🟡 Saving consultation to database...')
    await consultation.save()
    console.log('🟡 Consultation saved successfully:', consultation._id)
    
    res.status(201).json({
      success: true,
      message: 'Consultation request submitted successfully!',
      data: consultation
    })
  } catch (error) {
    console.error('🟡 Error creating consultation:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to submit consultation request. Please try again.'
    })
  }
}

// Contact form submission (from Contact.jsx)
exports.createContact = async (req, res) => {
  console.log('🟡 Contact form submission called')
  console.log('🟡 Request body:', req.body)
  
  try {
    const { firstName, lastName, email, phone, subject, message } = req.body
    
    console.log('🟡 Validating contact form fields:', { firstName, lastName, email, phone, subject, message })
    
    if (!firstName || !lastName || !email || !phone || !subject || !message) {
      console.log('🟡 Contact form validation failed - missing required fields')
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      })
    }

    const consultation = new Consultation({
      name: `${firstName} ${lastName}`,
      email,
      phone,
      consultationType: subject,
      requirements: message,
      status: 'pending',
      submittedAt: new Date()
    })

    console.log('🟡 Saving contact form to database...')
    await consultation.save()
    console.log('🟡 Contact form saved successfully:', consultation._id)
    
    res.status(201).json({
      success: true,
      message: 'Message sent successfully! We will get back to you soon.',
      data: consultation
    })
  } catch (error) {
    console.error('🟡 Error creating contact form:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again.'
    })
  }
}

// Property viewing scheduling (from PropertyDetail.jsx)
exports.createViewing = async (req, res) => {
  console.log('🟡 Property viewing scheduling called')
  console.log('🟡 Request body:', req.body)
  
  try {
    const { name, email, phone, preferredDate, message, propertyId, propertyTitle } = req.body
    
    console.log('🟡 Validating viewing fields:', { name, email, phone, preferredDate, message, propertyId, propertyTitle })
    
    if (!name || !email || !phone || !preferredDate) {
      console.log('🟡 Viewing validation failed - missing required fields')
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, phone, and preferred date are required' 
      })
    }

    const consultation = new Consultation({
      name,
      email,
      phone,
      consultationType: 'Property Viewing',
      requirements: `Property: ${propertyTitle || 'N/A'}\nPreferred Date: ${preferredDate}\nMessage: ${message || 'No additional message'}`,
      status: 'pending',
      submittedAt: new Date()
    })

    console.log('🟡 Saving viewing request to database...')
    await consultation.save()
    console.log('🟡 Viewing request saved successfully:', consultation._id)
    
    res.status(201).json({
      success: true,
      message: 'Viewing request submitted successfully! We will contact you to confirm the appointment.',
      data: consultation
    })
  } catch (error) {
    console.error('🟡 Error creating viewing request:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to submit viewing request. Please try again.'
    })
  }
}

// Service consultation (from Services.jsx)
exports.createService = async (req, res) => {
  console.log('🟡 Service consultation called')
  console.log('🟡 Request body:', req.body)
  
  try {
    const { name, email, serviceRequired, message } = req.body
    
    console.log('🟡 Validating service fields:', { name, email, serviceRequired, message })
    
    if (!name || !email || !serviceRequired) {
      console.log('🟡 Service validation failed - missing required fields')
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and service required are mandatory' 
      })
    }

    const consultation = new Consultation({
      name,
      email,
      phone: 'Not provided',
      consultationType: serviceRequired,
      requirements: message || 'No additional requirements specified',
      status: 'pending',
      submittedAt: new Date()
    })

    console.log('🟡 Saving service request to database...')
    await consultation.save()
    console.log('🟡 Service request saved successfully:', consultation._id)
    
    res.status(201).json({
      success: true,
      message: 'Service consultation request submitted successfully! We will contact you soon.',
      data: consultation
    })
  } catch (error) {
    console.error('🟡 Error creating service request:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to submit service request. Please try again.'
    })
  }
}

exports.getAll = async (req, res) => {
  try {
    const consultations = await Consultation.find()
      .sort({ submittedAt: -1 })
      .select('-__v')
    
    res.json({
      success: true,
      data: consultations
    })
  } catch (error) {
    console.error('Error fetching consultations:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch consultations'
    })
  }
}

// Update consultation status (for admin panel)
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body
    
    const consultation = await Consultation.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true }
    )
    
    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation not found'
      })
    }
    
    res.json({
      success: true,
      message: 'Consultation status updated successfully',
      data: consultation
    })
  } catch (error) {
    console.error('Error updating consultation status:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update consultation status'
    })
  }
}

// Delete consultation (for admin panel)
exports.delete = async (req, res) => {
  try {
    const { id } = req.params
    
    const consultation = await Consultation.findByIdAndDelete(id)
    
    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation not found'
      })
    }
    
    res.json({
      success: true,
      message: 'Consultation deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting consultation:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete consultation'
    })
  }
}
