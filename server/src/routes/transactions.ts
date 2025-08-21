import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { validateTransaction, validateTransactionUpdate } from '../middleware/validation';
import { 
    createTransaction, 
    getTransactionsByAccount,
    getTransactionById,
    updateTransaction,
    deleteTransaction,
    getTransactionSummary
} from '../controllers/transactionController';

const router = express.Router();

router.use(authenticateToken);

router.post('/', validateTransaction, createTransaction);
router.get('/account/:accountId', getTransactionsByAccount );
router.get('/:id', getTransactionById);
router.put('/:id', validateTransactionUpdate, updateTransaction);
router.delete('/:id', deleteTransaction);
router.get('/account/:accountId/summary', getTransactionSummary);

export default router;