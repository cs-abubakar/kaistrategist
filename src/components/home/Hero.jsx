import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const stats = [
    { label: 'Years in Paid Growth', value: '3+' },
    { label: 'Publications', value: 'Peer-Reviewed' },
    { label: 'Education', value: 'MBA' },
  ];

  const badges = [
    { text: 'Expertise: Meta Ads', color: 'orange', position: 'top-left' },
    { text: 'Platform: Google Ads', color: 'blue', position: 'bottom-right' },
  ];

  return (
    <section className="section-padding overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block glass px-4 py-2 rounded-full mb-8"
            >
              <span className="text-primary-orange text-sm font-medium">
                Available for Full-Time & Contract Work
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6"
            >
              Abu Bakar{' '}
              <span className="gradient-text">(Kai)</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-text-muted mb-6"
            >
              Marketing Strategist — performance-first, CS + MBA, published researcher.
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-base md:text-lg text-text-muted mb-8 max-w-2xl"
            >
              I engineer paid media that's measurable, scalable, and brand-safe.
              Specializing in Meta & Google with data-driven creative strategy.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Link
                to="/work"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-orange text-white rounded-full font-medium magnetic-btn"
              >
                View Work
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 glass rounded-full font-medium hover:border-primary-orange transition-colors"
              >
                Get in Touch
              </Link>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-3 gap-6"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-extrabold text-primary-orange mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-text-muted">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Profile Placeholder with Floating Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative"
          >
            {/* Profile Placeholder */}
            <div className="aspect-square glass rounded-3xl flex items-center justify-center relative overflow-hidden">
              <div className="text-9xl font-extrabold gradient-text">
                K
              </div>

              {/* Floating Badges */}
              {badges.map((badge, index) => (
                <motion.div
                  key={index}
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                  className={`absolute ${
                    badge.position === 'top-left'
                      ? 'top-8 left-8'
                      : 'bottom-8 right-8'
                  } glass px-4 py-2 rounded-full`}
                >
                  <span
                    className={`text-sm font-medium ${
                      badge.color === 'orange'
                        ? 'text-primary-orange'
                        : 'text-primary-blue'
                    }`}
                  >
                    {badge.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Background Gradients */}
            <div className="absolute -z-10 top-1/4 left-1/4 w-64 h-64 bg-primary-orange/20 rounded-full blur-3xl" />
            <div className="absolute -z-10 bottom-1/4 right-1/4 w-64 h-64 bg-primary-blue/20 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
