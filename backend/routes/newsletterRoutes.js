import express from 'express';

const router = express.Router();

let subscriptions = [];

router.post('/', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });
  subscriptions.push({ email, subscribedAt: new Date() });
  res.json({ message: 'Subscribed successfully' });
});

export default router;
