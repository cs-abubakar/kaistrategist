import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { caseStudies } from '../../data/caseStudies';

const FeaturedWork = () => {
  const featuredCases = caseStudies.filter((cs) => cs.featured).slice(0, 3);

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold mb-4"
          >
            Featured Work
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-muted max-w-2xl mx-auto"
          >
            Performance campaigns engineered for measurable, scalable growth
          </motion.p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredCases.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-6 hover:border-primary-orange transition-all group"
            >
              {/* Cover Image or Placeholder */}
              <div className="w-full aspect-video rounded-lg mb-4 flex items-center justify-center bg-white/5">
                <div className="text-6xl font-extrabold text-white/20">
                  {caseStudy.industry.charAt(0)}
                </div>
              </div>

              {/* Year Badge */}
              <div className="inline-block glass px-3 py-1 rounded-full text-sm text-primary-orange mb-3">
                {caseStudy.year}
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
              <Link
                to="/work"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary-orange hover:gap-3 transition-all"
              >
                View Details
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-lg font-medium text-primary-orange hover:gap-3 transition-all"
          >
            View All Work
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedWork;
