import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, ArrowLeft } from 'lucide-react';
import { caseStudiesAPI } from '../../utils/api';

const CaseStudyForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    industry: '',
    year: new Date().getFullYear().toString(),
    tagline: '',
    context: '',
    strategy: '',
    execution: '',
    results: '',
    metrics: [{ label: '', value: '' }],
    tools: [''],
    tags: [''],
    featured: false,
    published: true,
  });
  const [coverImage, setCoverImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEdit);

  useEffect(() => {
    if (isEdit) {
      fetchCaseStudy();
    }
  }, [id]);

  const fetchCaseStudy = async () => {
    try {
      const data = await caseStudiesAPI.getById(id);
      setFormData({
        ...data,
        metrics: data.metrics.length > 0 ? data.metrics : [{ label: '', value: '' }],
        tools: data.tools.length > 0 ? data.tools : [''],
        tags: data.tags.length > 0 ? data.tags : [''],
      });
    } catch (error) {
      console.error('Error fetching case study:', error);
      alert('Failed to fetch case study');
    } finally {
      setIsFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const handleMetricChange = (index, key, value) => {
    const newMetrics = [...formData.metrics];
    newMetrics[index][key] = value;
    setFormData({ ...formData, metrics: newMetrics });
  };

  const addArrayItem = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], field === 'metrics' ? { label: '', value: '' } : ''],
    });
  };

  const removeArrayItem = (field, index) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = new FormData();

      // Add all fields
      Object.keys(formData).forEach((key) => {
        if (key === 'metrics' || key === 'tools' || key === 'tags') {
          const filtered = formData[key].filter((item) =>
            typeof item === 'string' ? item.trim() !== '' : item.label && item.value
          );
          data.append(key, JSON.stringify(filtered));
        } else {
          data.append(key, formData[key]);
        }
      });

      if (coverImage) {
        data.append('cover_image', coverImage);
      }

      if (isEdit) {
        await caseStudiesAPI.update(id, data);
        alert('Case study updated successfully!');
      } else {
        await caseStudiesAPI.create(data);
        alert('Case study created successfully!');
      }

      navigate('/admin/case-studies');
    } catch (error) {
      console.error('Error saving case study:', error);
      alert('Failed to save case study: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <div className="text-center py-12 text-text-muted">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/admin/case-studies')}
        className="inline-flex items-center gap-2 text-text-muted hover:text-white mb-6"
      >
        <ArrowLeft size={20} />
        Back to Case Studies
      </button>

      <h1 className="text-3xl font-extrabold mb-8">
        {isEdit ? 'Edit' : 'New'} Case Study
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title *</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Industry *</label>
                <input
                  type="text"
                  name="industry"
                  required
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Year *</label>
                <input
                  type="text"
                  name="year"
                  required
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tagline *</label>
              <input
                type="text"
                name="tagline"
                required
                value={formData.tagline}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Cover Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Content</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Context</label>
              <textarea
                name="context"
                rows="4"
                value={formData.context}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Strategy</label>
              <textarea
                name="strategy"
                rows="4"
                value={formData.strategy}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Execution</label>
              <textarea
                name="execution"
                rows="4"
                value={formData.execution}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Results</label>
              <textarea
                name="results"
                rows="4"
                value={formData.results}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white resize-none"
              />
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Metrics</h2>
            <button
              type="button"
              onClick={() => addArrayItem('metrics')}
              className="text-primary-orange hover:text-white"
            >
              + Add Metric
            </button>
          </div>
          <div className="space-y-3">
            {formData.metrics.map((metric, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="text"
                  placeholder="Label (e.g., ROAS Increase)"
                  value={metric.label}
                  onChange={(e) => handleMetricChange(index, 'label', e.target.value)}
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white"
                />
                <input
                  type="text"
                  placeholder="Value (e.g., +47%)"
                  value={metric.value}
                  onChange={(e) => handleMetricChange(index, 'value', e.target.value)}
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('metrics', index)}
                  className="px-4 py-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tools & Tags */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Tools & Tags</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium">Tools</label>
                <button
                  type="button"
                  onClick={() => addArrayItem('tools')}
                  className="text-primary-orange hover:text-white text-sm"
                >
                  + Add Tool
                </button>
              </div>
              <div className="space-y-2">
                {formData.tools.map((tool, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g., Google Ads"
                      value={tool}
                      onChange={(e) => handleArrayChange('tools', index, e.target.value)}
                      className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('tools', index)}
                      className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium">Tags</label>
                <button
                  type="button"
                  onClick={() => addArrayItem('tags')}
                  className="text-primary-orange hover:text-white text-sm"
                >
                  + Add Tag
                </button>
              </div>
              <div className="space-y-2">
                {formData.tags.map((tag, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g., B2B"
                      value={tag}
                      onChange={(e) => handleArrayChange('tags', index, e.target.value)}
                      className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('tags', index)}
                      className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Settings</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <span>Featured</span>
            </label>
            <label className="flex items-center gap-3">
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
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-8 py-4 bg-primary-orange text-white rounded-full font-medium magnetic-btn flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Save size={20} />
            {isLoading ? 'Saving...' : isEdit ? 'Update' : 'Create'} Case Study
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/case-studies')}
            className="px-8 py-4 glass rounded-full font-medium hover:border-primary-orange transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CaseStudyForm;
