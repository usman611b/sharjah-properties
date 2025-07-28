import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Bed, Bath, Square, MapPin, Star, Phone, Mail, Calendar, ArrowLeft } from 'lucide-react'
import { propertyService } from '../services/propertyService'
import { contactService } from '../services/contactService'
import { useToast } from '../context/ToastContext'

const PropertyDetail = () => {
  const { success, error } = useToast();
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [viewingForm, setViewingForm] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    message: ''
  })

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true)
        const data = await propertyService.getPropertyById(id)
        setProperty(data)
      } catch (error) {
        console.error('Error fetching property:', error)
        setProperty(null)
      } finally {
        setLoading(false)
      }
    }

    fetchProperty()
  }, [id])

  const handleViewingSubmit = async (e) => {
    e.preventDefault()
    console.log('🟡 Viewing form submitted')
    console.log('🟡 Form data:', viewingForm)
    
    try {
      console.log('🟡 Calling contactService.submitViewing...')
      const response = await contactService.submitViewing({
        ...viewingForm,
        propertyId: property._id,
        propertyTitle: property.title
      })
      console.log('🟡 Response received:', response)
      
      // Show success message based on API response
      if (response.success) {
        console.log('🟡 Success! Showing success message')
        success(response.message || 'Viewing request submitted successfully!')
        setViewingForm({
          name: '',
          email: '',
          phone: '',
          preferredDate: '',
          message: ''
        })
      } else {
        console.log('🟡 Error in response:', response.message)
        error(response.message || 'Error submitting viewing request')
      }
    } catch (error) {
      console.error('🟡 Viewing form submission error:', error)
      console.error('🟡 Error response:', error.response?.data)
      error(error.response?.data?.message || 'Error submitting viewing request. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading property...</div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h2>
          <p className="text-gray-600 mb-6">The property you're looking for doesn't exist.</p>
          <Link to="/properties" className="btn-primary">
            <ArrowLeft size={20} className="mr-2" />
            Back to Properties
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm">
        <div className="container-custom py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary-600">Home</Link>
            <span>/</span>
            <Link to="/properties" className="hover:text-primary-600">Properties</Link>
            <span>/</span>
            <span className="text-gray-900">{property.title}</span>
          </nav>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="relative">
                <img
                  src={property.images && property.images[selectedImage] ? `http://localhost:5000${property.images[selectedImage].path}` : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'}
                  alt={property.title}
                  className="w-full h-96 object-cover"
                />
                {property.images && property.images.length > 1 && (
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex space-x-2">
                      {property.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`w-16 h-12 rounded-lg overflow-hidden border-2 ${
                            selectedImage === index ? 'border-primary-500' : 'border-white'
                          }`}
                        >
                          <img
                            src={`http://localhost:5000${image.path}`}
                            alt={`${property.title} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Property Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin size={16} className="mr-1" />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-medium">
                      {property.propertyType}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                      {property.priceType}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary-600">
                    PKR {property.price.toLocaleString()}
                  </div>
                  <div className="text-gray-600">
                    {property.priceType === 'For Sale' ? 'Sale Price' : 'Monthly Rent'}
                  </div>
                </div>
              </div>

              {/* Property Features */}
              {property.features && property.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Property Features</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 text-gray-600">
                        <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {property.description || 'This beautiful property offers excellent amenities and a prime location. Contact us for more details and to schedule a viewing.'}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-6 mb-8"
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-primary-600 mb-2">
                  PKR {property.price.toLocaleString()}
                </h3>
                <p className="text-gray-600">
                  {property.priceType === 'For Sale' ? 'Sale Price' : 'Monthly Rent'}
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="tel:+923464337896"
                  className="w-full btn-primary flex items-center justify-center"
                >
                  <Phone size={20} className="mr-2" />
                  Call Now
                </a>
                <a
                  href="mailto:usmanali611b@gmail.com"
                  className="w-full btn-secondary flex items-center justify-center"
                >
                  <Mail size={20} className="mr-2" />
                  Send Email
                </a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Schedule a Viewing</h3>
              
              <form className="space-y-4" onSubmit={handleViewingSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={viewingForm.name}
                    onChange={(e) => setViewingForm({...viewingForm, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Your full name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={viewingForm.email}
                    onChange={(e) => setViewingForm({...viewingForm, email: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={viewingForm.phone}
                    onChange={(e) => setViewingForm({...viewingForm, phone: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="+92 346-4337896"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                  <input
                    type="date"
                    value={viewingForm.preferredDate}
                    onChange={(e) => setViewingForm({...viewingForm, preferredDate: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={4}
                    value={viewingForm.message}
                    onChange={(e) => setViewingForm({...viewingForm, message: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Tell us about your requirements..."
                  ></textarea>
                </div>
                
                <button type="submit" className="w-full btn-primary">
                  Schedule Viewing
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetail 