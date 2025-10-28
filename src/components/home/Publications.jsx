import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight } from 'lucide-react';
import { publications } from '../../data/publications';

const Publications = () => {
  const featuredPubs = publications.filter((pub) => pub.featured).slice(0, 2);

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
            Research & Publications
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-muted max-w-2xl mx-auto"
          >
            Peer-reviewed contributions bridging academia and practice
          </motion.p>
        </div>

        {/* Publications List */}
        <div className="space-y-6 mb-12">
          {featuredPubs.map((pub, index) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-6 md:p-8 hover:border-primary-blue transition-all"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-xl bg-primary-blue/20 flex items-center justify-center">
                    <BookOpen className="text-primary-blue" size={32} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  {/* Year */}
                  <div className="text-4xl font-extrabold text-primary-orange mb-3">
                    {pub.year}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold mb-3 hover:text-primary-blue transition-colors">
                    {pub.title}
                  </h3>

                  {/* Authors */}
                  <p className="text-sm text-text-muted mb-2">{pub.authors}</p>

                  {/* Journal */}
                  <p className="text-sm text-primary-orange mb-4">
                    {pub.journal}
                  </p>

                  {/* Abstract */}
                  <p className="text-text-muted mb-4 line-clamp-3">
                    {pub.abstract}
                  </p>

                  {/* Why It Matters */}
                  {pub.whyItMatters && (
                    <div className="glass rounded-lg p-4 mb-4 border-l-4 border-primary-orange">
                      <p className="text-sm font-semibold text-primary-orange mb-2">
                        Why This Matters for Marketers
                      </p>
                      <p className="text-sm text-text-muted">
                        {pub.whyItMatters}
                      </p>
                    </div>
                  )}

                  {/* Read Link */}
                  {pub.doi && (
                    <a
                      href={pub.doi}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary-blue hover:gap-3 transition-all"
                    >
                      Read Full Paper
                      <ArrowRight size={16} />
                    </a>
                  )}
                </div>
              </div>
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
            to="/research"
            className="inline-flex items-center gap-2 text-lg font-medium text-primary-blue hover:gap-3 transition-all"
          >
            View All Publications
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Publications;
