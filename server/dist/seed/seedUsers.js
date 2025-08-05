"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedUsers = seedUsers;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
async function seedUsers() {
    const filePath = path_1.default.join(__dirname, 'data', 'users.json');
    const users = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
    for (const user of users) {
        const exist = await User_1.default.findOne({ username: user.username });
        if (exist) {
            console.log(`User already exist: ${user.username}`);
            continue;
        }
        const hashedPassword = await bcryptjs_1.default.hash(user.password, 10);
        await User_1.default.create({
            ...user,
            password: hashedPassword,
        });
        console.log(`Seeded user: ${user.username}`);
    }
}
