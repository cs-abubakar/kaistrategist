import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Linkedin, Instagram, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    roleType: '',
    budget: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Using Web3Forms - Free email service (get key at https://web3forms.com)
      const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          subject: `New Portfolio Inquiry from ${formData.name}`,
          message: `
Company: ${formData.company || 'Not provided'}
Role Type: ${formData.roleType || 'Not specified'}
Budget: ${formData.budget || 'Not specified'}

Message:
${formData.message}
          `,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
      } else {
        // Fallback to mailto if Web3Forms fails
        const mailtoLink = `mailto:connect@kaistrategist.com?subject=Portfolio Inquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`;
        window.location.href = mailtoLink;
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      // Fallback to mailto
      const mailtoLink = `mailto:connect@kaistrategist.com?subject=Portfolio Inquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`;
      window.location.href = mailtoLink;
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      company: '',
      roleType: '',
      budget: '',
      message: '',
    });
  };

  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
                Let's Connect
              </h1>
              <p className="text-lg text-text-muted mb-8">
                Hiring for marketing strategy or growth roles? I bring data
                rigor, creative thinking, and cross-border execution. Let's
                discuss how I can help drive measurable results for your team.
              </p>

              {/* Contact Cards */}
              <div className="space-y-4 mb-8">
                <div className="glass rounded-xl p-6 hover:border-primary-orange transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary-orange/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="text-primary-orange" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Email</h3>
                      <a
                        href="mailto:connect@kaistrategist.com"
                        className="text-text-muted hover:text-primary-orange transition-colors"
                      >
                        connect@kaistrategist.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-xl p-6 hover:border-primary-blue transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary-blue/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-primary-blue" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Location</h3>
                      <p className="text-text-muted">
                        Based in China, Available globally
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mb-8">
                <h3 className="font-bold mb-4">Connect on Social</h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.linkedin.com/in/abubakar7776"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 glass rounded-lg flex items-center justify-center hover:border-primary-orange transition-all"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="https://www.instagram.com/cs_sheby"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 glass rounded-lg flex items-center justify-center hover:border-primary-orange transition-all"
                    aria-label="Instagram"
                  >
                    <Instagram size={20} />
                  </a>
                </div>
              </div>

              {/* Availability Card */}
              <div className="glass rounded-xl p-6 border-l-4 border-primary-orange">
                <h3 className="font-bold mb-2">Availability</h3>
                <p className="text-text-muted text-sm">
                  I'm currently open to full-time and contract opportunities.
                  Typical response time is within 24 hours.
                </p>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="glass rounded-2xl p-8">
                  <div className="space-y-6">
                    {/* Name Field */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
                      >
                        Your Name <span className="text-primary-orange">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white placeholder-text-muted"
                        placeholder="Abu Bakar"
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
                      >
                        Email <span className="text-primary-orange">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white placeholder-text-muted"
                        placeholder="you@company.com"
                      />
                    </div>

                    {/* Company Field */}
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium mb-2"
                      >
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white placeholder-text-muted"
                        placeholder="Your Company"
                      />
                    </div>

                    {/* Role Type Field */}
                    <div>
                      <label
                        htmlFor="roleType"
                        className="block text-sm font-medium mb-2"
                      >
                        Role Type
                      </label>
                      <select
                        id="roleType"
                        name="roleType"
                        value={formData.roleType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white"
                      >
                        <option value="">Select role type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Project-based">Project-based</option>
                        <option value="Consulting">Consulting</option>
                      </select>
                    </div>

                    {/* Budget Field */}
                    <div>
                      <label
                        htmlFor="budget"
                        className="block text-sm font-medium mb-2"
                      >
                        Budget / Salary Range
                      </label>
                      <input
                        type="text"
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white placeholder-text-muted"
                        placeholder="e.g., $80k-$100k or $5k/month"
                      />
                    </div>

                    {/* Message Field */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-2"
                      >
                        Message <span className="text-primary-orange">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange text-white placeholder-text-muted resize-none"
                        placeholder="Tell me about the role, your goals, and what you're looking for..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-8 py-4 bg-primary-orange text-white rounded-full font-medium magnetic-btn flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        'Sending...'
                      ) : (
                        <>
                          Send Message
                          <Send size={20} />
                        </>
                      )}
                    </button>

                    {/* Disclaimer */}
                    <p className="text-xs text-text-muted text-center">
                      By submitting this form, you agree to receive email
                      responses regarding your inquiry.
                    </p>
                  </div>
                </form>
              ) : (
                // Success State
                <div className="glass rounded-2xl p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-primary-orange/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-primary-orange" size={48} />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Message Sent!</h2>
                  <p className="text-text-muted mb-8">
                    Thanks for reaching out. I'll get back to you within 24
                    hours.
                  </p>
                  <button
                    onClick={handleReset}
                    className="px-8 py-3 glass rounded-full font-medium hover:border-primary-orange transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
