import { Request, Response } from 'express';
import Transaction from '../models/Transaction';
import Account from '../models/Account';

export const createTransaction = async (req: Request, res: Response): Promise<void> => {
  const { account, type, amount } = req.body;

  try {
    const updateAmount = type === 'deposit' ? Number(amount) : -Number(amount);
    const updatedAccount = await Account.findByIdAndUpdate(
      account,
      { $inc: { balance: updateAmount } },
      { new: true }
    );

    if (!updatedAccount) {
      res.status(404).json({ error: 'Account not found' });
      return;
    }

    const transaction = new Transaction({ ...req.body });
    await transaction.save();

    res.status(201).json(transaction);

  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
