# 🏠 Sharjah Properties - Pakistan Real Estate Platform

A modern, full-stack real estate platform built for the Pakistani market, featuring a React frontend, Node.js backend with MongoDB, and a comprehensive admin panel. This platform showcases properties across Pakistan's most prestigious housing societies including DHA, Bahria Town, Gulberg, and Model Town.

## 🚀 Live Demo

- **Frontend**: [Coming Soon]
- **Admin Panel**: [Coming Soon]

## ✨ Features

### 🎨 Frontend (Client)
- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Property Listings**: Browse and search through property listings by Marla size
- **Property Details**: Detailed property pages with image galleries
- **Contact Forms**: Multiple contact forms for inquiries and viewings
- **WhatsApp Integration**: Floating WhatsApp button for instant communication
- **Toast Notifications**: Modern toast notifications for better UX
- **Pakistan Context**: Localized for Pakistani real estate market
- **Fast Performance**: Built with Vite for optimal performance
- **SEO Friendly**: Proper meta tags and semantic HTML

### 🔧 Backend (Server)
- **RESTful API**: Complete API for properties and consultations
- **MongoDB Integration**: Robust database with proper schemas
- **Image Upload**: Multer middleware for property image uploads
- **Data Validation**: Comprehensive validation for all inputs
- **Error Handling**: Proper error handling and responses
- **JWT Authentication**: Secure admin authentication system

### 👨‍💼 Admin Panel
- **Dashboard**: Real-time statistics and recent activity
- **Property Management**: Add, edit, delete properties
- **Consultation Management**: View and manage form submissions
- **Image Management**: Upload and manage property images
- **User Authentication**: Secure admin login system
- **Modern UI**: Clean admin interface with toast notifications

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router DOM** - Routing
- **Axios** - HTTP client
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Multer** - File upload middleware
- **CORS** - Cross-origin resource sharing
- **JWT** - Authentication
- **Bcrypt** - Password hashing

### Admin Panel
- **React 18** - UI framework
- **Tailwind CSS** - Styling
- **React Router DOM** - Routing
- **Axios** - HTTP client

## 📁 Project Structure

```
SHARJHA/
├── src/                    # Frontend client
│   ├── components/         # Reusable components
│   │   ├── Navbar.jsx     # Navigation
│   │   ├── Footer.jsx     # Footer
│   │   ├── PropertyCard.jsx # Property card
│   │   ├── WhatsAppButton.jsx # WhatsApp floating button
│   │   └── Toast.jsx      # Toast notifications
│   ├── pages/             # Page components
│   │   ├── Home.jsx       # Home page
│   │   ├── Properties.jsx # Properties listing
│   │   ├── PropertyDetail.jsx # Individual property
│   │   ├── About.jsx      # About page
│   │   ├── Services.jsx   # Services page
│   │   └── Contact.jsx    # Contact page
│   ├── services/          # API services
│   │   ├── api.js         # Base API configuration
│   │   ├── propertyService.js # Property API calls
│   │   ├── contactService.js # Contact form API calls
│   │   └── authService.js # Authentication service
│   ├── context/           # React context
│   │   ├── AuthContext.jsx # Authentication context
│   │   └── ToastContext.jsx # Toast notifications context
│   └── assets/            # Static assets
├── admin-panel/           # Admin panel
│   ├── src/
│   │   ├── components/    # Admin components
│   │   ├── pages/         # Admin pages
│   │   ├── services/      # Admin API services
│   │   └── context/       # Admin context
│   └── package.json
├── backend/               # Backend server
│   ├── controllers/       # Route controllers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── uploads/          # Uploaded files
│   └── server.js         # Main server file
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sharjah-properties.git
   cd sharjah-properties
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   
   # Install admin panel dependencies
   cd ../admin-panel
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # In backend folder, create .env file
   cd ../backend
   cp .env.example .env
   ```
   
   Edit `.env` file:
   ```env
   MONGO_URI=mongodb://localhost:27017/sharjah
   JWT_SECRET=your-secret-key
   PORT=5000
   ```

4. **Start the development servers**
   ```bash
   # Start backend (in backend folder)
   cd backend
   npm start
   
   # Start frontend (in root folder)
   cd ..
   npm run dev
   
   # Start admin panel (in admin-panel folder)
   cd admin-panel
   npm run dev
   ```

5. **Seed the database**
   ```bash
   cd backend
   node seedAdmin.js
   ```

## 🔐 Admin Access

### Default Credentials
- **Email**: `admin@gmail.com`
- **Password**: `123456`

### Updating Admin Credentials
```bash
cd backend
node updateAdmin.js
```

## 📱 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Admin Panel
- `npm run dev` - Start development server
- `npm run build` - Build for production

## 🌐 API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/verify` - Verify token

### Properties
- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get property by ID
- `POST /api/properties` - Add new property (Admin only)
- `PUT /api/properties/:id` - Update property (Admin only)
- `DELETE /api/properties/:id` - Delete property (Admin only)

### Consultations
- `GET /api/consultations` - Get all consultations (Admin only)
- `POST /api/consultations` - Add new consultation
- `PUT /api/consultations/:id` - Update consultation (Admin only)
- `DELETE /api/consultations/:id` - Delete consultation (Admin only)

## 🎨 Features Overview

### Property Management
- ✅ Add new properties with images
- ✅ Edit existing properties
- ✅ Delete properties
- ✅ Property categorization by Marla size
- ✅ Image gallery for each property
- ✅ Property features and amenities

### Contact & Consultation
- ✅ Contact form with validation
- ✅ Property viewing requests
- ✅ Service consultation requests
- ✅ WhatsApp integration
- ✅ Email notifications

### Admin Features
- ✅ Secure login system
- ✅ Dashboard with statistics
- ✅ Property management interface
- ✅ Consultation management
- ✅ Image upload and management
- ✅ Modern toast notifications

### User Experience
- ✅ Responsive design
- ✅ Smooth animations
- ✅ Modern toast notifications
- ✅ Loading states
- ✅ Error handling
- ✅ Form validation

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Database
MONGO_URI=mongodb://localhost:27017/sharjah

# JWT
JWT_SECRET=your-secret-key-here

# Server
PORT=5000

# Optional: Cloud MongoDB
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/sharjah
```

## 🚀 Deployment

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service

### Backend Deployment
1. Set up environment variables
2. Install dependencies: `npm install`
3. Start the server: `npm start`

### Database Setup
1. Set up MongoDB (local or cloud)
2. Update the `MONGO_URI` in your environment variables
3. Run the seed script: `node seedAdmin.js`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Usman Ali**
- Email: usmanali611b@gmail.com
- GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- MongoDB for the database
- All the open-source packages used in this project

---

⭐ **Star this repository if you found it helpful!** 