import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const USERS = [
  { username: 'alice', passwordHash: bcrypt.hashSync('password123', 10), role: 'admin' },
  { username: 'bob',   passwordHash: bcrypt.hashSync('secret456', 10), role: 'user' }
];

export function login(req, res) {
  const { username, password } = req.body;
  const user = USERS.find(u => u.username === username);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  if (!bcrypt.compareSync(password, user.passwordHash)) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign(
    { sub: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );
  res.json({ token });
}

export function authMiddleware(req, res, next) {
  const auth = req.headers['authorization'];
  if (!auth) return res.status(401).json({ error: 'Missing token' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}