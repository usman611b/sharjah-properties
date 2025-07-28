const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('./models/Admin');

mongoose.connect('mongodb://127.0.0.1:27017/sharjah')
  .then(async () => {
    const hashedPassword = await bcrypt.hash('123456', 10);

    const admin = new Admin({
      email: 'admin@gmail.com',
      password: hashedPassword
    });

    await admin.save();
    console.log('✅ Admin created!');
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
