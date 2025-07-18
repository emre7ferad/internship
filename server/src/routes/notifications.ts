import express from 'express';
import Notification from "../models/Notification";
import User from "../models/User";
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authenticateToken);

router.post('/', async (req, res) => {
    const { userId, content } = req.body;

    try {
        const notification = new Notification({ user: userId, content });
        await notification.save();

        await User.findByIdAndUpdate(userId, { $push: { notifications: notification._id } });

        res.status(201).json({ message: 'Notification created', data: notification });
    } catch(err) {
        res.status(501).json({ error: 'Failed to create notification', details: err});
    }
});

router.get('/:userId', async (req, res) => {
    try{
        const notifications = await Notification.find({ user: req.params.userId })
            .sort({ date: -1});

        res.status(200).json(notifications)
    } catch (err) {
        res.status(500).json({ error: 'Failed to get notifications', details: err });
    }
});

router.patch('/:id/read', async (req, res) => {
    try {
        const updated = await Notification.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ error: 'Notification not found' });
        }

        res.status(200).json({ message: 'Notification marked as read', data: updated });
    } catch(err) {
        res.status(500).json({ error: 'Failed to mark notification as read', details: err});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Notification.findByIdAndDelete(req.params.id);

        if(!deleted){
            return res.status(404).json({ error: 'Notification not found' });
        }

        await User.findByIdAndUpdate(deleted.user, { $pull: { notifications: deleted._id } });

        res.status(200).json({ message: 'Notification deleted', data: deleted});
    } catch(err) {
        res.status(500).json({ error: 'Failed to delete notification', details: err});
    }
})

export default router;