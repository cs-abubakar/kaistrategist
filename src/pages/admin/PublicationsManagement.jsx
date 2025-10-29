import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';
import { publicationsAPI } from '../../utils/api';

const PublicationsManagement = () => {
  const [publications, setPublications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    journal: '',
    year: new Date().getFullYear().toString(),
    doi: '',
    abstract: '',
    why_it_matters: '',
    featured: false,
    published: true,
  });

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      const data = await publicationsAPI.getAll();
      setPublications(data);
    } catch (error) {
      alert('Failed to fetch publications');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await publicationsAPI.update(editingId, formData);
        alert('Publication updated!');
      } else {
        await publicationsAPI.create(formData);
        alert('Publication created!');
      }
      resetForm();
      fetchPublications();
    } catch (error) {
      alert('Failed to save: ' + error.message);
    }
  };

  const handleEdit = (pub) => {
    setEditingId(pub.id);
    setFormData(pub);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this publication?')) return;
    try {
      await publicationsAPI.delete(id);
      alert('Publication deleted');
      fetchPublications();
    } catch (error) {
      alert('Failed to delete');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: '',
      authors: '',
      journal: '',
      year: new Date().getFullYear().toString(),
      doi: '',
      abstract: '',
      why_it_matters: '',
      featured: false,
      published: true,
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-8">Publications</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit' : 'New'} Publication</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="title"
            required
            placeholder="Title *"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="authors"
              required
              placeholder="Authors *"
              value={formData.authors}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white"
            />
            <input
              type="text"
              name="year"
              required
              placeholder="Year *"
              value={formData.year}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white"
            />
          </div>

          <input
            type="text"
            name="journal"
            required
            placeholder="Journal *"
            value={formData.journal}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white"
          />

          <input
            type="url"
            name="doi"
            placeholder="DOI URL"
            value={formData.doi}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white"
          />

          <textarea
            name="abstract"
            rows="4"
            placeholder="Abstract"
            value={formData.abstract}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white resize-none"
          />

          <textarea
            name="why_it_matters"
            rows="3"
            placeholder="Why It Matters (for marketers)"
            value={formData.why_it_matters}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white resize-none"
          />

          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <span>Featured</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <span>Published</span>
            </label>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="px-6 py-3 bg-primary-orange text-white rounded-full font-medium magnetic-btn"
            >
              {editingId ? 'Update' : 'Create'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 glass rounded-full font-medium"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      {/* List */}
      {isLoading ? (
        <div className="text-center py-12 text-text-muted">Loading...</div>
      ) : (
        <div className="grid gap-6">
          {publications.map((pub, index) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass rounded-xl p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold">{pub.title}</h3>
                    {pub.featured && (
                      <span className="px-2 py-1 bg-primary-orange/20 text-primary-orange text-xs rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-text-muted mb-2">
                    {pub.authors} • {pub.journal} • {pub.year}
                  </p>
                  {pub.doi && (
                    <a
                      href={pub.doi}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-blue hover:text-white text-sm inline-flex items-center gap-1 mb-2"
                    >
                      <ExternalLink size={14} />
                      View Publication
                    </a>
                  )}
                  <p className="text-text-muted text-sm">{pub.abstract?.substring(0, 200)}...</p>
                </div>

                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(pub)}
                    className="p-2 bg-white/5 rounded-lg hover:bg-primary-orange"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(pub.id)}
                    className="p-2 bg-white/5 rounded-lg hover:bg-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicationsManagement;
