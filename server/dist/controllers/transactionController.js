"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionsByAccount = exports.createTransaction = void 0;
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
            .sort({ date: -1 })
            .populate('account', 'accountNumber');
        res.status(200).json(transactions);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getTransactionsByAccount = getTransactionsByAccount;
