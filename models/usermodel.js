const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        required: [true, 'role is required'],
        enum: ['admin', 'organisation', 'donor', 'hospital'] // Ensure spelling is consistent here
    },
    name: {
        type: String,
        required: function() {
            return this.role === 'admin'; // Updated to only check for 'admin' if 'user' is not part of your roles
        }
    },
    organisationName: {
        type: String,
        required: function() {
            return this.role === 'organisation';
        }
    },
    hospitalName: {
        type: String,
        required: function() {
            return this.role === 'hospital';
        }
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    website: {
        type: String
    },
    address: {
        type: String,
        required: [true, 'address is required'],
    },
    phone: {
        type: String,
        required: [true, 'phone no is required'],
    },
}, { timestamps: true });

// Check if the model already exists, and only define it if it does not
module.exports = mongoose.models.users || mongoose.model('users', userSchema);
