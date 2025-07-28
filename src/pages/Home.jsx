import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react'
import PropertyCard from '../components/PropertyCard'
import { propertyService } from '../services/propertyService'
import { contactService } from '../services/contactService'
import { useToast } from '../context/ToastContext'

const Home = () => {
  const { success, error } = useToast();
  const [featuredProperties, setFeaturedProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [consultationForm, setConsultationForm] = useState({
    name: '',
    email: '',
    phone: '',
    consultationType: '',
    requirements: ''
  })

  // Fetch featured properties
  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        setLoading(true)
        const data = await propertyService.getFeaturedProperties()
        setFeaturedProperties(data)
      } catch (error) {
        console.error('Error fetching featured properties:', error)
        setFeaturedProperties([])
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProperties()
  }, [])

  const handleConsultationSubmit = async (e) => {
    e.preventDefault()
    console.log('🟡 Consultation form submitted')
    console.log('🟡 Form data:', consultationForm)
    
    try {
      console.log('🟡 Calling contactService.submitConsultation...')
      const response = await contactService.submitConsultation(consultationForm)
      console.log('🟡 Response received:', response)
      
      // Show success message based on API response
      if (response.success) {
        console.log('🟡 Success! Showing success message')
        success(response.message || 'Consultation request submitted successfully!')
        setConsultationForm({
          name: '',
          email: '',
          phone: '',
          consultationType: '',
          requirements: ''
        })
      } else {
        console.log('🟡 Error in response:', response.message)
        error(response.message || 'Error submitting consultation request')
      }
    } catch (error) {
      console.error('🟡 Consultation submission error:', error)
      console.error('🟡 Error response:', error.response?.data)
      error(error.response?.data?.message || 'Error submitting consultation request. Please try again.')
    }
  }

  const stats = [
    { number: "500+", label: "Properties Sold" },
    { number: "1000+", label: "Happy Clients" },
    { number: "50+", label: "Housing Societies" },
    { number: "10+", label: "Years Experience" }
  ]

  const services = [
    {
      icon: "🏠",
      title: "Property Sales",
      description: "Comprehensive property sales services with expert guidance."
    },
    {
      icon: "🏢",
      title: "Property Rentals",
      description: "Professional rental services for landlords and tenants."
    },
    {
      icon: "🔧",
      title: "Property Management",
      description: "Complete property management to maximize your returns."
    },
    {
      icon: "📊",
      title: "Investment Advisory",
      description: "Expert investment advice for real estate decisions."
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden min-h-screen flex items-center">
        {/* 4K Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=4000&q=80')`,
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>
        
        <div className="container-custom relative z-10 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Find Your Dream Property in Pakistan
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                Discover the perfect home in Pakistan's most prestigious housing societies including DHA, Bahria Town, Gulberg, and Model Town. From 3 Marla to 1 Canal, we have properties for every need.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link 
                  to="/properties" 
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full overflow-hidden transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:scale-105 hover:shadow-2xl shadow-lg"
                >
                  <span className="relative z-10 flex items-center">
                    Browse Properties
                    <ArrowRight size={20} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link 
                  to="/contact" 
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-full overflow-hidden transition-all duration-300 hover:bg-white hover:text-gray-900 hover:scale-105 hover:shadow-2xl backdrop-blur-sm"
                >
                  <span className="relative z-10">Contact Us</span>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6">Get Free Consultation</h3>
                <form onSubmit={handleConsultationSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={consultationForm.name}
                    onChange={(e) => setConsultationForm({...consultationForm, name: e.target.value})}
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={consultationForm.email}
                    onChange={(e) => setConsultationForm({...consultationForm, email: e.target.value})}
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Your Phone"
                    value={consultationForm.phone}
                    onChange={(e) => setConsultationForm({...consultationForm, phone: e.target.value})}
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    required
                  />
                  <select
                    value={consultationForm.consultationType}
                    onChange={(e) => setConsultationForm({...consultationForm, consultationType: e.target.value})}
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/50 [&>option]:bg-gray-800 [&>option]:text-white [&>option]:py-2"
                    style={{
                      color: 'white',
                    }}
                    required
                  >
                    <option value="" style={{ backgroundColor: '#1f2937', color: 'white' }}>Select Consultation Type</option>
                    <option value="Buying Consultation" style={{ backgroundColor: '#1f2937', color: 'white' }}>Buying Consultation</option>
                    <option value="Renting Consultation" style={{ backgroundColor: '#1f2937', color: 'white' }}>Renting Consultation</option>
                    <option value="Property Investment Advice" style={{ backgroundColor: '#1f2937', color: 'white' }}>Property Investment Advice</option>
                    <option value="DHA Properties" style={{ backgroundColor: '#1f2937', color: 'white' }}>DHA Properties</option>
                    <option value="Bahria Town Properties" style={{ backgroundColor: '#1f2937', color: 'white' }}>Bahria Town Properties</option>
                  </select>
                  <textarea
                    placeholder="Your Requirements"
                    value={consultationForm.requirements}
                    onChange={(e) => setConsultationForm({...consultationForm, requirements: e.target.value})}
                    rows={3}
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <button type="submit" className="w-full btn-secondary py-3">
                    <Send size={20} className="mr-2" />
                    Get Free Consultation
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Properties</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our handpicked selection of premium properties in Pakistan's most prestigious housing societies including DHA, Bahria Town, Gulberg, and Model Town.
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-12">
              <div className="text-lg text-gray-600">Loading featured properties...</div>
            </div>
          ) : featuredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredProperties.slice(0, 3).map((property, index) => (
                <motion.div
                  key={property._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-lg text-gray-600">No featured properties available at the moment.</div>
            </div>
          )}

          <div className="text-center">
            <Link to="/properties" className="btn-primary text-lg px-8 py-4">
              View All Properties
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Project Categories */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Project Categories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore properties in different Marla sizes to find the perfect fit for your family.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "3-4 Marla",
                description: "Perfect for small families",
                link: "/properties/3-4-marla",
                color: "from-blue-500 to-blue-600"
              },
              {
                title: "5-7 Marla",
                description: "Ideal for growing families",
                link: "/properties/5-7-marla",
                color: "from-green-500 to-green-600"
              },
              {
                title: "10 Marla",
                description: "Luxury family homes",
                link: "/properties/10-marla",
                color: "from-purple-500 to-purple-600"
              },
              {
                title: "1 Canal",
                description: "Ultimate luxury properties",
                link: "/properties/1-canal",
                color: "from-red-500 to-red-600"
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={category.link} className="block group">
                  <div className={`bg-gradient-to-br ${category.color} text-white rounded-xl p-8 text-center h-full hover:scale-105 transition-transform duration-300`}>
                    <h3 className="text-2xl font-bold mb-4">{category.title}</h3>
                    <p className="text-white/90 mb-6">{category.description}</p>
                    <div className="flex items-center justify-center text-white/80 group-hover:text-white transition-colors">
                      <span>Explore Properties</span>
                      <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive real estate services to help you find, buy, and manage your perfect property.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Dream Property?</h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Contact our expert team today and let us help you find the perfect property in Pakistan's most prestigious housing societies including DHA, Bahria Town, Gulberg, and Model Town.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-secondary text-lg px-8 py-4">
                Contact Us
              </Link>
              <Link to="/properties" className="btn-outline text-lg px-8 py-4">
                Browse Properties
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home 