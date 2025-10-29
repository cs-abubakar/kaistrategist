import db from '../config/database.js';

// Get all publications (public endpoint)
export const getAllPublications = (req, res) => {
  try {
    const { published } = req.query;

    let query = 'SELECT * FROM publications';
    const params = [];

    if (published !== undefined) {
      query += ' WHERE published = ?';
      params.push(published === 'true' ? 1 : 0);
    }

    query += ' ORDER BY year DESC, created_at DESC';

    const publications = db.prepare(query).all(...params);

    const result = publications.map(pub => ({
      ...pub,
      featured: Boolean(pub.featured),
      published: Boolean(pub.published)
    }));

    res.json(result);
  } catch (error) {
    console.error('Error fetching publications:', error);
    res.status(500).json({ error: 'Failed to fetch publications' });
  }
};

// Get single publication by ID
export const getPublicationById = (req, res) => {
  try {
    const { id } = req.params;
    const publication = db.prepare('SELECT * FROM publications WHERE id = ?').get(id);

    if (!publication) {
      return res.status(404).json({ error: 'Publication not found' });
    }

    res.json({
      ...publication,
      featured: Boolean(publication.featured),
      published: Boolean(publication.published)
    });
  } catch (error) {
    console.error('Error fetching publication:', error);
    res.status(500).json({ error: 'Failed to fetch publication' });
  }
};

// Create publication (protected)
export const createPublication = (req, res) => {
  try {
    const {
      title, authors, journal, year, doi, abstract, why_it_matters, featured, published
    } = req.body;

    const result = db.prepare(`
      INSERT INTO publications (
        title, authors, journal, year, doi, abstract, why_it_matters, featured, published
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      title, authors, journal, year, doi, abstract, why_it_matters,
      featured ? 1 : 0, published !== false ? 1 : 0
    );

    res.status(201).json({
      success: true,
      id: result.lastInsertRowid,
      message: 'Publication created successfully'
    });
  } catch (error) {
    console.error('Error creating publication:', error);
    res.status(500).json({ error: 'Failed to create publication' });
  }
};

// Update publication (protected)
export const updatePublication = (req, res) => {
  try {
    const { id } = req.params;
    const {
      title, authors, journal, year, doi, abstract, why_it_matters, featured, published
    } = req.body;

    const result = db.prepare(`
      UPDATE publications
      SET title = ?, authors = ?, journal = ?, year = ?, doi = ?, abstract = ?,
          why_it_matters = ?, featured = ?, published = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      title, authors, journal, year, doi, abstract, why_it_matters,
      featured ? 1 : 0, published !== false ? 1 : 0, id
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Publication not found' });
    }

    res.json({ success: true, message: 'Publication updated successfully' });
  } catch (error) {
    console.error('Error updating publication:', error);
    res.status(500).json({ error: 'Failed to update publication' });
  }
};

// Delete publication (protected)
export const deletePublication = (req, res) => {
  try {
    const { id } = req.params;

    const result = db.prepare('DELETE FROM publications WHERE id = ?').run(id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Publication not found' });
    }

    res.json({ success: true, message: 'Publication deleted successfully' });
  } catch (error) {
    console.error('Error deleting publication:', error);
    res.status(500).json({ error: 'Failed to delete publication' });
  }
};
