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
      .sort({ date: -1 })
      .populate('account', 'accountNumber');
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};