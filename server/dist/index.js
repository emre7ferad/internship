"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./routes/users"));
const auth_1 = __importDefault(require("./routes/auth"));
const messages_1 = __importDefault(require("./routes/messages"));
const notifications_1 = __importDefault(require("./routes/notifications"));
const accounts_1 = __importDefault(require("./routes/accounts"));
const transactions_1 = __importDefault(require("./routes/transactions"));
const errorHandler_1 = require("./utils/errorHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/fibank';
const URL = process.env.CLIENT_URL;
mongoose_1.default.connect(uri)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log('MongoDB connection error', err));
app.use((0, cors_1.default)({
    origin: URL,
    credentials: true
}));
app.use(express_1.default.json());
app.use('/api/users', users_1.default);
app.use('/api/auth', auth_1.default);
app.use('/api/messages', messages_1.default);
app.use('/api/notifications', notifications_1.default);
app.use('/api/accounts', accounts_1.default);
app.use('/api/transactions', transactions_1.default);
app.get('/', (_req, res) => {
    res.send('API is running...');
});
// Fallback 404 for unmatched routes
app.use((_req, res) => {
    res.status(404).json({ success: false, error: 'Not found' });
});
// Global error handler (uses errorHandler.ts)
app.use((err, _req, res, _next) => {
    (0, errorHandler_1.sendErrorResponse)(res, err);
});
app.listen(PORT, () => {
    console.log(`Server running on ${URL}:${PORT}`);
});
