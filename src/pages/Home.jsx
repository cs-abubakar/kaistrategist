import { CheckCircle2, Globe2, GraduationCap, HeartPulse, ShieldCheck, Star, Video } from 'lucide-react';

const fearCards = [
  {
    title: 'Worried About Scams?',
    body: "We're registered and based in Jingzhou, China. Visit our physical office and meet our team.",
    color: 'bg-[var(--color-light-blue)]',
    cta: 'See Our Office Photos',
  },
  {
    title: 'Fear of Being Alone Abroad?',
    body: '24/7 on-ground support from airport pickup to graduation. Our team lives in China.',
    color: 'bg-[var(--color-purple)]',
    cta: 'Meet Your Support Team',
  },
  {
    title: 'No Hidden Fees. Ever.',
    body: '100% transparent pricing. See exact costs before you commit. No surprises, no fine print.',
    color: 'bg-[var(--color-peach)]',
    cta: 'View Cost Breakdown',
  },
  {
    title: 'Tired of Inexperienced Agents?',
    body: 'Founded by doctors who studied in China. We guide you with firsthand experience.',
    color: 'bg-[var(--color-turquoise)]',
    cta: 'Meet the Doctors',
  },
  {
    title: 'Frustrated by Slow Responses?',
    body: 'We respond within 24 hours on WhatsApp. Real humans, not bots. Try us.',
    color: 'bg-[var(--color-yellow)]',
    cta: 'Chat on WhatsApp',
  },
  {
    title: 'Language Barriers Holding You Back?',
    body: 'Our multilingual team speaks English, Urdu, Arabic, and Chinese. Zero language stress.',
    color: 'bg-[var(--color-pink)]',
    cta: 'Talk to Us in Your Language',
  },
];

const programs = [
  {
    title: 'MBBS',
    highlight: 'Most Popular',
    duration: '5-6 Years',
    success: '95% success',
    language: 'English Taught',
    price: 'From $4,000/yr',
    features: [
      'WHO & PMDC Recognized',
      'Clinical rotations from Year 3',
      'Doctor-led mentorship',
    ],
  },
  {
    title: 'Language Programs',
    duration: '6-12 Months',
    success: 'HSK 3-6 prep',
    language: 'Immersive',
    price: 'From $2,000',
    features: ['Mock exams & cultural tours', 'Qualified teachers', 'Flexible durations'],
  },
  {
    title: 'International Economy & Trade',
    duration: '4 Years',
    success: 'Internships',
    language: 'English Taught',
    price: 'Scholarships available',
    features: ['Global business focus', 'Career-ready curriculum', 'Networking with industry'],
  },
  {
    title: 'International Relations',
    duration: '4 Years',
    success: 'Policy focus',
    language: 'English Taught',
    price: 'Scholarships available',
    features: ['Diplomatic preparation', 'Multilingual environment', 'Governance & policy'],
  },
  {
    title: 'Computer Science',
    highlight: 'High Demand',
    duration: '4 Years',
    success: '95% job placement',
    language: 'English Taught',
    price: 'Internships included',
    features: ['AI/ML specialization', 'Industry-led projects', 'Top-ranked universities'],
  },
  {
    title: 'BDS',
    duration: '5 Years',
    success: 'Clinical training',
    language: 'English Taught',
    price: 'Affordable fees',
    features: ['Modern facilities', 'International recognition', 'Hands-on learning'],
  },
  {
    title: 'Nursing',
    duration: '4 Years',
    success: 'Global demand',
    language: 'English Programs',
    price: 'Clinical rotations',
    features: ['Practical clinical training', 'International standards', 'High global demand'],
  },
  {
    title: 'Artificial Intelligence',
    highlight: 'Emerging Field',
    duration: '4 Years',
    success: 'Industry partnerships',
    language: 'English Taught',
    price: 'Research opportunities',
    features: ['Cutting-edge curriculum', 'Future-proof career', 'Research labs'],
  },
];

const countries = [
  { name: 'Pakistan', active: true, stats: '200+ students placed' },
  { name: 'India', active: false },
  { name: 'Bangladesh', active: false },
  { name: 'Sudan', active: false },
  { name: 'Morocco', active: false },
  { name: 'Yemen', active: false },
  { name: 'Oman', active: false },
  { name: 'Uganda', active: false },
  { name: 'Tanzania', active: false },
  { name: 'Saudi Arabia', active: false },
  { name: 'Cameroon', active: false },
  { name: 'Ghana', active: false },
  { name: 'Iran', active: false },
];

