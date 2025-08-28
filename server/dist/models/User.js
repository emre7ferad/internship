"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const cloudinary_1 = require("../utils/cloudinary");
const router = express_1.default.Router();
router.post('/upload', cloudinary_1.upload.single('image'), (req, res) => {
    if (!req.file)
        return res.status(400).json({ error: 'No file uploaded' });
    res.status(200).json({ imageUrl: req.file.path });
});
const userSchema = new mongoose_1.default.Schema({
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
    lnch: {
        type: String,
        required: false
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
        required: false
    }
});
exports.default = mongoose_1.default.model('User', userSchema);
