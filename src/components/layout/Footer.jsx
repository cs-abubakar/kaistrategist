const Footer = () => {
  return (
    <footer className="bg-[var(--color-dark-grey)] mt-16" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-[var(--color-primary-blue)] text-white flex items-center justify-center font-bold">GEC</div>
            <div>
              <p className="text-sm text-gray-600">Global Educational Consultants</p>
              <p className="text-lg font-semibold text-gray-900">GEC Pathways</p>
            </div>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed max-w-xs">
            Building amazing experiences for students worldwide. Your trusted partner for studying in China.
          </p>
          <div className="flex gap-3 text-gray-700">
            <span>WeChat</span>
            <span>WhatsApp</span>
            <span>Facebook</span>
            <span>Instagram</span>
            <span>LinkedIn</span>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
          <div className="space-y-2 text-sm text-gray-700">
            <a href="#top" className="block hover:text-[var(--color-primary-blue)]">Home</a>
            <a href="#about" className="block hover:text-[var(--color-primary-blue)]">About Us</a>
            <a href="#programs" className="block hover:text-[var(--color-primary-blue)]">Programs</a>
            <a href="#services" className="block hover:text-[var(--color-primary-blue)]">Services</a>
            <a href="#countries" className="block hover:text-[var(--color-primary-blue)]">Countries</a>
            <a href="#scholarships" className="block hover:text-[var(--color-primary-blue)]">Scholarships</a>
            <a href="#why-china" className="block hover:text-[var(--color-primary-blue)]">Why China</a>
            <a href="#success" className="block hover:text-[var(--color-primary-blue)]">Success Stories</a>
            <a href="#blog" className="block hover:text-[var(--color-primary-blue)]">Blog</a>
            <a href="#contact" className="block hover:text-[var(--color-primary-blue)]">Contact</a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Popular Programs</h4>
          <div className="space-y-2 text-sm text-gray-700">
            <p>MBBS in China</p>
            <p>Engineering Programs</p>
            <p>Computer Science</p>
            <p>Business (MBA)</p>
            <p>Language Courses</p>
            <p>BDS</p>
            <p>View All Programs</p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Contact Us</h4>
          <div className="space-y-2 text-sm text-gray-700">
            <p>📍 Jingzhou, Hubei, China</p>
            <p>📞 +86-XXX-XXXX-XXXX</p>
            <p>📧 info@gec-pathways.com</p>
            <p>💬 WhatsApp: +86-XXX-XXXX-XXXX</p>
            <p>🕐 Mon-Sat, 9AM-6PM (China Time)</p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-600">
        © 2025 Global Educational Consultants. All rights reserved. Privacy Policy | Terms of Service | Cookie Policy | Sitemap
      </div>
    </footer>
  );
};

export default Footer;
