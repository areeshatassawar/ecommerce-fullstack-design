import express from 'express';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('API Working!'));
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/newsletter', newsletterRoutes);

let initialized = false;
const initialize = async () => {
  if (initialized) return;
  await connectDB();
  await connectCloudinary();
  initialized = true;
};

app.use(async (req, res, next) => {
  try {
    await initialize();
    next();
  } catch (err) {
    res.status(500).json({ error: 'Server initialization failed' });
  }
});

export default app;
