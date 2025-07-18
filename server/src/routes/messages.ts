import express from 'express';
import Message from '../models/Message';
import User from '../models/User';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authenticateToken);

router.post('/send', async (req, res) => {
    const { from, to, content} = req.body;

    try {
        const message = new Message({ from, to, content});
        await message.save();

        await User.findByIdAndUpdate(to, { $push: { messages: message._id } });
        await User.findByIdAndUpdate(from, { $push: { messages: message._id} });

        res.status(201).json({ message: 'Message was sent successfully', data: message });
    } catch (err) {
        res.status(500).json({ Message: 'Failed to send message', details: err });
    }
});

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const userMessages = await Message.find({ $or: [{ from: userId }, { to: userId }] })
            .populate('from', 'username')
            .populate('to', 'username')
            .sort({ date: -1});

        res.status(200).json(userMessages);
    } catch (err) {
        res.status(500).json({ error: 'Failed to get messages', detail: err});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Message.findByIdAndDelete(req.params.id);

        if(!deleted) {
            res.status(404).json({error: 'Message not found' });
        }

        res.status(200).json({ message: "Message deleted", data: deleted});
    } catch(err) {
        res.status(500).json({error: 'Failed to delete message', details: err});
    }
})
export default router;