import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'
import { useState } from 'react'
import { contactService } from '../services/contactService'
import { useToast } from '../context/ToastContext'

const Contact = () => {
  const { success, error } = useToast();
  const [contactForm, setContactForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    console.log('🟡 Contact form submitted')
    console.log('🟡 Form data:', contactForm)
    
    try {
      console.log('🟡 Calling contactService.submitContact...')
      const response = await contactService.submitContact(contactForm)
      console.log('🟡 Response received:', response)
      
      // Show success message based on API response
      if (response.success) {
        console.log('🟡 Success! Showing success message')
        success(response.message || 'Message sent successfully!')
        setContactForm({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        })
      } else {
        console.log('🟡 Error in response:', response.message)
        error(response.message || 'Error sending message')
      }
    } catch (error) {
      console.error('🟡 Contact form submission error:', error)
      console.error('🟡 Error response:', error.response?.data)
      error(error.response?.data?.message || 'Error sending message. Please try again.')
    }
  }

  const contactInfo = [
    {
      icon: <Phone size={24} className="text-primary-600" />,
      title: "Phone",
      details: ["+92 346-4337896", "+92 42 123 4567"],
      action: "tel:+923464337896"
    },
    {
      icon: <Mail size={24} className="text-primary-600" />,
      title: "Email",
      details: ["usmanali611b@gmail.com", "sales@sharjahproperties.pk"],
      action: "mailto:usmanali611b@gmail.com"
    },
    {
      icon: <MapPin size={24} className="text-primary-600" />,
      title: "Address",
      details: ["Gulberg III, Main Boulevard", "Lahore, Pakistan"],
      action: "#"
    },
    {
      icon: <Clock size={24} className="text-primary-600" />,
      title: "Working Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 9:00 AM - 4:00 PM"],
      action: "#"
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get in touch with our expert team. We're here to help you find your perfect property in Pakistan's most prestigious housing societies including DHA, Bahria Town, Gulberg, and Model Town.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-4 flex justify-center">
                  {info.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-gray-600">{detail}</p>
                  ))}
                </div>
                {info.action !== "#" && (
                  <a
                    href={info.action}
                    className="inline-block mt-3 text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Contact Now
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <form className="space-y-6" onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      value={contactForm.firstName}
                      onChange={(e) => setContactForm({...contactForm, firstName: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Your first name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={contactForm.lastName}
                      onChange={(e) => setContactForm({...contactForm, lastName: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Your last name"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="+92 300 123 4567"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select 
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="Property Inquiry">Property Inquiry</option>
                    <option value="Schedule Viewing">Schedule Viewing</option>
                    <option value="DHA Properties">DHA Properties</option>
                    <option value="Bahria Town Properties">Bahria Town Properties</option>
                    <option value="Gulberg Properties">Gulberg Properties</option>
                    <option value="General Information">General Information</option>
                    <option value="Investment Advice">Investment Advice</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={6}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Tell us about your requirements or questions..."
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="w-full btn-primary flex items-center justify-center">
                  <Send size={20} className="mr-2" />
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* Map and Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Map */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-64">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.1234567890123!2d74.34567890123456!3d31.45678901234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391905d4e8b8b8b8%3A0x1234567890123456!2sGulberg%20III%2C%20Lahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1234567890123"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Sharjah Properties Office Location - Gulberg III, Lahore"
                  ></iframe>
                </div>
              </div>

              {/* Additional Contact Info */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Visit Our Office</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin size={20} className="text-primary-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Gulberg III, Main Boulevard</p>
                      <p className="text-gray-600">Lahore, Punjab, Pakistan</p>
                      <p className="text-sm text-gray-500 mt-1">Located in the heart of Lahore's most prestigious area</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock size={20} className="text-primary-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Working Hours</p>
                      <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Saturday: 9:00 AM - 4:00 PM</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-primary-600 rounded-full mt-1"></div>
                    <div>
                      <p className="font-medium text-gray-900">Nearby Landmarks</p>
                      <p className="text-gray-600">• Gulberg Galleria Mall</p>
                      <p className="text-gray-600">• Liberty Market</p>
                      <p className="text-gray-600">• Main Boulevard Metro Station</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our services and processes
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "How do I schedule a property viewing?",
                answer: "You can schedule a viewing by calling us directly, sending us an email, or filling out the contact form on this page. We'll arrange a convenient time for you."
              },
              {
                question: "What documents do I need for property purchase?",
                answer: "Typically, you'll need your CNIC, proof of income, bank statements, and property documents. We'll provide a complete list based on your specific situation and property type."
              },
              {
                question: "Do you offer financing assistance?",
                answer: "Yes, we work with several banks and financial institutions to help you secure the best mortgage rates and terms for your property purchase in Pakistan."
              },
              {
                question: "What areas do you cover in Pakistan?",
                answer: "We cover all major housing societies including DHA, Bahria Town, Gulberg, Model Town, and many more across Lahore, Islamabad, and Karachi. Contact us for specific areas."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Don't wait any longer. Contact our expert team today and take the first step towards finding your dream property.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <a href="tel:+923464337896" className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200">
              Call Now
            </a>
            <a href="mailto:usmanali611b@gmail.com" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-8 rounded-lg transition-colors duration-200">
              Send Email
            </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Contact 