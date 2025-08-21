import express from 'express';
import { login, logout } from '../controllers/authController';
import { validateLogin } from '../middleware/validation';

const router = express.Router();

router.post('/login', validateLogin, login);

router.post('/logout', logout);

export default router; 