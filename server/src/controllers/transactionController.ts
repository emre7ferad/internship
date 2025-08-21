import { Request, Response } from 'express';
import Transaction from '../models/Transaction';
import Account from '../models/Account';

export const createTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { account, type, amount, currency, description } = req.body;
    const updateAmount = type === 'deposit' ? Number(amount) : -Number(amount);

    const accountDoc = await Account.findById(account);
    if (!accountDoc) {
      res.status(404).json({ error: "Account not found "});
      return;
    }

    if (type !== 'deposit' && accountDoc.availableBalance < Math.abs(updateAmount)) {
      res.status(400).json({ error: "Insufficient available balance" });
      return;
    }

    if (accountDoc.currency !== req.body.currency) {
      res.status(400).json({ error: "Currency mismatch with account" });
      return;
    }

    accountDoc.balance += updateAmount;
    accountDoc.availableBalance += updateAmount;
    await accountDoc.save();

    const transaction = new Transaction({
      account,
      type,
      amount,
      currency,
      description
    });
    await transaction.save();

    res.status(201).json(transaction)

  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};


export const getTransactionsByAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const { accountId } = req.params;

    const transactions = await Transaction.find({ account: accountId })
      .populate({
        path: 'account',
        populate: {
          path: 'user',
          select: 'nameCyrillic'
        }
      })
      .populate({
        path: 'senderAccount',
        populate: {
          path: 'user',
          select: 'nameCyrillic'
        }
      })
      .populate({
        path: 'receiverAccount',
        populate: {
          path: 'user',
          select: 'nameCyrillic'
        }
      })
      .sort({ date: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getTransactionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const transaction = await Transaction.findById(req.params.id).populate('account');
    if (!transaction) {
      res.status(404).json({ error: 'Transaction not found' });
      return;
    }
    res.status(200).json(transaction)
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const updateTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const transaction = await Transaction.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!transaction) {
      res.status(404).json({ error: 'Transaction not found' });
      return;
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const deleteTransaction = async (req: Request, res: Response): Promise<void> => {
  try{
    const { id } = req.params;

    const transaction = await Transaction.findByIdAndDelete(id);

    if (!transaction) {
      res.status(404).json({ error: 'Transaction not found' });
      return;
    }
    
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getTransactionSummary = async (req: Request, res: Response): Promise<void> => {
  try {
    const { accountId } = req.params;

    const transactions = await Transaction.find({ account: accountId });

    const summary = {
      totalDeposits: transactions
        .filter(t => t.type === 'deposit')
        .reduce((sum, t) => sum + t.amount, 0),
      totalWithdrawals: transactions
        .filter(t => t.type === 'withdrawal')
        .reduce((sum, t) => sum + t.amount, 0),
      totalTransfers: transactions
        .filter(t => t.type === 'transfer')
        .reduce((sum, t) => sum + t.amount, 0),
      balance: transactions
        .reduce((sum, t) => {
          if (t.type === 'deposit') return sum + t.amount;
          if (t.type === 'withdrawal') return sum - t.amount;
          return sum + t.amount;
        }, 0)
    };

    res.status(200).json(summary);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};