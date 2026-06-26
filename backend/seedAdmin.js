import mongoose from 'mongoose';
import dns from 'dns';
import 'dotenv/config';
import User from './models/User.js';

dns.setServers(['8.8.8.8', '1.1.1.1']);

async function seedAdmin() {
  await mongoose.connect(process.env.MONGODB_URI);
  const existing = await User.findOne({ email: 'admin@shop.com' });
  if (existing) {
    console.log('Admin user already exists');
  } else {
    await User.create({ name: 'Admin', email: 'admin@shop.com', password: 'admin123', isAdmin: true });
    console.log('Admin user created: admin@shop.com / admin123');
  }
  await mongoose.connection.close();
}

seedAdmin().catch(console.error);
