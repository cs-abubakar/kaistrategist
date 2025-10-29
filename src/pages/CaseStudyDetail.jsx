import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { caseStudiesAPI } from '../utils/api';

const CaseStudyDetail = () => {
  const { id } = useParams();
  const [caseStudy, setCaseStudy] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCaseStudy();
  }, [id]);

  const fetchCaseStudy = async () => {
    try {
      const data = await caseStudiesAPI.getById(id);
      setCaseStudy(data);
    } catch (error) {
      console.error('Error fetching case study:', error);
      setError('Case study not found');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-text-muted">Loading...</div>
      </div>
    );
  }

  if (error || !caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold mb-4">Case Study Not Found</h1>
          <Link to="/work" className="text-primary-orange hover:text-white">
            ← Back to Work
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <Link
          to="/work"
          className="inline-flex items-center gap-2 text-text-muted hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Back to Work
        </Link>
      </div>

      {/* Hero Section */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 text-text-muted">
                <Calendar size={18} />
                <span>{caseStudy.year}</span>
              </div>
              <div className="flex items-center gap-2 text-text-muted">
                <Tag size={18} />
                <span>{caseStudy.industry}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
              {caseStudy.title}
            </h1>

            {/* Tagline */}
            <p className="text-xl md:text-2xl text-text-muted mb-8">
              {caseStudy.tagline}
            </p>

            {/* Cover Image */}
            {caseStudy.cover_image && (
              <div className="w-full aspect-video rounded-2xl overflow-hidden mb-12 bg-white/5">
                <img
                  src={`http://localhost:5000${caseStudy.cover_image}`}
                  alt={caseStudy.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Metrics */}
            {caseStudy.metrics && caseStudy.metrics.length > 0 && (
              <div className="glass rounded-2xl p-8 mb-12">
                <h3 className="text-xl font-bold mb-6">Key Results</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {caseStudy.metrics.map((metric, i) => (
                    <div key={i} className="text-center">
                      <div className="text-3xl font-extrabold text-primary-orange mb-2">
                        {metric.value}
                      </div>
                      <div className="text-sm text-text-muted">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Context */}
          {caseStudy.context && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold mb-4 text-primary-orange">Context</h2>
              <p className="text-lg text-text-muted leading-relaxed">
                {caseStudy.context}
              </p>
            </motion.div>
          )}

          {/* Strategy */}
          {caseStudy.strategy && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold mb-4 text-primary-orange">Strategy</h2>
              <p className="text-lg text-text-muted leading-relaxed">
                {caseStudy.strategy}
              </p>
            </motion.div>
          )}

          {/* Execution */}
          {caseStudy.execution && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold mb-4 text-primary-orange">Execution</h2>
              <p className="text-lg text-text-muted leading-relaxed">
                {caseStudy.execution}
              </p>
            </motion.div>
          )}

          {/* Results */}
          {caseStudy.results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold mb-4 text-primary-orange">Results</h2>
              <p className="text-lg text-text-muted leading-relaxed">
                {caseStudy.results}
              </p>
            </motion.div>
          )}

          {/* Tools & Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8"
          >
            {caseStudy.tools && caseStudy.tools.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3">Tools Used</h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.tools.map((tool, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-primary-orange/20 text-primary-orange rounded-full text-sm font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {caseStudy.tags && caseStudy.tags.length > 0 && (
              <div>
                <h3 className="text-lg font-bold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-white/5 text-text-muted rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center glass rounded-2xl p-12"
          >
            <h3 className="text-2xl font-bold mb-4">Interested in Similar Results?</h3>
            <p className="text-text-muted mb-6">
              Let's discuss how I can help drive measurable growth for your business.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-orange text-white rounded-full font-medium magnetic-btn"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudyDetail;
