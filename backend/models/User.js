import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    email: {
        type: String, 
        required: true,
        unique: true,
        lowercase: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    mobile: {
        type: String,
        required: true,
        match: /^[0-9]{8}$/,
    },
    password: {
        type: String, 
        required: true,
        minlength: 6
    },
})


export default mongoose.model('User', UserSchema);