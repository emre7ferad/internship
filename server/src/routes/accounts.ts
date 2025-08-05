import express from 'express';
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

router.post('/', createAccount);
router.get('/:id', getAccountById);
router.get('/user/:userId', getAccountsByUser);
router.get('/:id/summary', getAccountSummary);
router.put('/:id', updateAccount);
router.patch('/:id/balance', updateBalance);
router.patch('/:id/deactivate', deactivateAccount);
router.patch('/:id/reactivate', reactivateAccount);
router.delete('/:id', deleteAccount);

export default router;