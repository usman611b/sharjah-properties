import api from './api.js'

// Authentication service
export const authService = {
  // Register new user
  async register(userData) {
    const response = await api.post('/auth/register', userData)
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
  },

  // Login user
  async login(credentials) {
    const response = await api.post('/auth/login', credentials)
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
  },

  // Logout user
  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  // Get current user
  async getCurrentUser() {
    const response = await api.get('/auth/me')
    return response.data
  },

  // Update user profile
  async updateProfile(profileData) {
    const response = await api.put('/auth/profile', profileData)
    // Update stored user data
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
    const updatedUser = { ...currentUser, ...response.data }
    localStorage.setItem('user', JSON.stringify(updatedUser))
    return response.data
  },

  // Change password
  async changePassword(passwordData) {
    const response = await api.put('/auth/change-password', passwordData)
    return response.data
  },

  // Forgot password
  async forgotPassword(email) {
    const response = await api.post('/auth/forgot-password', { email })
    return response.data
  },

  // Reset password
  async resetPassword(token, newPassword) {
    const response = await api.post('/auth/reset-password', { token, newPassword })
    return response.data
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('token')
  },

  // Get stored user data
  getStoredUser() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  // Get user role
  getUserRole() {
    const user = this.getStoredUser()
    return user?.role || 'client'
  },

  // Check if user is admin
  isAdmin() {
    return this.getUserRole() === 'admin'
  },

  // Check if user is agent
  isAgent() {
    return this.getUserRole() === 'agent'
  }
} 