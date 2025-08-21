import mongoose, { Document, Schema} from "mongoose";

export interface ITransaction extends Document {
    account: mongoose.Types.ObjectId;
    date: Date;
    type: 'deposit' | 'withdrawal' | 'transfer';
    amount: number;
    currency: string;
    description: string;
    reference: string;
    document: string;
    senderAccount?: mongoose.Types.ObjectId;
    receiverAccount?: mongoose.Types.ObjectId;
}

const generateReference = (): string => {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `TXN${timestamp.slice(-6)}${random}`;
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
    reference: {
        type: String,
        required: true,
        unique: true,
        default: generateReference,
    },
    document: {
        type: String,
        required: true,
        default: function(this: any) {
            return this.description || 'Transaction';
        },
    },
    senderAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: false,
    },
    receiverAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: false,
    }
});

export default mongoose.model<ITransaction>('Transaction', transactionSchema);