const whyChina = [
  { title: 'Quality Education', body: 'Top global universities with WHO/PMDC recognition.', icon: GraduationCap },
  { title: 'Affordable Tuition & Living', body: '50% lower costs than Western countries.', icon: ShieldCheck },
  { title: 'Scholarship Opportunities', body: 'Up to 100% tuition coverage available.', icon: Star },
  { title: 'Rich Culture & Language', body: 'Learn Mandarin while immersing in 5,000 years of history.', icon: Globe2 },
  { title: 'Global Career Opportunities', body: 'Chinese companies hiring worldwide, Belt & Road connections.', icon: HeartPulse },
  { title: 'Modern Campuses', body: 'State-of-the-art labs, libraries, and student centers.', icon: CheckCircle2 },
  { title: 'Safe & Welcoming', body: 'Low crime rates with strong international student support.', icon: ShieldCheck },
  { title: 'Innovation Hub', body: 'AI, robotics, engineering boom with rapid tech growth.', icon: Video },
];

const successStories = [
  {
    name: 'Dr. Sarah Ahmed',
    country: 'UAE',
    program: 'MBBS, Beijing Medical University',
    quote: 'GEC made my dream of studying medicine a reality. From visa processing to airport pickup, they were with me every step.',
    color: 'bg-[var(--color-light-blue)]',
  },
  {
    name: 'Ahmed Hassan',
    country: 'Pakistan',
    program: 'Computer Science',
    quote: 'They helped me secure a scholarship and navigate university life in China. Best decision ever!',
    color: 'bg-[var(--color-purple)]',
  },
  {
    name: 'Fatima Khan',
    country: 'Pakistan',
    program: 'Business Administration',
    quote: "GEC's team made everything smooth. They even helped me set up my bank account and WeChat.",
    color: 'bg-[var(--color-turquoise)]',
  },
  {
    name: 'Omar Abdullah',
    country: 'Saudi Arabia',
    program: 'Engineering',
    quote: "Their advice on university selection was spot-on. Now working at Huawei!",
    color: 'bg-[var(--color-orange)]',
  },
];

const services = [
  {
    title: 'University Placement',
    description: 'Expert matching, application support, and admission success across 15+ partner universities.',
  },
  {
    title: 'Visa Assistance',
    description: 'Document prep, interview coaching, and 95% visa success rate for our students.',
  },
  {
    title: 'HSK Preparation',
    description: 'HSK 3-6 courses, weekly mock exams, and award ceremonies for top achievers.',
  },
  {
    title: 'Initial Settlement Support',
    description: 'Airport pickup, SIM/bank setup, accommodation support, and cultural onboarding.',
  },
];

const scholarshipHighlights = [
  {
    title: "Bachelor's Scholarships",
    points: ['Full tuition coverage options', '30-70% partial scholarships', 'Merit-based awards'],
  },
  {
    title: "Master's Scholarships",
    points: ['Research grants & assistantships', 'Teaching assistant roles', 'CSC scholarships'],
  },
  {
    title: 'PhD Scholarships',
    points: ['Full funding packages', 'Living stipends included', 'Research opportunities'],
  },
];

const blogPreview = [
  'Complete Guide: MBBS in China for Pakistani Students (2025)',
  'How to Prepare for HSK 4 in 6 Months',
  'Student Life in Jingzhou: A First-Hand Experience',
];

