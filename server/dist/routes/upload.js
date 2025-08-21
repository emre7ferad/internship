"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cloudinary_1 = require("../utils/cloudinary");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
/**
 * Upload profile image
 * POST /api/upload/profile-image
 */
router.post('/profile-image', authMiddleware_1.authenticateToken, cloudinary_1.upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                error: 'No file uploaded',
                code: 'NO_FILE'
            });
        }
        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(req.file.mimetype)) {
            return res.status(400).json({
                error: 'Invalid file type. Only JPEG, PNG, and GIF are allowed.',
                code: 'INVALID_FILE_TYPE'
            });
        }
        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (req.file.size > maxSize) {
            return res.status(400).json({
                error: 'File too large. Maximum size is 5MB.',
                code: 'FILE_TOO_LARGE'
            });
        }
        res.status(200).json({
            imageUrl: req.file.path,
            message: 'File uploaded successfully'
        });
    }
    catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            error: 'Failed to upload file',
            code: 'UPLOAD_ERROR'
        });
    }
});
/**
 * Upload document
 * POST /api/upload/document
 */
router.post('/document', authMiddleware_1.authenticateToken, cloudinary_1.upload.single('document'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                error: 'No file uploaded',
                code: 'NO_FILE'
            });
        }
        // Validate file type for documents
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
        if (!allowedTypes.includes(req.file.mimetype)) {
            return res.status(400).json({
                error: 'Invalid file type. Only PDF, JPEG, and PNG are allowed.',
                code: 'INVALID_FILE_TYPE'
            });
        }
        // Validate file size (max 10MB for documents)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (req.file.size > maxSize) {
            return res.status(400).json({
                error: 'File too large. Maximum size is 10MB.',
                code: 'FILE_TOO_LARGE'
            });
        }
        res.status(200).json({
            documentUrl: req.file.path,
            message: 'Document uploaded successfully'
        });
    }
    catch (error) {
        console.error('Document upload error:', error);
        res.status(500).json({
            error: 'Failed to upload document',
            code: 'UPLOAD_ERROR'
        });
    }
});
exports.default = router;
