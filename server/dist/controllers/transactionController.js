"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionSummary = exports.deleteTransaction = exports.updateTransaction = exports.getTransactionById = exports.getTransactionsByAccount = exports.createTransaction = void 0;
const Transaction_1 = __importDefault(require("../models/Transaction"));
const Account_1 = __importDefault(require("../models/Account"));
const createTransaction = async (req, res) => {
    try {
        const { account, type, amount, currency, description } = req.body;
        const updateAmount = type === 'deposit' ? Number(amount) : -Number(amount);
        const accountDoc = await Account_1.default.findById(account);
        if (!accountDoc) {
            res.status(404).json({ error: "Account not found " });
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
        const transaction = new Transaction_1.default({
            account,
            type,
            amount,
            currency,
            description
        });
        await transaction.save();
        res.status(201).json(transaction);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.createTransaction = createTransaction;
const getTransactionsByAccount = async (req, res) => {
    try {
        const { accountId } = req.params;
        const transactions = await Transaction_1.default.find({ account: accountId })
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
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getTransactionsByAccount = getTransactionsByAccount;
const getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction_1.default.findById(req.params.id).populate('account');
        if (!transaction) {
            res.status(404).json({ error: 'Transaction not found' });
            return;
        }
        res.status(200).json(transaction);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getTransactionById = getTransactionById;
const updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const transaction = await Transaction_1.default.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (!transaction) {
            res.status(404).json({ error: 'Transaction not found' });
            return;
        }
        res.status(200).json(transaction);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.updateTransaction = updateTransaction;
const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction_1.default.findByIdAndDelete(id);
        if (!transaction) {
            res.status(404).json({ error: 'Transaction not found' });
            return;
        }
        res.status(200).json({ message: 'Transaction deleted successfully' });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.deleteTransaction = deleteTransaction;
const getTransactionSummary = async (req, res) => {
    try {
        const { accountId } = req.params;
        const transactions = await Transaction_1.default.find({ account: accountId });
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
                if (t.type === 'deposit')
                    return sum + t.amount;
                if (t.type === 'withdrawal')
                    return sum - t.amount;
                return sum + t.amount;
            }, 0)
        };
        res.status(200).json(summary);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getTransactionSummary = getTransactionSummary;
