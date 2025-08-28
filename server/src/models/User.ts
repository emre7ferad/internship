import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    egn: {
        type: String,
        required: true,
        unique: true
    },
    nameCyrillic: {
        type: String,
        required: true
    },
    nameLatin: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    lnch: {
        type: String,
        required: false
    },
    notifications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification'
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    modules: [{
        id: { type: String, required: true },
        label: { type: String, required: true },
        icon: { type: String, required: true },
        isActive: { type: Boolean, default: true },
        order: { type: Number, required: true },
        description: { type: String, required: true }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    profileImage: {
        type: String,
        required: false
    }
});

export default mongoose.model('User', userSchema);