import express from 'express';
import mongoose from 'mongoose';
import tradeRoutes from './routes/trade';

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI!);

app.use('/api', tradeRoutes);

app.listen(3001, () => console.log('Backend on 3001'));