const Home = () => {
  return (
    <div className="space-y-24" id="top">
      {/* Hero */}
      <section className="pt-24" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--color-light-blue)]/20 text-[var(--color-primary-blue)] font-semibold">
              <span role="img" aria-label="flag">🇨🇳</span> GEC Pathways · China-Based
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              Study. Explore. Succeed — in China.
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              Expert guidance from a doctor-led team • 500+ successful students • Based in Jingzhou, China.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-gray-800">
              <span className="badge bg-[var(--color-primary-blue)]/10 text-[var(--color-primary-blue)]">✓ Doctor-Led Team</span>
              <span className="badge bg-[var(--color-primary-green)]/10 text-[var(--color-primary-green)]">✓ China-Based Office</span>
              <span className="badge bg-[var(--color-yellow)]/50 text-gray-900">✓ 95% Visa Success</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/860000000000?text=Hi%20GEC,%20I'm%20interested%20in%20studying%20in%20China."
                className="btn-primary"
              >
                Start Free Consultation
              </a>
              <a href="#programs" className="btn-secondary">
                Explore Programs
              </a>
            </div>
          </div>
          <div className="section-card bg-gradient-to-br from-[var(--color-dark-grey)] to-white shadow-xl">
            <div className="bg-white rounded-xl p-6 border border-gray-100 space-y-4">
              <p className="text-sm font-semibold text-gray-500">Doctor-Led Team</p>
              <h3 className="text-2xl font-bold text-gray-900">Your trusted partners in China</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Founded by Dr. Sohail, Dr. Amir, and Dr. Adnan—doctors who studied in China and now guide you through every step of the journey.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-4 rounded-lg bg-[var(--color-light-blue)]/20">
                  <p className="font-semibold text-gray-900">500+</p>
                  <p className="text-gray-600">Students guided</p>
                </div>
                <div className="p-4 rounded-lg bg-[var(--color-primary-green)]/10">
                  <p className="font-semibold text-gray-900">95%</p>
                  <p className="text-gray-600">Visa success</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="bg-white py-10 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[{label:'Students Guided',value:'500+',icon:'🎓'},{label:'Doctors on Team',value:'3',icon:'🩺'},{label:'Visa Success Rate',value:'95%',icon:'✅'},{label:'Partner Universities',value:'15+',icon:'🏫'}].map((stat) => (
            <div key={stat.label} className="section-card shadow-sm">
              <p className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">{stat.icon} {stat.value}</p>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fear solutions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" id="fears">
        <div className="space-y-3">
          <p className="text-sm font-semibold text-[var(--color-primary-blue)]">We understand your fears</p>
          <h2 className="text-3xl font-bold text-gray-900">Real concerns, answered by a team on the ground</h2>
          <p className="text-gray-700">Six common worries from students and how we solve them.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fearCards.map((card) => (
            <div key={card.title} className={`section-card ${card.color} border border-gray-100`}>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{card.title}</h3>
              <p className="text-gray-800 text-sm leading-relaxed mb-4">{card.body}</p>
              <button className="text-[var(--color-primary-blue)] font-semibold text-sm">{card.cta}</button>
            </div>
          ))}
        </div>
      </section>

      {/* Programs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" id="programs">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-[var(--color-primary-green)]">Programs Overview</p>
          <h2 className="text-3xl font-bold text-gray-900">Choose from 8 proven pathways</h2>
          <p className="text-gray-700">All programs are English taught with transparent fees and visa-ready support.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program) => (
            <div key={program.title} className="section-card flex flex-col border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-900">{program.title}</h3>
                {program.highlight && (
                  <span className="badge bg-[var(--color-yellow)] text-gray-900">{program.highlight}</span>
                )}
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-gray-700 mb-3">
                <span className="badge bg-gray-100">{program.duration}</span>
                <span className="badge bg-gray-100">{program.success}</span>
                <span className="badge bg-gray-100">{program.language}</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-700 flex-1">
                {program.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <CheckCircle2 className="text-[var(--color-primary-green)]" size={18} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-between text-sm font-semibold text-gray-900">
                <span>{program.price}</span>
                <a href="#contact" className="text-[var(--color-primary-blue)]">Learn more</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Countries */}
      <section className="bg-white py-16" id="countries">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-[var(--color-primary-blue)]">Your Country Gateway</p>
            <h2 className="text-3xl font-bold text-gray-900">Tailored guidance for 13+ countries</h2>
            <p className="text-gray-700">Pakistan page live today; more guides launching soon.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {countries.map((country) => (
              <div key={country.name} className={`section-card border ${country.active ? 'border-[var(--color-primary-green)]' : 'border-dashed border-gray-200'} flex flex-col gap-2`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">{country.name}</h3>
                  {country.active ? (
                    <span className="badge bg-[var(--color-primary-green)]/20 text-[var(--color-primary-green)]">Active</span>
                  ) : (
                    <span className="badge bg-gray-100 text-gray-600">Coming soon</span>
                  )}
                </div>
                {country.stats && <p className="text-sm text-gray-700">{country.stats}</p>}
                <button className={`text-sm font-semibold ${country.active ? 'text-[var(--color-primary-green)]' : 'text-gray-500'}`}>
                  {country.active ? 'View Pakistan Guide' : 'Notify me when live'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why China */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" id="why-china">
        <div className="space-y-3">
          <p className="text-sm font-semibold text-[var(--color-primary-blue)]">Why Study in China?</p>
          <h2 className="text-3xl font-bold text-gray-900">Because your future deserves the best</h2>
          <p className="text-gray-700">Eight reasons 500,000+ international students pick China every year.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {whyChina.map(({ title, body, icon: Icon }) => (
            <div key={title} className="section-card border border-gray-100">
              <Icon className="text-[var(--color-primary-blue)]" />
              <h3 className="text-lg font-semibold text-gray-900 mt-3">{title}</h3>
              <p className="text-sm text-gray-700 mt-2 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
        <a href="#why-china" className="btn-primary inline-block">Discover More Benefits</a>
      </section>

      {/* Success Stories */}
      <section className="bg-[var(--color-dark-grey)] py-16" id="success">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-[var(--color-primary-blue)]">Success Stories</p>
            <h2 className="text-3xl font-bold text-gray-900">Real stories. Real success.</h2>
            <p className="text-gray-700">Join 500+ students who trusted GEC.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {successStories.map((story) => (
              <div key={story.name} className={`section-card ${story.color} border border-gray-100`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-white/70 flex items-center justify-center font-bold text-gray-900">★</div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{story.name}</p>
                    <p className="text-xs text-gray-700">{story.country} · {story.program}</p>
                  </div>
                </div>
                <p className="text-gray-800 text-sm leading-relaxed">“{story.quote}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" id="services">
        <div className="space-y-3">
          <p className="text-sm font-semibold text-[var(--color-primary-blue)]">Services</p>
          <h2 className="text-3xl font-bold text-gray-900">End-to-end support for your study journey</h2>
          <p className="text-gray-700">From application to graduation—we're with you every step.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service) => (
            <div key={service.title} className="section-card border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{service.description}</p>
              <button className="text-[var(--color-primary-blue)] font-semibold text-sm mt-3">Learn more</button>
            </div>
          ))}
        </div>
      </section>

      {/* Scholarships */}
      <section className="bg-[var(--color-yellow)] py-16" id="scholarships">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-900">Scholarships</p>
            <h2 className="text-3xl font-bold text-gray-900">Up to 100% scholarship available</h2>
            <p className="text-gray-800">For Bachelors, Masters, PhD & Diploma Programs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {scholarshipHighlights.map((item) => (
              <div key={item.title} className="section-card border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <ul className="space-y-2 text-sm text-gray-800">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <CheckCircle2 size={18} className="text-[var(--color-primary-blue)]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <a href="#contact" className="btn-primary inline-flex items-center gap-2">Explore All Scholarships</a>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6" id="blog">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-[var(--color-primary-blue)]">Latest Insights</p>
          <h2 className="text-3xl font-bold text-gray-900">Fresh guides & resources</h2>
          <p className="text-gray-700">Stay updated with tips on admissions, visas, and life in China.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {blogPreview.map((post) => (
            <div key={post} className="section-card border border-gray-100">
              <p className="text-xs font-semibold text-[var(--color-primary-blue)] mb-2">Resource</p>
              <h3 className="text-lg font-semibold text-gray-900">{post}</h3>
              <p className="text-sm text-gray-700 mt-2">Read more →</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[var(--color-dark-grey)] py-16" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="text-[120px] lg:text-[140px] font-bold text-gray-300 leading-none">We Got You!</div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">Ready to start your journey?</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Book your free consultation now. No hidden fees. No obligations. Just honest guidance from a team living in China.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-gray-800">
              <span className="badge bg-white border border-gray-200">✓ Free Consultation</span>
              <span className="badge bg-white border border-gray-200">✓ 24-Hour Response</span>
              <span className="badge bg-white border border-gray-200">✓ No Obligation</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/860000000000?text=Hi%20GEC,%20I'm%20interested%20in%20studying%20in%20China."
                className="btn-primary"
              >
                Contact Us on WhatsApp
              </a>
              <a href="mailto:info@gec-pathways.com" className="btn-secondary">Schedule Video Call</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
