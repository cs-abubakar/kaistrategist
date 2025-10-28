import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';
import { caseStudies } from '../data/caseStudies';

const Work = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set();
    caseStudies.forEach((cs) => {
      cs.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags);
  }, []);

  // Filter case studies
  const filteredCaseStudies = useMemo(() => {
    return caseStudies.filter((cs) => {
      const matchesSearch =
        searchTerm === '' ||
        cs.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cs.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cs.tagline.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => cs.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [searchTerm, selectedTags]);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              Selected Work
            </h1>
            <p className="text-lg text-text-muted max-w-3xl mx-auto">
              Performance campaigns across B2B and B2C. Meta, Google, and
              beyond. Each project engineered for measurable, scalable growth.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-6">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted"
                size={20}
              />
              <input
                type="text"
                placeholder="Search case studies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 glass rounded-full focus:outline-none focus:ring-2 focus:ring-primary-orange text-white placeholder-text-muted"
              />
            </div>

            {/* Tag Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedTags([])}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedTags.length === 0
                    ? 'bg-primary-orange text-white'
                    : 'glass hover:border-primary-orange'
                }`}
              >
                All Projects
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedTags.includes(tag)
                      ? 'bg-primary-orange text-white'
                      : 'glass hover:border-primary-orange'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Case Studies Grid */}
          {filteredCaseStudies.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCaseStudies.map((caseStudy, index) => (
                <motion.div
                  key={caseStudy.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass rounded-2xl p-6 hover:border-primary-orange transition-all group cursor-pointer"
                >
                  {/* Cover Image or Placeholder */}
                  <div className="relative w-full aspect-video rounded-lg mb-4 flex items-center justify-center bg-white/5 overflow-hidden">
                    <div className="text-6xl font-extrabold text-white/20">
                      {caseStudy.industry.charAt(0)}
                    </div>
                    {/* Year Badge - Positioned top-right */}
                    <div className="absolute top-3 right-3 glass px-3 py-1 rounded-full text-sm text-primary-orange">
                      {caseStudy.year}
                    </div>
                  </div>

                  {/* Industry */}
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-orange transition-colors">
                    {caseStudy.industry}
                  </h3>

                  {/* Tagline */}
                  <p className="text-text-muted mb-4 line-clamp-2">
                    {caseStudy.tagline}
                  </p>

                  {/* Metrics */}
                  {caseStudy.metrics && caseStudy.metrics.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {caseStudy.metrics.slice(0, 2).map((metric, i) => (
                        <div key={i}>
                          <div className="text-xl font-bold text-primary-orange">
                            {metric.value}
                          </div>
                          <div className="text-xs text-text-muted">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {caseStudy.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 rounded bg-white/5 text-text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View Details Link */}
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-primary-orange group-hover:gap-3 transition-all">
                    View Details
                    <ArrowRight size={16} />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            // Empty State
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">No case studies found</h3>
              <p className="text-text-muted">
                Try adjusting your search or filters
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Work;
