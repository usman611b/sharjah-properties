const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sharjah';

async function updateAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB\n');

    // Import Admin model
    const Admin = require('./models/Admin');

    // Get current admin info
    const currentAdmin = await Admin.findOne({});
    if (!currentAdmin) {
      console.log('❌ No admin found in database');
      return;
    }

    console.log('📧 Current Email:', currentAdmin.email);
    console.log('');

    // Get new credentials from user
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    function askQuestion(question) {
      return new Promise((resolve) => {
        rl.question(question, (answer) => {
          resolve(answer);
        });
      });
    }

    // Ask for new credentials
    const newEmail = await askQuestion('Enter new email: ');
    const newPassword = await askQuestion('Enter new password: ');

    if (!newEmail.trim() || !newPassword.trim()) {
      console.log('❌ Email and password are required!');
      rl.close();
      return;
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword.trim(), 10);

    // Update the admin
    const updatedAdmin = await Admin.findByIdAndUpdate(
      currentAdmin._id,
      {
        email: newEmail.trim(),
        password: hashedPassword
      },
      { new: true }
    );

    if (updatedAdmin) {
      console.log('\n✅ Admin credentials updated successfully!');
      console.log('📧 New Email:', updatedAdmin.email);
      console.log('🔑 New Password:', newPassword.trim());
      console.log('⚠️  Please save this password securely!');
    } else {
      console.log('❌ Failed to update credentials');
    }

    rl.close();

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
  }
}

// Run the update
updateAdmin(); 