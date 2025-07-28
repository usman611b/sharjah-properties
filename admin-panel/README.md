# Sharjah Properties Admin Panel

A secure admin panel for managing property listings and consultations.

## Features

- 🔐 **Secure Authentication**: JWT-based authentication system
- 🏠 **Property Management**: Add, edit, delete, and view properties
- 💬 **Consultation Management**: View and manage customer consultations
- 📊 **Dashboard**: Overview of properties and consultations
- 🎨 **Modern UI**: Clean and responsive design with Tailwind CSS

## Authentication

The admin panel uses JWT (JSON Web Tokens) for secure authentication:

- **Login**: `/login` - Secure admin login page
- **Protected Routes**: All admin routes require authentication
- **Auto Logout**: Automatic logout on token expiration or invalid tokens
- **Session Management**: Persistent login sessions

## Default Credentials

- **Email**: `admin@gmail.com`
- **Password**: `123456`

## Updating Admin Credentials

To change admin credentials, use this simple method:

```bash
cd backend
node updateAdmin.js
```

The script will:
1. Show your current email
2. Ask for new email and password
3. Update the credentials instantly
4. Show you the new credentials

**You can run this unlimited times to update credentials whenever you want!**

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB running locally or remotely
- Backend server running on port 5000

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

### Backend Setup

Make sure the backend server is running:

1. Navigate to the backend directory:
   ```bash
   cd ../backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Seed the admin user (if not already done):
   ```bash
   node seedAdmin.js
   ```

## Security Features

- **JWT Tokens**: Secure token-based authentication
- **Protected Routes**: All admin routes are protected
- **Token Expiration**: Tokens expire after 24 hours
- **Auto Logout**: Automatic logout on authentication errors
- **Input Validation**: Server-side validation for all inputs
- **Error Handling**: Comprehensive error handling and user feedback

## API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/verify` - Verify token

> **Note**: Admin credentials are now updated using direct database scripts instead of the frontend interface.

### Properties
- `GET /api/properties` - Get all properties
- `POST /api/properties` - Add new property
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property

### Consultations
- `GET /api/consultations` - Get all consultations
- `POST /api/consultations` - Add new consultation

## File Structure

```
admin-panel/
├── src/
│   ├── components/
│   │   ├── ProtectedRoute.jsx    # Route protection component
│   │   └── sidebar.jsx           # Navigation sidebar
│   ├── pages/
│   │   ├── Login.jsx             # Login page
│   │   ├── Dashboard.jsx         # Dashboard page
│   │   ├── PropertyList.jsx      # Property management
│   │   ├── AddProperty.jsx       # Add property form
│   │   ├── EditProperty.jsx      # Edit property form
│   │   └── Consultations.jsx     # Consultation management
│   ├── services/
│   │   └── api.js                # API service with auth interceptors
│   └── App.jsx                   # Main app component
└── package.json
```

## Troubleshooting

### Common Issues

1. **Login not working**: Make sure the backend server is running and the admin user is seeded
2. **Token expired**: Simply log in again - tokens expire after 24 hours
3. **Network errors**: Check if the backend server is running on port 5000
4. **CORS errors**: Ensure the backend has CORS properly configured

### Reset Admin Password

To reset the admin password, run the seed script again:

```bash
cd backend
node seedAdmin.js
```

This will create a new admin user with the default credentials.

## Development

### Adding New Protected Routes

1. Add the route to `App.jsx`
2. Wrap it with `<ProtectedRoute>` component
3. The authentication will be handled automatically

### API Calls

Use the `api` service from `src/services/api.js` for all API calls. It automatically:
- Adds authentication headers
- Handles token expiration
- Redirects to login on auth errors

Example:
```javascript
import api from '../services/api';

// GET request
const response = await api.get('/properties');

// POST request
const response = await api.post('/properties', data);
```
