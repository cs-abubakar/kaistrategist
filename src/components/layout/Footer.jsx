import { Link } from 'react-router-dom';
import { Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <Link to="/" className="text-2xl font-extrabold inline-block mb-4">
              <span className="gradient-text">KAI</span>
            </Link>
            <p className="text-text-muted text-sm max-w-xs">
              Marketing Strategist — performance-first, CS + MBA, published researcher.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <nav className="space-y-2">
              <Link to="/work" className="block text-text-muted hover:text-white text-sm transition-colors">
                Work
              </Link>
              <Link to="/research" className="block text-text-muted hover:text-white text-sm transition-colors">
                Research
              </Link>
              <Link to="/blog" className="block text-text-muted hover:text-white text-sm transition-colors">
                Blog
              </Link>
              <Link to="/about" className="block text-text-muted hover:text-white text-sm transition-colors">
                About
              </Link>
              <Link to="/contact" className="block text-text-muted hover:text-white text-sm transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <a
              href="mailto:connect@kaistrategist.com"
              className="block text-text-muted hover:text-primary-orange text-sm transition-colors mb-4"
            >
              connect@kaistrategist.com
            </a>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/abubakar7776"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-primary-orange transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.instagram.com/cs_sheby"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-primary-orange transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-text-muted">
          <p>© 2025 Abu Bakar (Kai). All rights reserved.</p>
          <p>Based in China · Available globally</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
