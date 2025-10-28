import { motion } from 'framer-motion';
import { BookOpen, ArrowRight } from 'lucide-react';
import { publications } from '../data/publications';

const Research = () => {
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
              Research & Publications
            </h1>
            <p className="text-lg text-text-muted max-w-3xl mx-auto mb-8">
              Peer-reviewed contributions exploring digital marketing, consumer
              behavior, and transformation. Bridging academia and practice.
            </p>

            {/* Research Focus Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-2xl p-8 max-w-4xl mx-auto text-left"
            >
              <h2 className="text-2xl font-bold mb-4">Research Focus</h2>
              <p className="text-text-muted">
                My academic work explores the intersection of algorithmic
                systems, consumer psychology, and marketing effectiveness. I'm
                particularly interested in how personalization technologies
                influence buying behavior, and how leadership practices shape
                high-performing digital marketing teams. Each publication is
                designed to provide actionable insights for practitioners—not
                just theoretical frameworks.
              </p>
            </motion.div>
          </motion.div>

          {/* Publications List */}
          <div className="space-y-8">
            {publications.map((pub, index) => (
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
                    <div className="text-5xl font-extrabold text-primary-orange mb-4">
                      {pub.year}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 hover:text-primary-blue transition-colors">
                      {pub.title}
                    </h3>

                    {/* Authors */}
                    <p className="text-base text-text-muted mb-2">
                      {pub.authors}
                    </p>

                    {/* Journal */}
                    <p className="text-base text-primary-orange mb-6">
                      {pub.journal}
                    </p>

                    {/* Abstract Section */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-2">Abstract</h4>
                      <p className="text-text-muted leading-relaxed">
                        {pub.abstract}
                      </p>
                    </div>

                    {/* Why It Matters Section */}
                    {pub.whyItMatters && (
                      <div className="glass rounded-lg p-6 mb-6 border-l-4 border-primary-orange bg-primary-orange/5">
                        <h4 className="text-lg font-semibold text-primary-orange mb-3">
                          Why This Matters for Marketers
                        </h4>
                        <p className="text-text-muted leading-relaxed">
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
                        className="inline-flex items-center gap-2 text-base font-medium text-primary-blue hover:gap-3 transition-all"
                      >
                        Read Full Paper
                        <ArrowRight size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Research;
