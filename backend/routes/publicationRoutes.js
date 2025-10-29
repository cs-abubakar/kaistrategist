import express from 'express';
import {
  getAllPublications,
  getPublicationById,
  createPublication,
  updatePublication,
  deletePublication
} from '../controllers/publicationController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllPublications);
router.get('/:id', getPublicationById);

// Protected routes
router.post('/', authenticate, createPublication);
router.put('/:id', authenticate, updatePublication);
router.delete('/:id', authenticate, deletePublication);

export default router;
