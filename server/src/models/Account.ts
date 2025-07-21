import mongoose from "mongoose";

const accountSchema = new mongoose.Schema ({
    user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    accountNumber: { type: String, required: true, unique: true },
    accountType: { type: String, required: true},
    balance: { type: Number, default: 0 },
    currency: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, default: "active" }
});

export default mongoose.model('Account', accountSchema);