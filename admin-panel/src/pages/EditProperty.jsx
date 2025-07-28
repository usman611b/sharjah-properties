import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api'

const EditProperty = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    marlaSize: '',
    propertyType: '',
    society: '',
    price: '',
    priceType: 'For Sale',
    features: [],
    contactName: '',
    contactPhone: '',
    contactEmail: ''
  })
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await api.get(`/properties/${id}`)
        const property = res.data.data || res.data
        
        setFormData({
          title: property.title || '',
          description: property.description || '',
          location: property.location || '',
          marlaSize: property.marlaSize || '',
          propertyType: property.propertyType || '',
          society: property.society || '',
          price: property.price || '',
          priceType: property.priceType || 'For Sale',
          features: property.features || [],
          contactName: property.contactName || '',
          contactPhone: property.contactPhone || '',
          contactEmail: property.contactEmail || ''
        })
      } catch (error) {
        console.error('Error fetching property:', error)
        alert('Error loading property data')
        navigate('/properties')
      } finally {
        setInitialLoading(false)
      }
    }

    fetchProperty()
  }, [id, navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFeatureToggle = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const updatedData = {
        ...formData,
        features: JSON.stringify(formData.features)
      }

      await api.put(`/properties/${id}`, updatedData)
      alert('Property updated successfully!')
      navigate('/properties')
    } catch (error) {
      console.error('Error updating property:', error)
      alert(error.response?.data?.message || 'Error updating property. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Property</h1>
        <p className="text-gray-600">Update property information</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700">Title</label>
            <input 
              name="title" 
              value={formData.title} 
              onChange={handleInputChange} 
              required 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Property Type</label>
            <select 
              name="propertyType" 
              value={formData.propertyType} 
              onChange={handleInputChange} 
              required 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Type</option>
              <option value="House">House</option>
              <option value="Plot">Plot</option>
              <option value="Commercial">Commercial</option>
              <option value="Apartment">Apartment</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Location</label>
            <input 
              name="location" 
              value={formData.location} 
              onChange={handleInputChange} 
              required 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Society</label>
            <select 
              name="society" 
              value={formData.society} 
              onChange={handleInputChange} 
              required 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Society</option>
              <option value="DHA Phase 1">DHA Phase 1</option>
              <option value="DHA Phase 2">DHA Phase 2</option>
              <option value="DHA Phase 3">DHA Phase 3</option>
              <option value="DHA Phase 4">DHA Phase 4</option>
              <option value="DHA Phase 5">DHA Phase 5</option>
              <option value="DHA Phase 6">DHA Phase 6</option>
              <option value="DHA Phase 7">DHA Phase 7</option>
              <option value="DHA Phase 8">DHA Phase 8</option>
              <option value="Bahria Town Phase 1">Bahria Town Phase 1</option>
              <option value="Bahria Town Phase 2">Bahria Town Phase 2</option>
              <option value="Bahria Town Phase 3">Bahria Town Phase 3</option>
              <option value="Bahria Town Phase 4">Bahria Town Phase 4</option>
              <option value="Bahria Town Phase 5">Bahria Town Phase 5</option>
              <option value="Bahria Town Phase 6">Bahria Town Phase 6</option>
              <option value="Bahria Town Phase 7">Bahria Town Phase 7</option>
              <option value="Bahria Town Phase 8">Bahria Town Phase 8</option>
              <option value="Gulberg Greens">Gulberg Greens</option>
              <option value="Gulberg Residencia">Gulberg Residencia</option>
              <option value="Gulberg Heights">Gulberg Heights</option>
              <option value="Park View City">Park View City</option>
              <option value="Park View Villas">Park View Villas</option>
              <option value="Capital Smart City">Capital Smart City</option>
              <option value="Capital Valley">Capital Valley</option>
              <option value="Blue World City">Blue World City</option>
              <option value="Blue World City Sports Valley">Blue World City Sports Valley</option>
              <option value="Lahore Smart City">Lahore Smart City</option>
              <option value="Lahore Gardens">Lahore Gardens</option>
              <option value="Islamabad Gardens">Islamabad Gardens</option>
              <option value="Islamabad Heights">Islamabad Heights</option>
              <option value="Faisal Town">Faisal Town</option>
              <option value="Garden Town">Garden Town</option>
              <option value="Model Town">Model Town</option>
              <option value="Johar Town">Johar Town</option>
              <option value="Wapda Town">Wapda Town</option>
              <option value="Askari">Askari</option>
              <option value="Cantt">Cantt</option>
              <option value="Defence">Defence</option>
              <option value="Gulberg">Gulberg</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Marla Size</label>
            <select 
              name="marlaSize" 
              value={formData.marlaSize} 
              onChange={handleInputChange} 
              required 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Marla Size</option>
              <option value="3">3 Marla</option>
              <option value="4">4 Marla</option>
              <option value="5">5 Marla</option>
              <option value="6">6 Marla</option>
              <option value="7">7 Marla</option>
              <option value="10">10 Marla</option>
              <option value="1">1 Canal</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Price Type</label>
            <select 
              name="priceType" 
              value={formData.priceType} 
              onChange={handleInputChange} 
              required 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Price Type</option>
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Price (PKR)</label>
            <input 
              name="price" 
              type="number" 
              value={formData.price} 
              onChange={handleInputChange} 
              required 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 font-medium text-gray-700">Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              rows="4" 
              onChange={handleInputChange} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 font-medium text-gray-700">Features (comma-separated)</label>
            <input 
              name="features" 
              value={formData.features.join(', ')} 
              onChange={(e) => setFormData({...formData, features: e.target.value.split(',').map(f => f.trim())})} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              placeholder="Corner Plot, Main Boulevard, Park Facing, etc."
            />
          </div>

          {/* Contact Information */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block mb-2 font-medium text-gray-700">Contact Name</label>
                <input 
                  name="contactName" 
                  value={formData.contactName} 
                  onChange={handleInputChange} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700">Contact Phone</label>
                <input 
                  name="contactPhone" 
                  value={formData.contactPhone} 
                  onChange={handleInputChange} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700">Contact Email</label>
                <input 
                  name="contactEmail" 
                  value={formData.contactEmail} 
                  onChange={handleInputChange} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-2 flex gap-4">
            <button 
              type="submit" 
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
            >
              Update Property
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/properties')}
              className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProperty;
