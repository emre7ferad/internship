import express from 'express';
import { createTransaction, getTransactionsByAccount } from '../controllers/transactionController';

const router = express.Router();

router.post('/', createTransaction);
router.get('/account/:accountId', getTransactionsByAccount );

export default router;