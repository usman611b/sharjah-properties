import { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get('/properties');
      setProperties(res.data.data || res.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setError('Failed to load properties. Please try again.');
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteProperty = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await api.delete(`/properties/${id}`);
        setProperties(prev => prev.filter(p => p._id !== id));
        alert('Property deleted successfully!');
      } catch (error) {
        alert('Error deleting property');
      }
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading properties...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Properties</h1>
              <p className="text-gray-600">View and manage all property listings</p>
            </div>
            <Link
              to="/properties/add"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
            >
              Add New Property
            </Link>
          </div>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-red-600 mb-2">
            <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-red-800 mb-2">Connection Error</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchProperties}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Properties</h1>
            <p className="text-gray-600">View and manage all property listings</p>
          </div>
          <Link
            to="/properties/add"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
          >
            Add New Property
          </Link>
        </div>
      </div>

      {/* Properties Grid */}
      {properties.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-500 mb-6">Get started by adding your first property listing.</p>
          <Link
            to="/properties/add"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
          >
            Add Property
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(property => (
            <div key={property._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              {/* Property Image */}
              {property.images && property.images[0] && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={`https://sharjah-properties.onrender.com${property.images[0].path}`}
                    alt={property.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              
              {/* Property Details */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{property.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{property.location}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    property.priceType === 'For Sale' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {property.priceType}
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">{property.propertyType}</span>
                  <span className="text-xl font-bold text-blue-600">
                    PKR {property.price.toLocaleString()}
                  </span>
                </div>
                
                {/* Features */}
                {property.features && property.features.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {property.features.slice(0, 3).map((feature, index) => (
                        <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                          {feature}
                        </span>
                      ))}
                      {property.features.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                          +{property.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link
                    to={`/properties/edit/${property._id}`}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-sm font-medium text-center"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteProperty(property._id)}
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyList;
