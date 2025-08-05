"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * User Schema - Defines the structure and validation for User documents
 */
const userSchema = new mongoose_1.default.Schema({
    egn: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 10,
        maxlength: 10
    },
    nameCyrillic: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    nameLatin: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    lnch: {
        type: String,
        required: false,
        trim: true
    },
    notifications: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Notification'
        }],
    messages: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Message'
        }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    profileImage: {
        type: String,
        required: false,
        trim: true
    }
}, {
    timestamps: true // Adds createdAt and updatedAt automatically
});
// Index for better query performance
userSchema.index({ email: 1, username: 1, egn: 1 });
// Virtual for getting user's full name
userSchema.virtual('fullName').get(function () {
    return `${this.nameCyrillic} (${this.nameLatin})`;
});
// Ensure virtual fields are serialized
userSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
        if (ret.password) {
            delete ret.password; // Never return password in JSON
        }
        return ret;
    }
});
// Pre-save middleware for additional validation
userSchema.pre('save', function (next) {
    // Additional validation logic can go here
    next();
});
exports.default = mongoose_1.default.model('User', userSchema);
