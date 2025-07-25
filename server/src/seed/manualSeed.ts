import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';
import { seedUsers } from './seedUsers';

dotenv.config();

async function run() {
    try {
        await mongoose.connect(process.env.MONGO_URI || '');
        console.log('Connected to MongoDB');
        await seedUsers();
        console.log('Seeding completed');
        process.exit(0);        
    } catch (err) {
        console.error('Seeding failed');
        process.exit(1);
    }
}

run();