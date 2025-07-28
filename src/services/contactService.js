import api from './api.js'

export const contactService = {
  // Submit contact form
  async submitContact(data) {
    console.log('🟡 contactService.submitContact called with data:', data)
    console.log('🟡 Making POST request to /contact/contact')
    
    try {
      const response = await api.post('/contact/contact', data)
      console.log('🟡 API response:', response)
      return response.data
    } catch (error) {
      console.error('🟡 API error:', error)
      throw error
    }
  },

  // Submit consultation request
  async submitConsultation(data) {
    console.log('🟡 contactService.submitConsultation called with data:', data)
    console.log('🟡 Making POST request to /contact/consultation')
    
    try {
      const response = await api.post('/contact/consultation', data)
      console.log('🟡 API response:', response)
      return response.data
    } catch (error) {
      console.error('🟡 API error:', error)
      throw error
    }
  },

  // Submit property viewing request
  async submitViewing(data) {
    console.log('🟡 contactService.submitViewing called with data:', data)
    console.log('🟡 Making POST request to /contact/viewing')
    
    try {
      const response = await api.post('/contact/viewing', data)
      console.log('🟡 API response:', response)
      return response.data
    } catch (error) {
      console.error('🟡 API error:', error)
      throw error
    }
  },

  // Submit service consultation request
  async submitService(data) {
    console.log('🟡 contactService.submitService called with data:', data)
    console.log('🟡 Making POST request to /contact/service')
    
    try {
      const response = await api.post('/contact/service', data)
      console.log('🟡 API response:', response)
      return response.data
    } catch (error) {
      console.error('🟡 API error:', error)
      throw error
    }
  },

  // Submit property inquiry
  async submitPropertyInquiry(data) {
    const response = await api.post('/contact/property-inquiry', data)
    return response.data
  }
} 