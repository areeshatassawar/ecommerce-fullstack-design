import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer '))
      return res.status(401).json({ message: 'Not authenticated' });
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const admin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin)
    return res.status(403).json({ message: 'Admin access required' });
  next();
};
