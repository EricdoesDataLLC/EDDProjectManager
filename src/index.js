import { login, authMiddleware } from './auth.js';

// Public login endpoint
app.post('/api/login', login);

// Protect all project routes
app.use('/api/projects', authMiddleware);
app.use('/api/activity', authMiddleware);