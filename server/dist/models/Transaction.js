"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const transactionSchema = new mongoose_1.default.Schema({
    account: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    type: {
        type: String,
        enum: ['deposit', 'withdrawal', 'transfer'],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
});
exports.default = mongoose_1.default.model('Transaction', transactionSchema);
