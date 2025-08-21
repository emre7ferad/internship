import express from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import { validateRegister } from '../middleware/validation';

const router = express.Router();

router.post('/', validateRegister, async (req, res) => {
    try {
        const {
            egn,
            nameCyrillic,
            nameLatin,
            email,
            phone, 
            address,
            username,
            password,
            isAdmin,
            lnch
        } = req.body;

        if (await User.findOne({ email })) {
            return res.status(400).json({ error: "Имейлът вече съществува"})
        }
        if (await User.findOne({ username })) {
            return res.status(400).json({ error: 'Потребителското име вече съществува'})
        }
        if (await User.findOne({ egn })) {
            return res.status(400).json({ error: 'Потребител с това ЕГН вече съществува'})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            egn,
            nameCyrillic,
            nameLatin,
            email,
            phone,
            address,
            username,
            password: hashedPassword,
            isAdmin,
            lnch
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch(err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(400).json({ error: 'Възникна неизвестна грешка' })
        }
    }
});

export default router;