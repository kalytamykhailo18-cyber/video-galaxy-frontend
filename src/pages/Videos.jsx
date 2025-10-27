import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContent } from '../features/content/contentSlice';
import ContentGrid from '../components/ContentGrid';
import Sidebar from '../components/Sidebar';
import BottomBar from '../components/BottomBar';
import SEO from '../components/SEO';

/**
 * Videos page - Shows only video content (filters out photos)
 */
export default function Videos() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.content);

  useEffect(() => {
    dispatch(fetchContent({ limit: 100 }));
  }, [dispatch]);

  // Filter to show only videos - memoized to prevent unnecessary re-renders
  const videos = useMemo(() => items.filter(item => item.type === 'video'), [items]);

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO title="Videos - SquarePixel" description="Browse all video content" />
      <Sidebar />

      <div className="ml-16 pb-16">
        <div className="max-w-screen-2xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Videos</h1>
            <p className="text-gray-400">Browse all video content ({videos.length} videos)</p>
          </div>

          {loading ? (
            <div className="text-center text-gray-400 py-20">Loading videos...</div>
          ) : (
            <ContentGrid items={videos} />
          )}
        </div>
      </div>

      <BottomBar />
    </div>
  );
}
