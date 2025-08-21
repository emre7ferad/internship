"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAccounts = seedAccounts;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Account_1 = __importDefault(require("../models/Account"));
const User_1 = __importDefault(require("../models/User"));
async function seedAccounts() {
    const filePath = path_1.default.join(__dirname, 'data', 'accounts.json');
    const accountsData = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
    for (const accountData of accountsData) {
        const user = await User_1.default.findOne({ username: accountData.username });
        if (!user) {
            console.warn(`User with ${accountData.username} not found. Skipping account ${accountData.accountNumber}`);
            continue;
        }
        const existingAccount = await Account_1.default.findOne({ accountNumber: accountData.accountNumber });
        if (existingAccount) {
            console.log(`Account already exists: ${accountData.accountNumber}`);
            continue;
        }
        await Account_1.default.create({
            user: user._id,
            accountNumber: accountData.accountNumber,
            accountType: accountData.accountType,
            balance: accountData.balance,
            startingBalance: accountData.startingBalance,
            availableBalance: accountData.availableBalance,
            feesOwed: accountData.feesOwed,
            currency: accountData.currency,
            status: accountData.status,
            createdAt: accountData.createdAt ? new Date(accountData.createdAt) : new Date()
        });
        console.log(`Seeded account ${accountData.accountNumber} for user ${accountData.username}`);
    }
}
