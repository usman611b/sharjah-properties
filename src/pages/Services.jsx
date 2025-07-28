import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Star, Users, Shield, Award } from 'lucide-react'
import { useState } from 'react'
import { contactService } from '../services/contactService'
import { useToast } from '../context/ToastContext'

const Services = () => {
  const { success, error } = useToast();
  const [serviceForm, setServiceForm] = useState({
    name: '',
    email: '',
    serviceRequired: '',
    message: ''
  })

  const handleServiceSubmit = async (e) => {
    e.preventDefault()
    console.log('🟡 Service form submitted')
    console.log('🟡 Form data:', serviceForm)
    
    try {
      console.log('🟡 Calling contactService.submitService...')
      const response = await contactService.submitService(serviceForm)
      console.log('🟡 Response received:', response)
      
      // Show success message based on API response
      if (response.success) {
        console.log('🟡 Success! Showing success message')
        success(response.message || 'Service consultation request submitted successfully!')
        setServiceForm({
          name: '',
          email: '',
          serviceRequired: '',
          message: ''
        })
      } else {
        console.log('🟡 Error in response:', response.message)
        error(response.message || 'Error submitting service request')
      }
    } catch (error) {
      console.error('🟡 Service form submission error:', error)
      console.error('🟡 Error response:', error.response?.data)
      error(error.response?.data?.message || 'Error submitting service request. Please try again.')
    }
  }

  const services = [
    {
      icon: <MapPin size={32} className="text-primary-600" />,
      title: "Property Sales",
      description: "Comprehensive property sales services including valuation, marketing, and negotiation support.",
      features: ["Property Valuation", "Marketing Strategy", "Negotiation Support", "Legal Assistance"]
    },
    {
      icon: <Users size={32} className="text-primary-600" />,
      title: "Property Rentals",
      description: "Professional rental services for both landlords and tenants with comprehensive support.",
      features: ["Tenant Screening", "Property Management", "Rent Collection", "Maintenance Support"]
    },
    {
      icon: <Shield size={32} className="text-primary-600" />,
      title: "Property Management",
      description: "Complete property management services to maximize your investment returns.",
      features: ["Tenant Management", "Maintenance Coordination", "Financial Reporting", "Legal Compliance"]
    },
    {
      icon: <Award size={32} className="text-primary-600" />,
      title: "Investment Advisory",
      description: "Expert investment advice to help you make informed decisions about real estate investments.",
      features: ["Market Analysis", "Investment Strategy", "Portfolio Management", "Risk Assessment"]
    },
    {
      icon: <CheckCircle size={32} className="text-primary-600" />,
      title: "Legal Services",
      description: "Professional legal services to ensure smooth and compliant real estate transactions.",
      features: ["Contract Review", "Legal Documentation", "Compliance Support", "Dispute Resolution"]
    },
    {
      icon: <Star size={32} className="text-primary-600" />,
      title: "Consultation Services",
      description: "Personalized consultation services to guide you through your real estate journey.",
      features: ["One-on-One Consultation", "Market Insights", "Strategic Planning", "Ongoing Support"]
    }
  ]

  const benefits = [
    {
      title: "Expert Team",
      description: "Our team of experienced professionals ensures you get the best service and advice."
    },
    {
      title: "Transparent Process",
      description: "We maintain complete transparency throughout the process, keeping you informed at every step."
    },
    {
      title: "Comprehensive Support",
      description: "From initial consultation to final closing, we provide comprehensive support at every stage."
    },
    {
      title: "Legal Compliance",
      description: "We handle all the paperwork and legal formalities for a smooth closing."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white shadow-sm">
        <div className="container-custom py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Services</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive real estate services tailored to meet your needs. From buying and selling to property management, we've got you covered.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-6 flex justify-center">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{service.title}</h3>
                <p className="text-gray-600 mb-6 text-center">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                      <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide exceptional service with a focus on your success and satisfaction.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-8 rounded-xl bg-gray-50"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-primary-600">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
              <p className="text-primary-100 mb-8 text-lg">
                Contact our expert team today to discuss your real estate needs and discover how we can help you achieve your goals.
              </p>
              <div className="space-y-4">
                <a
                  href="tel:+971501234567"
                  className="flex items-center space-x-3 text-white hover:text-primary-100 transition-colors"
                >
                  <Phone size={24} />
                  <span className="text-lg">+971 50 123 4567</span>
                </a>
                <a
                  href="mailto:info@sharjahproperties.ae"
                  className="flex items-center space-x-3 text-white hover:text-primary-100 transition-colors"
                >
                  <Mail size={24} />
                  <span className="text-lg">info@sharjahproperties.ae</span>
                </a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Request a Consultation</h3>
              <form className="space-y-4" onSubmit={handleServiceSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={serviceForm.name}
                    onChange={(e) => setServiceForm({...serviceForm, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={serviceForm.email}
                    onChange={(e) => setServiceForm({...serviceForm, email: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Required</label>
                  <select 
                    value={serviceForm.serviceRequired}
                    onChange={(e) => setServiceForm({...serviceForm, serviceRequired: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="Property Sales">Property Sales</option>
                    <option value="Property Rentals">Property Rentals</option>
                    <option value="Property Management">Property Management</option>
                    <option value="Investment Advisory">Investment Advisory</option>
                    <option value="Legal Services">Legal Services</option>
                    <option value="Consultation Services">Consultation Services</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={4}
                    value={serviceForm.message}
                    onChange={(e) => setServiceForm({...serviceForm, message: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Tell us about your requirements..."
                  ></textarea>
                </div>
                <button type="submit" className="w-full btn-primary">
                  Request Consultation
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services 