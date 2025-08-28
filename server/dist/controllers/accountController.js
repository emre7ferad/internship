"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccount = exports.reactivateAccount = exports.deactivateAccount = exports.updateBalance = exports.updateAccount = exports.getAccountSummary = exports.getAccountsByUser = exports.getAccountById = exports.createAccount = void 0;
const Account_1 = __importDefault(require("../models/Account"));
const Transaction_1 = __importDefault(require("../models/Transaction"));
//TO DO - Emhanced Account Controller (Step 3 in latest chat with Cursor)
const createAccount = async (req, res) => {
    try {
        const { user, accountNumber, accountType, balance, startingBalance, availableBalance, feesOwed, currency, status } = req.body;
        const account = new Account_1.default({
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
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.createAccount = createAccount;
const getAccountById = async (req, res) => {
    try {
        const account = await Account_1.default.findById(req.params.id).populate('user');
        if (!account) {
            res.status(404).json({ error: "Account not found" });
            return;
        }
        res.status(200).json(account);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getAccountById = getAccountById;
const getAccountsByUser = async (req, res) => {
    try {
        const accounts = await Account_1.default.find({ user: req.params.userId });
        res.status(200).json(accounts);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getAccountsByUser = getAccountsByUser;
const getAccountSummary = async (req, res) => {
    try {
        const { id } = req.params;
        const account = await Account_1.default.findById(id).populate('user', 'nameCyrillic email');
        const transactions = await Transaction_1.default.find({ account: id }).sort({ date: -1 }).limit(20);
        if (!account) {
            res.status(404).json({ error: 'Account not found' });
            return;
        }
        res.status(200).json({ account, transactions });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getAccountSummary = getAccountSummary;
const updateAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const account = await Account_1.default.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (!account) {
            res.status(404).json({ error: 'Account not found' });
            return;
        }
        res.status(200).json(account);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.updateAccount = updateAccount;
const updateBalance = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, type, description } = req.body;
        const account = await Account_1.default.findById(id);
        if (!account) {
            res.status(404).json({ error: 'Account not found' });
            return;
        }
        switch (type) {
            case 'deposit':
                account.balance += amount;
                account.availableBalance += amount;
                break;
            case 'withdrawal':
                if (account.availableBalance < amount) {
                    res.status(400).json({ error: 'Insufficient funds' });
                    return;
                }
                account.balance -= amount;
                account.availableBalance -= amount;
                break;
            case 'transfer':
                account.balance += amount;
                account.availableBalance += amount;
                break;
            default:
                res.status(400).json({ error: 'Invalid transaction type' });
                return;
        }
        await account.save();
        const transaction = new Transaction_1.default({
            account: id,
            date: new Date(),
            type,
            amount,
            currenct: account.currency,
            description: description || `${type} transaction`
        });
        await transaction.save();
        res.status(200).json(account);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.updateBalance = updateBalance;
const deactivateAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const account = await Account_1.default.findByIdAndUpdate(id, { status: 'inactive' }, { new: true });
        if (!account) {
            res.status(404).json({ error: 'Account not found' });
            return;
        }
        res.status(200).json(account);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.deactivateAccount = deactivateAccount;
const reactivateAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const account = await Account_1.default.findByIdAndUpdate(id, { status: 'active' }, { new: true });
        if (!account) {
            res.status(404).json({ error: 'Account not found' });
            return;
        }
        res.status(200).json(account);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.reactivateAccount = reactivateAccount;
const deleteAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const account = await Account_1.default.findByIdAndDelete(id);
        if (!account) {
            res.status(404).json({ error: 'Account not found' });
            return;
        }
        await Transaction_1.default.deleteMany({ account: id });
        res.status(200).json({ message: 'Account deleted successfully' });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.deleteAccount = deleteAccount;
