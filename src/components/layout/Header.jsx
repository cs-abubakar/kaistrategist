import { useState } from 'react';
import { Menu, X, PhoneCall } from 'lucide-react';

const navItems = [
  { label: 'Programs', href: '#programs' },
  { label: 'Countries', href: '#countries' },
  { label: 'Services', href: '#services' },
  { label: 'Scholarships', href: '#scholarships' },
  { label: 'Why China', href: '#why-china' },
  { label: 'Success Stories', href: '#success' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#top" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-[var(--color-primary-blue)] text-white flex items-center justify-center font-bold">GEC</div>
            <div>
              <p className="text-xs uppercase text-gray-500 tracking-wide">Global Educational Consultants</p>
              <p className="text-lg font-semibold text-gray-900">GEC Pathways</p>
            </div>
          </a>
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-gray-700">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-[var(--color-primary-blue)] transition-colors">
                {item.label}
              </a>
            ))}
            <a
              href="https://wa.me/860000000000?text=Hi%20GEC,%20I'm%20interested%20in%20studying%20in%20China."
              className="btn-primary inline-flex items-center gap-2"
            >
              <PhoneCall size={16} /> Apply Now
            </a>
          </nav>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg border border-gray-200"
            aria-label="Toggle navigation"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-3 text-sm font-semibold text-gray-700">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-2"
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://wa.me/860000000000?text=Hi%20GEC,%20I'm%20interested%20in%20studying%20in%20China."
              className="btn-primary inline-flex items-center gap-2 w-full justify-center"
            >
              <PhoneCall size={16} /> Apply Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
