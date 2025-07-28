import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Grid, List } from 'lucide-react'
import PropertyCard from '../components/PropertyCard'
import { propertyService } from '../services/propertyService'

const Properties3To4Marla = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSociety, setSelectedSociety] = useState('')
  const [selectedPriceType, setSelectedPriceType] = useState('')
  const [viewMode, setViewMode] = useState('grid')

  // Fetch 3-4 Marla properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true)
        const data = await propertyService.get3To4MarlaProperties()
        setProperties(data)
      } catch (error) {
        console.error('Error fetching 3-4 Marla properties:', error)
        setProperties([])
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  // Filter properties based on search and filters
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.society.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSociety = !selectedSociety || property.society === selectedSociety
    const matchesPriceType = !selectedPriceType || property.priceType === selectedPriceType
    
    return matchesSearch && matchesSociety && matchesPriceType
  })

  // Get unique societies for filter
  const societies = [...new Set(properties.map(p => p.society))].sort()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading 3-4 Marla properties...</div>
      </div>
    )
  }

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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">3-4 Marla Properties</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the perfect 3-4 Marla properties in Pakistan's most prestigious housing societies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search properties..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Society Filter */}
              <div>
                <select
                  value={selectedSociety}
                  onChange={(e) => setSelectedSociety(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">All Societies</option>
                  {societies.map(society => (
                    <option key={society} value={society}>{society}</option>
                  ))}
                </select>
              </div>

              {/* Price Type Filter */}
              <div>
                <select
                  value={selectedPriceType}
                  onChange={(e) => setSelectedPriceType(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">All Types</option>
                  <option value="For Sale">For Sale</option>
                  <option value="For Rent">For Rent</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredProperties.length} Properties Found
              </h2>
              <p className="text-gray-600">Showing 3-4 Marla properties</p>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-white rounded-lg shadow-sm p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>

          {/* Properties Grid */}
          {filteredProperties.length > 0 ? (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredProperties.map((property, index) => (
                <motion.div
                  key={property._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search size={64} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Properties Found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Properties3To4Marla 