"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccountSummary = exports.getAccountsByUser = exports.getAccountById = exports.createAccount = void 0;
const Account_1 = __importDefault(require("../models/Account"));
const Transaction_1 = __importDefault(require("../models/Transaction"));
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
