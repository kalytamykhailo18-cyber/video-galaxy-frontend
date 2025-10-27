import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLinks } from '../features/content/contentSlice';
import {
  HomeIcon,
  InformationCircleIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

/**
 * Bottom horizontal menu bar
 * Shows icons and text links horizontally (side by side)
 * Uses placeholder icons until real links are configured
 */
function BottomBar() {
  const dispatch = useDispatch();
  const { links } = useSelector((state) => state.content);
  const [menuLinks, setMenuLinks] = useState([]);

  // Map of placeholder icons
  const iconMap = {
    home: HomeIcon,
    about: InformationCircleIcon,
    contact: EnvelopeIcon,
    terms: DocumentTextIcon,
    privacy: ShieldCheckIcon,
  };

  useEffect(() => {
    dispatch(fetchLinks());
  }, [dispatch]);

  useEffect(() => {
    if (links && links.length > 0) {
      setMenuLinks(links.map(link => ({
        label: link.text,
        url: link.url,
        external: true,
        icon: HomeIcon, // Default icon for DB links
      })));
    } else {
      // Placeholder links with icons until DB is ready
      setMenuLinks([
        { label: 'Home', url: '/', external: false, icon: HomeIcon },
        { label: 'About', url: '/about', external: false, icon: InformationCircleIcon },
        { label: 'Contact', url: '/contact', external: false, icon: EnvelopeIcon },
        { label: 'Terms', url: '/terms', external: false, icon: DocumentTextIcon },
        { label: 'Privacy', url: '/privacy', external: false, icon: ShieldCheckIcon },
      ]);
    }
  }, [links]);

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-16 bg-black border-t border-gray-800 flex items-center justify-center gap-8 px-4 z-40 ml-16">
      {menuLinks.map((link, index) => {
        const IconComponent = link.icon;

        return link.external ? (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <IconComponent className="w-5 h-5" />
            <span className="text-sm">{link.label}</span>
          </a>
        ) : (
          <Link
            key={index}
            to={link.url}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <IconComponent className="w-5 h-5" />
            <span className="text-sm">{link.label}</span>
          </Link>
        );
      })}
    </footer>
  );
}

export default BottomBar;
