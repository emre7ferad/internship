import mongoose from "mongoose";
import express, { Request, Response } from 'express';
import { upload } from "../utils/cloudinary";

const router = express.Router();

router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    res.status(200).json({ imageUrl: req.file.path });
})

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
    lnch: {
        type: String,
        required: false
    },
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