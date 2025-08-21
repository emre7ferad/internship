import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { validateAccount, validateAccountUpdate, validateBalanceUpdate } from '../middleware/validation';
import { 
    createAccount, 
    getAccountById, 
    getAccountsByUser, 
    getAccountSummary,
    updateAccount,
    updateBalance,
    deactivateAccount,
    reactivateAccount,
    deleteAccount,
 } from '../controllers/accountController';

const router = express.Router();

router.use(authenticateToken);

router.post('/', validateAccount, createAccount);
router.get('/:id', getAccountById);
router.get('/user/:userId', getAccountsByUser);
router.get('/:id/summary', getAccountSummary);
router.put('/:id', validateAccountUpdate, updateAccount);
router.patch('/:id/balance', validateBalanceUpdate, updateBalance);
router.patch('/:id/deactivate', deactivateAccount);
router.patch('/:id/reactivate', reactivateAccount);
router.delete('/:id', deleteAccount);

export default router;