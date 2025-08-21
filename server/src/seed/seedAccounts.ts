import fs from 'fs'
import path from 'path'
import Account from '../models/Account'
import User from '../models/User'

export async function seedAccounts() {
    const filePath = path.join(__dirname, 'data', 'accounts.json');
    const accountsData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    for (const accountData of accountsData) {
        const user = await User.findOne({ username: accountData.username });

        if (!user) {
            console.warn(`User with ${accountData.username} not found. Skipping account ${accountData.accountNumber}`);
            continue;
        }

        const existingAccount = await Account.findOne({ accountNumber: accountData.accountNumber });

        if (existingAccount) {
            console.log(`Account already exists: ${accountData.accountNumber}`);
            continue;
        }

        await Account.create({
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