import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeListings: 0,
    pendingConsultations: 0,
    totalViews: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch properties for statistics
        const propertiesRes = await api.get('/properties');
        const properties = propertiesRes.data.data || propertiesRes.data;
        
        // Fetch consultations for statistics
        const consultationsRes = await api.get('/consultations');
        const consultations = consultationsRes.data.data || consultationsRes.data;
        
        // Calculate statistics
        const totalProperties = properties.length;
        const activeListings = properties.filter(p => p.priceType === 'For Sale' || p.priceType === 'For Rent').length;
        const pendingConsultations = consultations.filter(c => c.status === 'pending').length;
        
        console.log('Dashboard Data:', {
          totalProperties,
          activeListings,
          pendingConsultations,
          propertiesCount: properties.length,
          consultationsCount: consultations.length,
          properties: properties.slice(0, 2),
          consultations: consultations.slice(0, 2)
        });
        
        setStats({
          totalProperties,
          activeListings,
          pendingConsultations,
          totalViews: Math.floor(Math.random() * 5000) + 1000 // Mock data for views
        });
        
        // Create recent activity from properties and consultations
        const activity = [];
        
        // Add recent properties
        properties.slice(0, 2).forEach(property => {
          activity.push({
            type: 'property',
            message: `Property added: ${property.title}`,
            time: new Date(property.createdAt).toLocaleDateString(),
            icon: 'add'
          });
        });
        
        // Add recent consultations
        consultations.slice(0, 3).forEach(consultation => {
          activity.push({
            type: 'consultation',
            message: `Consultation request from ${consultation.name || 'Customer'}`,
            time: new Date(consultation.submittedAt).toLocaleDateString(),
            icon: 'message'
          });
        });
        
        setRecentActivity(activity);
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Set default stats if API fails
        setStats({
          totalProperties: 0,
          activeListings: 0,
          pendingConsultations: 0,
          totalViews: 0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome to Sharjah Properties Admin Panel</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Properties</p>
              <p className="text-3xl font-bold">{stats.totalProperties}</p>
            </div>
            <div className="bg-blue-400 p-3 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Active Listings</p>
              <p className="text-3xl font-bold">{stats.activeListings}</p>
            </div>
            <div className="bg-green-400 p-3 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-xl shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-medium">Pending Consultations</p>
              <p className="text-3xl font-bold">{stats.pendingConsultations}</p>
            </div>
            <div className="bg-yellow-400 p-3 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Total Views</p>
              <p className="text-3xl font-bold">{stats.totalViews.toLocaleString()}</p>
            </div>
            <div className="bg-purple-400 p-3 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
        {recentActivity.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No recent activity</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className={`p-2 rounded-full mr-4 ${
                  activity.icon === 'add' ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  <svg className={`w-5 h-5 ${
                    activity.icon === 'add' ? 'text-green-600' : 'text-blue-600'
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {activity.icon === 'add' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    )}
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.message}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => navigate('/properties/add')}
            className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-left cursor-pointer"
          >
            <div className="bg-blue-500 p-2 rounded-lg mr-4">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900">Add New Property</p>
              <p className="text-sm text-gray-500">Create a new listing</p>
            </div>
          </button>
          
          <button 
            onClick={() => navigate('/properties')}
            className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-left cursor-pointer"
          >
            <div className="bg-green-500 p-2 rounded-lg mr-4">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900">Manage Properties</p>
              <p className="text-sm text-gray-500">View all listings</p>
            </div>
          </button>
          
          <button 
            onClick={() => navigate('/consultations')}
            className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-left cursor-pointer"
          >
            <div className="bg-purple-500 p-2 rounded-lg mr-4">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900">View Consultations</p>
              <p className="text-sm text-gray-500">Check inquiries</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
