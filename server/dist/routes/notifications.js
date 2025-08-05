"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Notification_1 = __importDefault(require("../models/Notification"));
const User_1 = __importDefault(require("../models/User"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.use(authMiddleware_1.authenticateToken);
router.post('/', async (req, res) => {
    const { userId, title, content } = req.body;
    try {
        const notification = new Notification_1.default({ user: userId, title, content });
        await notification.save();
        await User_1.default.findByIdAndUpdate(userId, { $push: { notifications: notification._id } });
        res.status(201).json({ message: 'Notification created', data: notification });
    }
    catch (err) {
        res.status(501).json({ error: 'Failed to create notification', details: err });
    }
});
router.get('/:userId', async (req, res) => {
    try {
        const notifications = await Notification_1.default.find({ user: req.params.userId })
            .sort({ date: -1 });
        res.status(200).json(notifications);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to get notifications', details: err });
    }
});
router.patch('/:id/read', async (req, res) => {
    try {
        const updated = await Notification_1.default.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
        if (!updated) {
            return res.status(404).json({ error: 'Notification not found' });
        }
        res.status(200).json({ message: 'Notification marked as read', data: updated });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to mark notification as read', details: err });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Notification_1.default.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: 'Notification not found' });
        }
        await User_1.default.findByIdAndUpdate(deleted.user, { $pull: { notifications: deleted._id } });
        res.status(200).json({ message: 'Notification deleted', data: deleted });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to delete notification', details: err });
    }
});
exports.default = router;
