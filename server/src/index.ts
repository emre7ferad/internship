import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import messageRoutes from './routes/messages';
import notificationRoutes from './routes/notifications'
import accountRoutes from './routes/accounts'
import transactionRoutes from './routes/transactions';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/fibank';
const URL = process.env.CLIENT_URL;

mongoose.connect(uri)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB connection error', err))

app.use(cors({
  origin: URL,
  credentials: true
}))
app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/messages', messageRoutes)
app.use('/notifications', notificationRoutes)
app.use('/api/accounts', accountRoutes);
app.use('/api/transactions', transactionRoutes);
app.get('/', (_req, res) => {
  res.send('API is running...')
})

app.listen(PORT, () => {
  console.log(`Server running on ${URL}:${PORT}`)
})
