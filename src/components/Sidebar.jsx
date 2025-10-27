import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  HomeIcon,
  MagnifyingGlassIcon,
  FilmIcon,
  UserIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [externalLinks, setExternalLinks] = useState([]);

  const fixedMenuItems = [
    { icon: HomeIcon, label: 'Home', path: '/', type: 'internal' },
    { icon: MagnifyingGlassIcon, label: 'Search', path: '/search', type: 'internal' },
    { icon: FilmIcon, label: 'Videos', path: '/videos', type: 'internal' },
    { icon: UserIcon, label: 'Member', path: '/member', type: 'internal' },
    { icon: InformationCircleIcon, label: 'About', path: '/', type: 'internal' },
  ];

  useEffect(() => {
    fetch('/api/links')
      .then(res => res.json())
      .then(data => {
        if (data.data && Array.isArray(data.data)) {
          setExternalLinks(data.data.slice(0, 5));
        }
      })
      .catch(err => console.error('Failed to load links:', err));
  }, []);

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-black border-r border-gray-800 flex flex-col py-6 z-50 transition-all duration-300 ${
        isExpanded ? 'w-64' : 'w-16'
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex items-center justify-between px-4 mb-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center flex-shrink-0">
            <span className="text-black font-bold text-sm">SP</span>
          </div>
          {isExpanded && (
            <span className="text-white font-semibold text-lg whitespace-nowrap">SquarePixel</span>
          )}
        </Link>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {fixedMenuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900 transition-colors"
          >
            <item.icon className="w-6 h-6 flex-shrink-0" />
            {isExpanded && (
              <span className="text-sm whitespace-nowrap">{item.label}</span>
            )}
          </Link>
        ))}

        {isExpanded && externalLinks.length > 0 && (
          <>
            <div className="border-t border-gray-800 my-2"></div>
            {externalLinks.map((link, index) => (
              <a
                key={`ext-${index}`}
                href={link.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900 transition-colors"
              >
                <span className="text-sm whitespace-nowrap truncate">{link.text}</span>
              </a>
            ))}
          </>
        )}
      </nav>
    </aside>
  );
}

export default Sidebar;
