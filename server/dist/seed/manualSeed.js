"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const seedUsers_1 = require("./seedUsers");
const seedAccounts_1 = require("./seedAccounts");
dotenv_1.default.config();
async function run() {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI || '');
        console.log('Connected to MongoDB');
        await (0, seedUsers_1.seedUsers)();
        console.log('User seeding completed');
        await (0, seedAccounts_1.seedAccounts)();
        console.log('Account seeding completed');
        process.exit(0);
    }
    catch (err) {
        console.error('Seeding failed', err);
        process.exit(1);
    }
}
run();
