import db from '../config/database.js';

// Get all case studies (public endpoint)
export const getAllCaseStudies = (req, res) => {
  try {
    const { published } = req.query;

    let query = 'SELECT * FROM case_studies';
    const params = [];

    if (published !== undefined) {
      query += ' WHERE published = ?';
      params.push(published === 'true' ? 1 : 0);
    }

    query += ' ORDER BY created_at DESC';

    const caseStudies = db.prepare(query).all(...params);

    // Get related data for each case study
    const result = caseStudies.map(cs => {
      const metrics = db.prepare('SELECT label, value FROM case_study_metrics WHERE case_study_id = ?').all(cs.id);
      const tools = db.prepare('SELECT tool_name FROM case_study_tools WHERE case_study_id = ?').all(cs.id);
      const tags = db.prepare('SELECT tag_name FROM case_study_tags WHERE case_study_id = ?').all(cs.id);

      return {
        ...cs,
        featured: Boolean(cs.featured),
        published: Boolean(cs.published),
        metrics: metrics,
        tools: tools.map(t => t.tool_name),
        tags: tags.map(t => t.tag_name)
      };
    });

    res.json(result);
  } catch (error) {
    console.error('Error fetching case studies:', error);
    res.status(500).json({ error: 'Failed to fetch case studies' });
  }
};

// Get single case study by ID
export const getCaseStudyById = (req, res) => {
  try {
    const { id } = req.params;
    const caseStudy = db.prepare('SELECT * FROM case_studies WHERE id = ?').get(id);

    if (!caseStudy) {
      return res.status(404).json({ error: 'Case study not found' });
    }

    const metrics = db.prepare('SELECT label, value FROM case_study_metrics WHERE case_study_id = ?').all(id);
    const tools = db.prepare('SELECT tool_name FROM case_study_tools WHERE case_study_id = ?').all(id);
    const tags = db.prepare('SELECT tag_name FROM case_study_tags WHERE case_study_id = ?').all(id);

    res.json({
      ...caseStudy,
      featured: Boolean(caseStudy.featured),
      published: Boolean(caseStudy.published),
      metrics: metrics,
      tools: tools.map(t => t.tool_name),
      tags: tags.map(t => t.tag_name)
    });
  } catch (error) {
    console.error('Error fetching case study:', error);
    res.status(500).json({ error: 'Failed to fetch case study' });
  }
};

// Create case study (protected)
export const createCaseStudy = (req, res) => {
  try {
    const {
      title, industry, year, tagline, context, strategy, execution, results,
      metrics, tools, tags, featured, published
    } = req.body;

    const coverImage = req.file ? `/uploads/${req.file.filename}` : null;

    const result = db.prepare(`
      INSERT INTO case_studies (
        title, industry, year, tagline, context, strategy, execution, results,
        cover_image, featured, published
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      title, industry, year, tagline, context, strategy, execution, results,
      coverImage, featured ? 1 : 0, published !== false ? 1 : 0
    );

    const caseStudyId = result.lastInsertRowid;

    // Insert metrics
    if (metrics && Array.isArray(metrics)) {
      const metricsArray = typeof metrics === 'string' ? JSON.parse(metrics) : metrics;
      metricsArray.forEach(metric => {
        db.prepare('INSERT INTO case_study_metrics (case_study_id, label, value) VALUES (?, ?, ?)').run(
          caseStudyId, metric.label, metric.value
        );
      });
    }

    // Insert tools
    if (tools && Array.isArray(tools)) {
      const toolsArray = typeof tools === 'string' ? JSON.parse(tools) : tools;
      toolsArray.forEach(tool => {
        db.prepare('INSERT INTO case_study_tools (case_study_id, tool_name) VALUES (?, ?)').run(caseStudyId, tool);
      });
    }

    // Insert tags
    if (tags && Array.isArray(tags)) {
      const tagsArray = typeof tags === 'string' ? JSON.parse(tags) : tags;
      tagsArray.forEach(tag => {
        db.prepare('INSERT INTO case_study_tags (case_study_id, tag_name) VALUES (?, ?)').run(caseStudyId, tag);
      });
    }

    res.status(201).json({
      success: true,
      id: caseStudyId,
      message: 'Case study created successfully'
    });
  } catch (error) {
    console.error('Error creating case study:', error);
    res.status(500).json({ error: 'Failed to create case study' });
  }
};

// Update case study (protected)
export const updateCaseStudy = (req, res) => {
  try {
    const { id } = req.params;
    const {
      title, industry, year, tagline, context, strategy, execution, results,
      metrics, tools, tags, featured, published
    } = req.body;

    // Check if case study exists
    const existing = db.prepare('SELECT * FROM case_studies WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ error: 'Case study not found' });
    }

    const coverImage = req.file ? `/uploads/${req.file.filename}` : existing.cover_image;

    db.prepare(`
      UPDATE case_studies
      SET title = ?, industry = ?, year = ?, tagline = ?, context = ?, strategy = ?,
          execution = ?, results = ?, cover_image = ?, featured = ?, published = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      title, industry, year, tagline, context, strategy, execution, results,
      coverImage, featured ? 1 : 0, published !== false ? 1 : 0, id
    );

    // Delete existing related data
    db.prepare('DELETE FROM case_study_metrics WHERE case_study_id = ?').run(id);
    db.prepare('DELETE FROM case_study_tools WHERE case_study_id = ?').run(id);
    db.prepare('DELETE FROM case_study_tags WHERE case_study_id = ?').run(id);

    // Insert new metrics
    if (metrics) {
      const metricsArray = typeof metrics === 'string' ? JSON.parse(metrics) : metrics;
      metricsArray.forEach(metric => {
        db.prepare('INSERT INTO case_study_metrics (case_study_id, label, value) VALUES (?, ?, ?)').run(
          id, metric.label, metric.value
        );
      });
    }

    // Insert new tools
    if (tools) {
      const toolsArray = typeof tools === 'string' ? JSON.parse(tools) : tools;
      toolsArray.forEach(tool => {
        db.prepare('INSERT INTO case_study_tools (case_study_id, tool_name) VALUES (?, ?)').run(id, tool);
      });
    }

    // Insert new tags
    if (tags) {
      const tagsArray = typeof tags === 'string' ? JSON.parse(tags) : tags;
      tagsArray.forEach(tag => {
        db.prepare('INSERT INTO case_study_tags (case_study_id, tag_name) VALUES (?, ?)').run(id, tag);
      });
    }

    res.json({ success: true, message: 'Case study updated successfully' });
  } catch (error) {
    console.error('Error updating case study:', error);
    res.status(500).json({ error: 'Failed to update case study' });
  }
};

// Delete case study (protected)
export const deleteCaseStudy = (req, res) => {
  try {
    const { id } = req.params;

    const result = db.prepare('DELETE FROM case_studies WHERE id = ?').run(id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Case study not found' });
    }

    res.json({ success: true, message: 'Case study deleted successfully' });
  } catch (error) {
    console.error('Error deleting case study:', error);
    res.status(500).json({ error: 'Failed to delete case study' });
  }
};
