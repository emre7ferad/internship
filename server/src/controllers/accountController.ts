import { Request, Response } from "express";
import Account from "../models/Account";
import Transaction from "../models/Transaction";

export const createAccount = async (req: Request, res: Response): Promise<void> => {
    try {
        const { user, accountNumber, accountType, balance, startingBalance, availableBalance, feesOwed, currency, status} = req.body;
        const account = new Account ({
            user,
            accountNumber,
            accountType,
            balance,
            startingBalance,
            availableBalance,
            feesOwed,
            currency,
            status
        });
        await account.save();
        res.status(201).json(account);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message })
    }
};

export const getAccountById = async (req: Request, res: Response): Promise<void> => {
    try {
        const account = await Account.findById(req.params.id).populate('user');
        if (!account) {
            res.status(404).json({ error: "Account not found" });
            return;
        }
        res.status(200).json(account);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const getAccountsByUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const accounts = await Account.find({ user: req.params.userId});
        res.status(200).json(accounts);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const getAccountSummary = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const account = await Account.findById(id).populate('user', 'nameCyrillic email');
        const transactions = await Transaction.find({ account: id }).sort({ date: -1 }).limit(20);

        if (!account) {
            res.status(404).json({ error: 'Account not found' });
            return;
        }
        res.status(200).json({ account, transactions});
    } catch (error) {
        res.status(400).json({ error: (error as Error).message});
    }
}