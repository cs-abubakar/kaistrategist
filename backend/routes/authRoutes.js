import express from 'express';
import { login, verify, changePassword } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.get('/verify', authenticate, verify);
router.post('/change-password', authenticate, changePassword);

export default router;
