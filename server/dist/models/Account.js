"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const accountSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.ObjectId, ref: 'User', required: true },
    accountNumber: { type: String, required: true, unique: true },
    accountType: { type: String, required: true },
    balance: { type: Number, default: 0 },
    startingBalance: { type: Number, default: 0 },
    availableBalance: { type: Number, default: 0 },
    feesOwed: { type: Number, default: 0 },
    currency: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, default: "active" }
});
exports.default = mongoose_1.default.model('Account', accountSchema);
