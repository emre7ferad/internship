import mongoose, { Document, Schema} from "mongoose";

export interface ITransaction extends Document {
    account: mongoose.Types.ObjectId;
    date: Date;
    type: 'deposit' | 'withdrawal' | 'transfer';
    amount: number;
    currency: string;
    description: string;
}

const transactionSchema: Schema = new mongoose.Schema ({
    account: {
        type: mongoose.Schema.Types.ObjectId,
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

export default mongoose.model<ITransaction>('Transaction', transactionSchema);