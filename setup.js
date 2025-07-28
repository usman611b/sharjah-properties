const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Sharjah Properties...\n');

// Check if Node.js is installed
try {
  const nodeVersion = execSync('node --version', { encoding: 'utf8' });
  console.log(`✅ Node.js version: ${nodeVersion.trim()}`);
} catch (error) {
  console.error('❌ Node.js is not installed. Please install Node.js first.');
  process.exit(1);
}

// Install root dependencies
console.log('\n📦 Installing root dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Root dependencies installed');
} catch (error) {
  console.error('❌ Failed to install root dependencies');
  process.exit(1);
}

// Install server dependencies
console.log('\n📦 Installing server dependencies...');
try {
  execSync('cd server && npm install', { stdio: 'inherit' });
  console.log('✅ Server dependencies installed');
} catch (error) {
  console.error('❌ Failed to install server dependencies');
  process.exit(1);
}

// Install client dependencies
console.log('\n📦 Installing client dependencies...');
try {
  execSync('cd client && npm install', { stdio: 'inherit' });
  console.log('✅ Client dependencies installed');
} catch (error) {
  console.error('❌ Failed to install client dependencies');
  process.exit(1);
}

// Create server .env file if it doesn't exist
const serverEnvPath = path.join(__dirname, 'server', '.env');
if (!fs.existsSync(serverEnvPath)) {
  console.log('\n📝 Creating server .env file...');
      const serverEnvContent = `# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/sharjah_properties

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here_change_this_in_production
JWT_EXPIRE=24h

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=usmanali611b@gmail.com
EMAIL_PASS=shan123$
ADMIN_EMAIL=usmanali611b@gmail.com

# Frontend URL
FRONTEND_URL=http://localhost:5173
`;
  
  fs.writeFileSync(serverEnvPath, serverEnvContent);
  console.log('✅ Server .env file created');
}

// Create client .env file if it doesn't exist
const clientEnvPath = path.join(__dirname, 'client', '.env');
if (!fs.existsSync(clientEnvPath)) {
  console.log('\n📝 Creating client .env file...');
  const clientEnvContent = `VITE_API_URL=http://localhost:5000/api
`;
  
  fs.writeFileSync(clientEnvPath, clientEnvContent);
  console.log('✅ Client .env file created');
}

// Create uploads directory
const uploadsDir = path.join(__dirname, 'server', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  console.log('\n📁 Creating uploads directory...');
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('✅ Uploads directory created');
}

console.log('\n🎉 Setup completed successfully!');
console.log('\n📋 Next steps:');
console.log('1. Start MongoDB (if using local database)');
console.log('2. Run "npm run dev" to start both servers');
console.log('3. Open http://localhost:5173 in your browser');
console.log('4. Access admin panel at http://localhost:5173/admin');
console.log('   - Username: admin');
console.log('   - Password: admin123');
console.log('\n📚 For more information, check the README.md file'); 