import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { seedUsers } from './seedUsers';
import { seedAccounts } from './seedAccounts';

dotenv.config();

async function run() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || '');
        console.log('Connected to MongoDB');

        await seedUsers();
        console.log('User seeding completed');

        await seedAccounts();
        console.log('Account seeding completed')

        process.exit(0);        
    } catch (err) {
        console.error('Seeding failed', err);
        process.exit(1);
    }
}

run();