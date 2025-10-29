import express from 'express';
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getBlogCategories
} from '../controllers/blogController.js';
import { authenticate } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Public routes
router.get('/', getAllBlogPosts);
router.get('/categories', getBlogCategories);
router.get('/slug/:slug', getBlogPostBySlug);

// Protected routes (admin only)
router.get('/admin/:id', authenticate, getBlogPostById);
router.post('/', authenticate, upload.single('cover_image'), createBlogPost);
router.put('/:id', authenticate, upload.single('cover_image'), updateBlogPost);
router.delete('/:id', authenticate, deleteBlogPost);

export default router;
