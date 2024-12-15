import { Link } from 'react-router-dom';
import { Heart, Shield, HelpCircle, Globe, MapPin } from 'lucide-react';

const footerLinks = {
  'help & info': [
    { name: 'About Us', href: '/about', icon: HelpCircle },
    { name: 'Safety Tips', href: '/safety', icon: Shield },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Use', href: '/terms' },
    { name: 'Avoid Scams', href: '/avoid-scams' },
    { name: 'Personal Safety', href: '/personal-safety' },
  ],
  'nearby cities': [
    { name: 'New York City', href: '/nyc' },
    { name: 'Philadelphia', href: '/philadelphia' },
    { name: 'Long Island', href: '/long-island' },
    { name: 'Albany', href: '/albany' },
    { name: 'Hartford', href: '/hartford' },
    { name: 'View All Cities', href: '/cities', icon: MapPin },
  ],
  'popular categories': [
    { name: 'Housing', href: '/search/housing' },
    { name: 'Jobs', href: '/search/jobs' },
    { name: 'For Sale', href: '/search/for-sale' },
    { name: 'Services', href: '/search/services' },
    { name: 'Community', href: '/search/community' },
    { name: 'Discussion Forums', href: '/forums' },
  ],
  'languages': [
    { name: 'English', href: '/lang/en', icon: Globe },
    { name: 'Español', href: '/lang/es' },
    { name: 'Français', href: '/lang/fr' },
    { name: '中文', href: '/lang/zh' },
    { name: 'Português', href: '/lang/pt' },
    { name: 'Deutsch', href: '/lang/de' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="group flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {link.icon && <link.icon className="h-4 w-4 mr-2" />}
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Craigslist - All rights reserved
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Link to="/donate" className="flex items-center text-gray-600 hover:text-red-500">
                <Heart className="h-4 w-4 mr-1" />
                <span>Support Us</span>
              </Link>
              <Link to="/app" className="text-gray-600 hover:text-blue-600">
                Mobile App
              </Link>
              <Link to="/help" className="text-gray-600 hover:text-blue-600">
                Help Center
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}