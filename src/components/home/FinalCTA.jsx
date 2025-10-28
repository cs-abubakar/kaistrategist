import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';

const FinalCTA = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary-orange/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/2 right-1/4 w-96 h-96 bg-primary-blue/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8 md:p-12 text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-block glass px-4 py-2 rounded-full mb-6"
          >
            <span className="text-primary-orange text-sm font-medium">
              Open to Opportunities
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-extrabold mb-6"
          >
            Let's Build Something Great
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-lg text-text-muted mb-8 max-w-2xl mx-auto"
          >
            Hiring for marketing strategy or growth roles? I bring data rigor,
            creative thinking, and cross-border execution.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-orange text-white rounded-full font-medium magnetic-btn"
            >
              Get in Touch
              <ArrowRight size={20} />
            </Link>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 glass rounded-full font-medium hover:border-primary-orange transition-colors"
            >
              <Download size={20} />
              Download Resume
            </a>
          </motion.div>

          {/* Footer Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-sm text-text-muted"
          >
            📍 Based in China • 🌍 Available Globally • 💼 Full-time & Contract
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
