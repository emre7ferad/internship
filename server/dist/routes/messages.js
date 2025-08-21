"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Message_1 = __importDefault(require("../models/Message"));
const User_1 = __importDefault(require("../models/User"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.use(authMiddleware_1.authenticateToken);
router.post('/send', async (req, res) => {
    const { from, to, content } = req.body;
    try {
        const message = new Message_1.default({ from, to, content });
        await message.save();
        await User_1.default.findByIdAndUpdate(to, { $push: { messages: message._id } });
        await User_1.default.findByIdAndUpdate(from, { $push: { messages: message._id } });
        res.status(201).json({ message: 'Message was sent successfully', data: message });
    }
    catch (err) {
        res.status(500).json({ Message: 'Failed to send message', details: err });
    }
});
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const userMessages = await Message_1.default.find({ $or: [{ from: userId }, { to: userId }] })
            .populate('from', 'username')
            .populate('to', 'username')
            .sort({ date: -1 });
        res.status(200).json(userMessages);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to get messages', detail: err });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Message_1.default.findByIdAndDelete(req.params.id);
        if (!deleted) {
            res.status(404).json({ error: 'Message not found' });
        }
        res.status(200).json({ message: "Message deleted", data: deleted });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to delete message', details: err });
    }
});
exports.default = router;
