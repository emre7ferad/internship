import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { requireAdmin } from '../middleware/adminMiddleware';
import { getAdminStats, getAllUsers, updateUserStatus, deleteUser } from '../controllers/adminController';

const router = express.Router();

router.use(authenticateToken);
router.use(requireAdmin);

router.get('/stats', getAdminStats);

router.get('/users', getAllUsers);
router.patch('/users/:userId/status', updateUserStatus);
router.delete('/users/:userId', deleteUser);

export default router;