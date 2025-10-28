import { motion } from 'framer-motion';
import { Download, MapPin, Globe, MessageSquare, Briefcase } from 'lucide-react';

const About = () => {
  const stats = [
    { title: 'CS Background', description: 'Technical foundation in tracking & systems' },
    { title: 'MBA Student', description: 'Strategic frameworks for growth' },
    { title: 'Published Research', description: 'Evidence-based marketing approach' },
  ];

  const competencies = [
    { skill: 'Meta Ads', level: 95 },
    { skill: 'Google Ads', level: 90 },
    { skill: 'Server-Side Tracking', level: 85 },
    { skill: 'GA4 / GTM', level: 90 },
    { skill: 'Creative Strategy', level: 85 },
    { skill: 'Landing Page Optimization', level: 80 },
    { skill: 'OCT/VBB', level: 85 },
    { skill: 'Performance Max', level: 90 },
  ];

  const journey = [
    {
      period: '2024–Present',
      title: 'MBA in Marketing',
      organization: 'Yangtze University',
      description:
        'Advanced studies in marketing strategy, consumer behavior, and digital transformation.',
    },
    {
      period: '2022–Present',
      title: 'Marketing Strategist',
      organization: 'Freelance/Contract',
      description:
        'Performance-first campaigns across B2B and B2C verticals. Meta, Google, measurement architecture.',
    },
    {
      period: '2020–2022',
      title: 'Growth Marketing Specialist',
      organization: 'Various Agencies',
      description:
        'Scaled paid acquisition for e-commerce, SaaS, and service businesses. Hands-on with creative testing and funnel optimization.',
    },
    {
      period: '2018–2020',
      title: 'Computer Science Degree',
      organization: 'University',
      description:
        'Technical foundation in programming, systems thinking, and data structures.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold mb-8">
              About Me
            </h1>

            {/* Long-form Description */}
            <div className="space-y-6 text-lg text-text-muted mb-8">
              <p>
                I'm Abu Bakar, though most people call me Kai. I'm a Marketing
                Strategist with a unique blend of technical and strategic
                expertise—Computer Science degree meets MBA-in-progress. That
                combination gives me a technical edge in tracking, measurement,
                and systems thinking, plus the strategic frameworks to connect
                tactics to real business outcomes.
              </p>
              <p>
                I specialize in performance-first paid media across Meta and
                Google, with deep experience in measurement architecture
                (OCT/VBB, server-side tracking), creative strategy, and funnel
                optimization. I've worked with B2B SaaS, e-commerce brands, and
                service businesses—each requiring different approaches to
                attribution, testing velocity, and creative positioning.
              </p>
              <p>
                Currently completing my MBA at Yangtze University in China,
                I've gained cross-cultural marketing insights and a front-row
                seat to one of the world's most dynamic digital ecosystems. My
                academic work includes peer-reviewed research on algorithmic
                personalization, consumer behavior, and digital transformation.
                Everything I do is evidence-based—no hype, just what actually
                drives results.
              </p>
            </div>

            {/* Info Pills */}
            <div className="flex flex-wrap gap-4">
              <div className="glass px-4 py-2 rounded-full inline-flex items-center gap-2">
                <MapPin size={16} className="text-primary-orange" />
                <span className="text-sm">Based in China • Available Globally</span>
              </div>
              <div className="glass px-4 py-2 rounded-full inline-flex items-center gap-2">
                <MessageSquare size={16} className="text-primary-blue" />
                <span className="text-sm">English, Urdu, Basic Chinese</span>
              </div>
              <div className="glass px-4 py-2 rounded-full inline-flex items-center gap-2">
                <Briefcase size={16} className="text-primary-orange" />
                <span className="text-sm">Full-time & Contract</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid md:grid-cols-3 gap-6 mb-16"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="glass rounded-xl p-6 text-center hover:border-primary-orange transition-all"
              >
                <h3 className="text-2xl font-bold text-primary-orange mb-2">
                  {stat.title}
                </h3>
                <p className="text-text-muted text-sm">{stat.description}</p>
              </div>
            ))}
          </motion.div>

          {/* My Approach */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-extrabold mb-6">My Approach</h2>
            <div className="glass rounded-2xl p-8 space-y-4 text-text-muted">
              <p>
                I start with measurement. Before launching campaigns, I
                architect the tracking stack—OCT/VBB for Google, CAPI for Meta,
                server-side events where needed. No blind spots. If we can't
                measure it, we can't optimize it.
              </p>
              <p>
                Next is rapid testing. I run high-velocity creative and
                targeting tests, analyze quickly, and kill what doesn't work. No
                vanity metrics—just what actually moves the funnel forward.
                Testing velocity compounds over time; the team that learns
                fastest wins.
              </p>
              <p>
                Finally, systems thinking. I don't optimize isolated
                metrics—I optimize the whole funnel. That means understanding
                how creative, landing page, offer, and measurement interact. And
                it means building for 10x scale from day one, not patching
                broken foundations later.
              </p>
            </div>
          </motion.div>

          {/* Core Competencies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-extrabold mb-6">Core Competencies</h2>
            <div className="glass rounded-2xl p-8 space-y-6">
              {competencies.map((comp, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{comp.skill}</span>
                    <span className="text-primary-orange font-bold">
                      {comp.level}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${comp.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full bg-gradient-to-r from-primary-orange to-primary-blue"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Journey Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-extrabold mb-6">Journey</h2>
            <div className="space-y-6">
              {journey.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-xl p-6 border-l-4 border-primary-orange hover:border-primary-blue transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <span className="text-primary-orange text-sm font-medium">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-primary-blue font-medium mb-2">
                    {item.organization}
                  </p>
                  <p className="text-text-muted text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Let's Work Together</h2>
              <p className="text-text-muted mb-6">
                Looking for a marketing strategist who brings data rigor,
                creative thinking, and cross-border execution? Let's talk.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-orange text-white rounded-full font-medium magnetic-btn"
              >
                <Download size={20} />
                Download Resume
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
