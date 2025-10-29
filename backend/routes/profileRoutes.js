import express from 'express';
import { getProfile, updateProfile, uploadProfileImage } from '../controllers/profileController.js';
import { authenticate } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Public route
router.get('/', getProfile);

// Protected routes
router.put('/', authenticate, upload.single('profile_image'), updateProfile);
router.post('/upload-image', authenticate, upload.single('profile_image'), uploadProfileImage);

export default router;
