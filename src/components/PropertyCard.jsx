import { motion } from 'framer-motion'
import { Heart, MapPin, Bed, Bath, Square } from 'lucide-react'
import { Link } from 'react-router-dom'

const PropertyCard = ({ property }) => {
  // Get the first image or use a placeholder
  const mainImage = property.images && property.images.length > 0 
    ? `http://localhost:5000${property.images[0].path}`
    : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'

  // Format price in PKR
  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `PKR ${(price / 10000000).toFixed(1)} Crore`
    } else if (price >= 100000) {
      return `PKR ${(price / 100000).toFixed(1)} Lac`
    } else {
      return `PKR ${price.toLocaleString()}`
    }
  }

  // Get Marla size display
  const getMarlaDisplay = (marlaSize) => {
    if (marlaSize === 1) return '1 Canal'
    return `${marlaSize} Marla`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={mainImage}
          alt={property.title}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <div className="px-3 py-1 bg-primary-600 text-white text-sm font-semibold rounded-full">
            {property.priceType}
          </div>
        </div>
        
        {/* Marla Size Badge */}
        <div className="absolute top-4 right-4">
          <div className="flex items-center space-x-1 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
            <span className="text-sm font-semibold text-gray-800">
              {getMarlaDisplay(property.marlaSize)}
            </span>
          </div>
        </div>
        
        {/* Favorite Button */}
        <button className="absolute top-4 right-20 p-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:bg-red-50 transition-colors duration-200">
          <Heart size={16} className="text-gray-600 hover:text-red-500 transition-colors duration-200" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title and Location */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
            {property.title}
          </h3>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin size={14} className="mr-1" />
            <span>{property.society}, {property.location}</span>
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <span className="text-2xl font-bold gradient-text">
            {formatPrice(property.price)}
          </span>
        </div>

        {/* Property Features */}
        {property.features && property.features.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {property.features.slice(0, 3).map((feature, index) => (
                <span key={index} className="px-2 py-1 bg-primary-50 text-primary-600 text-xs rounded-full">
                  {feature}
                </span>
              ))}
              {property.features.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{property.features.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Property Type */}
        <div className="mb-6">
          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
            {property.propertyType}
          </span>
        </div>

        {/* Action Button */}
        <Link
          to={`/properties/${property._id}`}
          className="btn-primary w-full text-center group-hover:scale-105 transition-transform duration-200"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  )
}

export default PropertyCard 