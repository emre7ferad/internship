"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
router.post('/', validation_1.validateRegister, async (req, res) => {
    try {
        const { egn, nameCyrillic, nameLatin, email, phone, address, username, password, isAdmin, lnch } = req.body;
        if (await User_1.default.findOne({ email })) {
            return res.status(400).json({ error: "Имейлът вече съществува" });
        }
        if (await User_1.default.findOne({ username })) {
            return res.status(400).json({ error: 'Потребителското име вече съществува' });
        }
        if (await User_1.default.findOne({ egn })) {
            return res.status(400).json({ error: 'Потребител с това ЕГН вече съществува' });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = new User_1.default({
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
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        }
        else {
            res.status(400).json({ error: 'Възникна неизвестна грешка' });
        }
    }
});
exports.default = router;
