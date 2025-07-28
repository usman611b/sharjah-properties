# 🔐 How to Change Admin Login Credentials

You can change your admin email and password in **3 different ways**. Choose the method that works best for you:

## 🚀 Method 1: Using the Admin Settings Page (Recommended)

### Step 1: Access Admin Settings
1. Log into your admin panel: `http://localhost:5173`
2. Use current credentials: `admin@gmail.com` / `123456`
3. Click on **"Settings"** in the sidebar

### Step 2: Update Credentials
1. Enter your **current email** and **current password**
2. Enter your **new email** (optional) and/or **new password** (optional)
3. If changing password, confirm the new password
4. Click **"Update Credentials"**

### Step 3: Re-login
- You'll be automatically logged out after successful update
- Log in again with your **new credentials**

## 🔧 Method 2: Using the Update Script

### Step 1: Edit the Script
1. Open `backend/updateAdmin.js`
2. Change these lines:
   ```javascript
   const NEW_EMAIL = 'your-new-email@gmail.com';  // Change this
   const NEW_PASSWORD = 'your-new-password';      // Change this
   ```

### Step 2: Run the Script
```bash
cd backend
node updateAdmin.js
```

### Step 3: Use New Credentials
- Log in with your new email and password

## 🔧 Method 3: Using the API Directly

### Step 1: Make API Request
```bash
curl -X PUT http://localhost:5000/api/admin/update-credentials \
  -H "Content-Type: application/json" \
  -d '{
    "currentEmail": "admin@gmail.com",
    "currentPassword": "123456",
    "newEmail": "newadmin@gmail.com",
    "newPassword": "newpassword123"
  }'
```

### Step 2: Use New Credentials
- Log in with your new email and password

## 📋 Step-by-Step Instructions

### For Method 1 (Admin Settings Page):

1. **Start your servers**:
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm start
   
   # Terminal 2 - Admin Panel
   cd admin-panel
   npm run dev
   ```

2. **Access admin panel**: `http://localhost:5173`

3. **Login with current credentials**:
   - Email: `admin@gmail.com`
   - Password: `123456`

4. **Navigate to Settings**:
   - Click "Settings" in the sidebar

5. **Update your credentials**:
   - Fill in current email and password
   - Enter new email and/or password
   - Confirm new password if changing
   - Click "Update Credentials"

6. **Re-login with new credentials**

## 🔒 Security Best Practices

### Password Requirements:
- **Minimum 6 characters**
- Use a combination of:
  - Uppercase letters (A-Z)
  - Lowercase letters (a-z)
  - Numbers (0-9)
  - Special characters (!@#$%^&*)

### Email Requirements:
- Must be a valid email format
- Must be unique (not already used)

### Security Tips:
- ✅ Choose a strong, unique password
- ✅ Use a real email address you control
- ✅ Keep credentials secure and private
- ✅ Don't share credentials with others
- ❌ Don't use common passwords (123456, password, etc.)
- ❌ Don't use personal information in passwords

## 🛠️ Troubleshooting

### "Current password is incorrect"
- Double-check your current password
- Make sure you're using the right email

### "New email already exists"
- Choose a different email address
- The email must be unique

### "Passwords do not match"
- Make sure both password fields are identical
- Check for extra spaces

### "Network error"
- Make sure backend server is running on port 5000
- Check your internet connection

### "Token expired"
- Simply log in again with your current credentials
- Then try updating again

## 📝 Example Credentials

### Before (Default):
- **Email**: `admin@gmail.com`
- **Password**: `123456`

### After (Example):
- **Email**: `myadmin@sharjah.com`
- **Password**: `SecurePass123!`

## 🔄 What Happens After Update

1. **Credentials Updated**: Your new email/password are saved
2. **Automatic Logout**: You're logged out for security
3. **Re-authentication**: You must log in with new credentials
4. **Session Reset**: All existing sessions are invalidated

## 🚨 Important Notes

- **Backup your credentials**: Save them securely
- **Test login**: Make sure you can log in with new credentials
- **Update documentation**: Update any saved credentials
- **Inform team**: If others use the admin panel

## 🆘 Reset to Default

If you forget your credentials, you can reset to default:

```bash
cd backend
node seedAdmin.js
```

This will reset to:
- **Email**: `admin@gmail.com`
- **Password**: `123456`

---

## ✅ Success Checklist

After changing credentials, verify:

- [ ] Can log in with new email
- [ ] Can log in with new password
- [ ] All admin functions work
- [ ] Old credentials no longer work
- [ ] Credentials are saved securely

**Your admin credentials are now updated and secure! 🔐✨** 