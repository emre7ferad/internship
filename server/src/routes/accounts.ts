import express from 'express';
import { createAccount, getAccountById, getAccountsByUser, getAccountSummary } from '../controllers/accountController';

const router = express.Router();

router.post('/', createAccount);
router.get('/:id', getAccountById);
router.get('/user/:userId', getAccountsByUser);
router.get('/:id/summary', getAccountSummary);

export default router;