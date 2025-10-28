import { motion } from 'framer-motion';
import { Code, TrendingUp, Globe } from 'lucide-react';

const AboutSection = () => {
  const cards = [
    {
      icon: Code,
      color: 'orange',
      title: 'Technical Foundation',
      description:
        'CS degree brings analytical rigor and tracking expertise to performance marketing.',
    },
    {
      icon: TrendingUp,
      color: 'blue',
      title: 'Strategic Thinking',
      description:
        'MBA frameworks applied to growth challenges, funnel optimization, and scaling.',
    },
    {
      icon: Globe,
      color: 'orange',
      title: 'Global Perspective',
      description:
        'Cross-cultural experience in China informs creative strategy and market adaptation.',
    },
  ];

  return (
    <section className="section-padding border-t border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-extrabold mb-8 text-center"
        >
          Who I Am & What I Do
        </motion.h2>

        {/* Main Description Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-8 mb-12"
        >
          <div className="space-y-4 text-text-muted">
            <p>
              I'm a Marketing Strategist with a Computer Science background and
              an MBA focus. That combination gives me a technical edge in
              tracking, measurement, and systems thinking—plus the strategic
              frameworks to connect tactics to business outcomes.
            </p>
            <p>
              My MBA studies in China have given me cross-cultural marketing
              insights and a front-row seat to one of the world's most dynamic
              digital ecosystems. I understand how platforms evolve and where
              trends emerge before they hit the West.
            </p>
            <p>
              I've also contributed peer-reviewed research on digital marketing
              and consumer behavior. My work is evidence-based, not
              hype-driven—every strategy is grounded in what actually works.
            </p>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="glass rounded-xl p-6 hover:border-primary-orange transition-all"
            >
              <div
                className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center ${
                  card.color === 'orange'
                    ? 'bg-primary-orange/20'
                    : 'bg-primary-blue/20'
                }`}
              >
                <card.icon
                  className={
                    card.color === 'orange'
                      ? 'text-primary-orange'
                      : 'text-primary-blue'
                  }
                  size={24}
                />
              </div>
              <h3 className="text-xl font-bold mb-2">{card.title}</h3>
              <p className="text-text-muted text-sm">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
