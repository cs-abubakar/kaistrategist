import db from '../config/database.js';

// Get all blog posts (public endpoint)
export const getAllBlogPosts = (req, res) => {
  try {
    const { published, category } = req.query;

    let query = 'SELECT * FROM blog_posts WHERE 1=1';
    const params = [];

    if (published !== undefined) {
      query += ' AND published = ?';
      params.push(published === 'true' ? 1 : 0);
    }

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }

    query += ' ORDER BY published_date DESC, created_at DESC';

    const blogPosts = db.prepare(query).all(...params);

    // Get tags for each post
    const result = blogPosts.map(post => {
      const tags = db.prepare('SELECT tag_name FROM blog_post_tags WHERE blog_post_id = ?').all(post.id);

      return {
        ...post,
        featured: Boolean(post.featured),
        published: Boolean(post.published),
        tags: tags.map(t => t.tag_name)
      };
    });

    res.json(result);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
};

// Get single blog post by ID or slug
export const getBlogPostBySlug = (req, res) => {
  try {
    const { slug } = req.params;
    const blogPost = db.prepare('SELECT * FROM blog_posts WHERE slug = ?').get(slug);

    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    const tags = db.prepare('SELECT tag_name FROM blog_post_tags WHERE blog_post_id = ?').all(blogPost.id);

    res.json({
      ...blogPost,
      featured: Boolean(blogPost.featured),
      published: Boolean(blogPost.published),
      tags: tags.map(t => t.tag_name)
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
};

// Get blog post by ID (for admin)
export const getBlogPostById = (req, res) => {
  try {
    const { id } = req.params;
    const blogPost = db.prepare('SELECT * FROM blog_posts WHERE id = ?').get(id);

    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    const tags = db.prepare('SELECT tag_name FROM blog_post_tags WHERE blog_post_id = ?').all(id);

    res.json({
      ...blogPost,
      featured: Boolean(blogPost.featured),
      published: Boolean(blogPost.published),
      tags: tags.map(t => t.tag_name)
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
};

// Create blog post (protected)
export const createBlogPost = (req, res) => {
  try {
    const {
      title, slug, category, summary, body, tags, read_time, featured, published, published_date
    } = req.body;

    const coverImage = req.file ? `/uploads/${req.file.filename}` : null;

    const result = db.prepare(`
      INSERT INTO blog_posts (
        title, slug, category, summary, body, cover_image, read_time, featured, published, published_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      title, slug, category, summary, body, coverImage, read_time || null,
      featured ? 1 : 0, published !== false ? 1 : 0, published_date || null
    );

    const blogPostId = result.lastInsertRowid;

    // Insert tags
    if (tags && Array.isArray(tags)) {
      const tagsArray = typeof tags === 'string' ? JSON.parse(tags) : tags;
      tagsArray.forEach(tag => {
        db.prepare('INSERT INTO blog_post_tags (blog_post_id, tag_name) VALUES (?, ?)').run(blogPostId, tag);
      });
    }

    res.status(201).json({
      success: true,
      id: blogPostId,
      message: 'Blog post created successfully'
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'A blog post with this slug already exists' });
    }
    res.status(500).json({ error: 'Failed to create blog post' });
  }
};

// Update blog post (protected)
export const updateBlogPost = (req, res) => {
  try {
    const { id } = req.params;
    const {
      title, slug, category, summary, body, tags, read_time, featured, published, published_date
    } = req.body;

    // Check if blog post exists
    const existing = db.prepare('SELECT * FROM blog_posts WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    const coverImage = req.file ? `/uploads/${req.file.filename}` : existing.cover_image;

    db.prepare(`
      UPDATE blog_posts
      SET title = ?, slug = ?, category = ?, summary = ?, body = ?, cover_image = ?,
          read_time = ?, featured = ?, published = ?, published_date = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      title, slug, category, summary, body, coverImage, read_time || null,
      featured ? 1 : 0, published !== false ? 1 : 0, published_date || null, id
    );

    // Delete existing tags
    db.prepare('DELETE FROM blog_post_tags WHERE blog_post_id = ?').run(id);

    // Insert new tags
    if (tags) {
      const tagsArray = typeof tags === 'string' ? JSON.parse(tags) : tags;
      tagsArray.forEach(tag => {
        db.prepare('INSERT INTO blog_post_tags (blog_post_id, tag_name) VALUES (?, ?)').run(id, tag);
      });
    }

    res.json({ success: true, message: 'Blog post updated successfully' });
  } catch (error) {
    console.error('Error updating blog post:', error);
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'A blog post with this slug already exists' });
    }
    res.status(500).json({ error: 'Failed to update blog post' });
  }
};

// Delete blog post (protected)
export const deleteBlogPost = (req, res) => {
  try {
    const { id } = req.params;

    const result = db.prepare('DELETE FROM blog_posts WHERE id = ?').run(id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json({ success: true, message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ error: 'Failed to delete blog post' });
  }
};

// Get blog categories
export const getBlogCategories = (req, res) => {
  try {
    const categories = [
      'Marketing',
      'Research',
      'Travel',
      'Productivity'
    ];

    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};
