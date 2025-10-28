import { motion } from 'framer-motion';
import { Target, Zap, BarChart, Code, Globe, TrendingUp } from 'lucide-react';

const ApproachSection = () => {
  const approaches = [
    {
      icon: Target,
      color: 'orange',
      title: 'Measurement First',
      description:
        'Architect measurement stack before campaigns launch. No blind spots.',
    },
    {
      icon: Zap,
      color: 'blue',
      title: 'Rapid Testing',
      description:
        'High-velocity testing culture. Ship, measure, learn, iterate.',
    },
    {
      icon: BarChart,
      color: 'orange',
      title: 'Data-Informed Decisions',
      description:
        "Data guides, but doesn't replace judgment. Context matters.",
    },
    {
      icon: Code,
      color: 'blue',
      title: 'Systems Thinking',
      description:
        'Optimize the whole funnel, not isolated metrics. See the big picture.',
    },
    {
      icon: Globe,
      color: 'orange',
      title: 'Cultural Adaptation',
      description:
        'Every market has unique behaviors. Adapt creative and positioning.',
    },
    {
      icon: TrendingUp,
      color: 'blue',
      title: 'Scalability Focus',
      description:
        'Build for 10x scale from day one. No shortcuts that break later.',
    },
  ];

  return (
    <section className="section-padding bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold mb-4"
          >
            My Approach
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-muted max-w-2xl mx-auto"
          >
            How I build marketing systems that scale
          </motion.p>
        </div>

        {/* Approach Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {approaches.map((approach, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="glass rounded-xl p-6 hover:border-primary-orange transition-all group"
            >
              <div
                className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center ${
                  approach.color === 'orange'
                    ? 'bg-primary-orange/20 group-hover:bg-primary-orange/30'
                    : 'bg-primary-blue/20 group-hover:bg-primary-blue/30'
                } transition-colors`}
              >
                <approach.icon
                  className={
                    approach.color === 'orange'
                      ? 'text-primary-orange'
                      : 'text-primary-blue'
                  }
                  size={24}
                />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary-orange transition-colors">
                {approach.title}
              </h3>
              <p className="text-text-muted text-sm">{approach.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
