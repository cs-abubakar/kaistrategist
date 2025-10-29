import express from 'express';
import {
  getAllCaseStudies,
  getCaseStudyById,
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy
} from '../controllers/caseStudyController.js';
import { authenticate } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Public routes
router.get('/', getAllCaseStudies);
router.get('/:id', getCaseStudyById);

// Protected routes
router.post('/', authenticate, upload.single('cover_image'), createCaseStudy);
router.put('/:id', authenticate, upload.single('cover_image'), updateCaseStudy);
router.delete('/:id', authenticate, deleteCaseStudy);

export default router;
