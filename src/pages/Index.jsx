import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContent } from '../features/content/contentSlice';
import ContentGrid from '../components/ContentGrid';
import Sidebar from '../components/Sidebar';
import BottomBar from '../components/BottomBar';
import SearchBar from '../components/SearchBar';
import SEO from '../components/SEO';

/**
 * Index page - Main landing page
 * Layout similar to Sora explore page:
 * - Fixed left sidebar with logo and menu icons
 * - Main content area with search and video grid (4:3 preview images)
 * - Fixed bottom menu bar
 * - Black and white color scheme
 */
export default function Index() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.content);

  useEffect(() => {
    dispatch(fetchContent({ limit: 50, offset: 0 }));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO />
      <Sidebar />

      {/* Main content area with left margin for sidebar */}
      <div className="ml-16 pb-16">
        <div className="max-w-screen-2xl mx-auto px-6 py-8">
          {/* Header with search */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Explore</h1>
            <SearchBar />
          </div>

          {/* Content grid - all previews in 4:3 ratio */}
          {loading ? (
            <div className="text-center text-gray-400 py-20">Loading content...</div>
          ) : (
            <ContentGrid items={items} />
          )}
        </div>
      </div>

      <BottomBar />
    </div>
  );
}
