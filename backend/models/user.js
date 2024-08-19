const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    name: {
        first_name: { 
            type: String, 
            required: true,
            default: null},
        last_name: { 
            type: String, 
            required: true,
            default: null},
    },
    email: { 
        type: String, 
        required: true,
        unique: true},
    password: { 
        type: String,
        required: true
    },
    refreshToken: [String],
});

module.exports = mongoose.model("User", userSchema);