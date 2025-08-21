import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import User from '../models/User';

export async function seedUsers() {
    const filePath = path.join(__dirname, 'data', 'users.json');

    const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    for (const user of users) {
        const exist = await User.findOne({ username: user.username });
        if (exist) {
            console.log(`User already exist: ${user.username}`);
            continue;
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);

        await User.create({
            ...user,
            password: hashedPassword,
        });

        console.log(`Seeded user: ${user.username}`);
    }
}