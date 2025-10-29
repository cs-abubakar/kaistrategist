import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { caseStudiesAPI } from '../../utils/api';

const CaseStudiesManagement = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    fetchCaseStudies();
  }, [selectedFilter]);

  const fetchCaseStudies = async () => {
    try {
      setIsLoading(true);
      const published = selectedFilter === 'all' ? undefined : selectedFilter === 'published';
      const data = await caseStudiesAPI.getAll(published);
      setCaseStudies(data);
    } catch (error) {
      console.error('Error fetching case studies:', error);
      alert('Failed to fetch case studies');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this case study?')) {
      return;
    }

    try {
      await caseStudiesAPI.delete(id);
      alert('Case study deleted successfully');
      fetchCaseStudies();
    } catch (error) {
      console.error('Error deleting case study:', error);
      alert('Failed to delete case study');
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold mb-2">Case Studies</h1>
          <p className="text-text-muted">Manage your portfolio case studies</p>
        </div>
        <Link
          to="/admin/case-studies/new"
          className="px-6 py-3 bg-primary-orange text-white rounded-full font-medium magnetic-btn inline-flex items-center gap-2"
        >
          <Plus size={20} />
          New Case Study
        </Link>
      </div>

      {/* Filters */}
      <div className="glass rounded-xl p-4 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedFilter === 'all'
                ? 'bg-primary-orange text-white'
                : 'bg-white/5 text-text-muted hover:bg-white/10'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedFilter('published')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedFilter === 'published'
                ? 'bg-primary-orange text-white'
                : 'bg-white/5 text-text-muted hover:bg-white/10'
            }`}
          >
            Published
          </button>
          <button
            onClick={() => setSelectedFilter('draft')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedFilter === 'draft'
                ? 'bg-primary-orange text-white'
                : 'bg-white/5 text-text-muted hover:bg-white/10'
            }`}
          >
            Drafts
          </button>
        </div>
      </div>

      {/* Case Studies List */}
      {isLoading ? (
        <div className="text-center py-12 text-text-muted">Loading...</div>
      ) : caseStudies.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <div className="text-6xl mb-4">📁</div>
          <h3 className="text-2xl font-bold mb-2">No case studies yet</h3>
          <p className="text-text-muted mb-6">
            Create your first case study to showcase your work
          </p>
          <Link
            to="/admin/case-studies/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-orange text-white rounded-full font-medium magnetic-btn"
          >
            <Plus size={20} />
            Create Case Study
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {caseStudies.map((cs, index) => (
            <motion.div
              key={cs.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass rounded-xl p-6 hover:border-primary-orange transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold">{cs.title}</h3>
                    {cs.featured && (
                      <span className="px-2 py-1 bg-primary-orange/20 text-primary-orange text-xs rounded-full">
                        Featured
                      </span>
                    )}
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        cs.published
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {cs.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-text-muted mb-3">{cs.tagline}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 bg-white/5 rounded-full text-sm">
                      {cs.industry}
                    </span>
                    <span className="px-3 py-1 bg-white/5 rounded-full text-sm">
                      {cs.year}
                    </span>
                    {cs.tags?.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white/5 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {cs.metrics && cs.metrics.length > 0 && (
                    <div className="flex gap-4">
                      {cs.metrics.slice(0, 2).map((metric, i) => (
                        <div key={i}>
                          <div className="text-lg font-bold text-primary-orange">
                            {metric.value}
                          </div>
                          <div className="text-xs text-text-muted">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 ml-4">
                  <Link
                    to={`/work/${cs.id}`}
                    target="_blank"
                    className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
                    title="View"
                  >
                    <Eye size={18} />
                  </Link>
                  <Link
                    to={`/admin/case-studies/edit/${cs.id}`}
                    className="p-2 bg-white/5 rounded-lg hover:bg-primary-orange transition-all"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </Link>
                  <button
                    onClick={() => handleDelete(cs.id)}
                    className="p-2 bg-white/5 rounded-lg hover:bg-red-500 transition-all"
                    title="Delete"
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

export default CaseStudiesManagement;
