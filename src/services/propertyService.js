import api from './api.js'

export const propertyService = {
  // Get all properties with filtering and pagination
  async getProperties(params = {}) {
    const response = await api.get('/properties', { params })
    return response.data.data || response.data
  },

  // Get featured properties (latest 3 properties)
  async getFeaturedProperties() {
    try {
      const response = await api.get('/properties/featured')
      const data = response.data.data || response.data
      // Ensure only 3 properties are returned as backup
      return data.slice(0, 3)
    } catch (error) {
      console.error('Error fetching featured properties:', error)
      return []
    }
  },

  // Get properties by category
  async getPropertiesByCategory(category) {
    try {
      const response = await api.get(`/properties/category/${category}`)
      return response.data.data || response.data
    } catch (error) {
      console.error('Error fetching properties by category:', error)
      return []
    }
  },

  // Get property by ID
  async getPropertyById(id) {
    const response = await api.get(`/properties/${id}`)
    return response.data.data || response.data
  },

  // Search properties
  async searchProperties(params = {}) {
    const response = await api.get('/properties/search', { params })
    return response.data.data || response.data
  },

  // Get properties by Marla size
  async getPropertiesByMarlaSize(marlaSize) {
    try {
      const response = await api.get('/properties', { 
        params: { marlaSize } 
      })
      return response.data.data || response.data
    } catch (error) {
      console.error('Error fetching properties by Marla size:', error)
      return []
    }
  },

  // Get 3-4 Marla properties
  async get3To4MarlaProperties() {
    return this.getPropertiesByCategory('3-4-marla')
  },

  // Get 5-7 Marla properties
  async get5To7MarlaProperties() {
    return this.getPropertiesByCategory('5-7-marla')
  },

  // Get 10 Marla properties
  async get10MarlaProperties() {
    return this.getPropertiesByCategory('10-marla')
  },

  // Get 1 Canal properties
  async get1CanalProperties() {
    return this.getPropertiesByCategory('1-canal')
  }
} 