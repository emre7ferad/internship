import express from 'express';
import { 
    createTransaction, 
    getTransactionsByAccount,
    getTransactionById,
    updateTransaction,
    deleteTransaction,
    getTransactionSummary
} from '../controllers/transactionController';

const router = express.Router();

router.post('/', createTransaction);
router.get('/account/:accountId', getTransactionsByAccount );
router.get('/:id', getTransactionById);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);
router.get('/account/:accountId/summary', getTransactionSummary);

export default router;