import express from 'express';
import Order from '../models/Order.js';
import { auth, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, admin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/my', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, subtotal, tax, shipping, total } = req.body;
    if (!items || items.length === 0) return res.status(400).json({ message: 'Cart is empty' });
    const order = await Order.create({
      user: req.user.id, items, shippingAddress, paymentMethod: paymentMethod || 'cod',
      subtotal, tax: tax || 0, shipping: shipping || 0, total,
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id/status', auth, admin, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
