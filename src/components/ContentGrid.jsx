import ContentTile from './ContentTile';

/**
 * ContentGrid component - Responsive grid for preview tiles
 *
 * Responsive breakpoints (to customize, edit the className below):
 * - grid-cols-1: Mobile (< 640px) - 1 column
 * - sm:grid-cols-2: Small screens (640px+) - 2 columns
 * - md:grid-cols-3: Medium screens (768px+) - 3 columns
 * - xl:grid-cols-4: Large screens (1280px+) - 4 columns
 * - 2xl:grid-cols-5: Extra large screens (1536px+) - 5 columns
 *
 * To switch from 4 to 3 columns earlier, change xl:grid-cols-4 to lg:grid-cols-4
 * (lg breakpoint is 1024px instead of 1280px)
 */
export default function ContentGrid({ items }) {
  if (!items || items.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-gray-500 text-xl">No content available</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      {items.map((content) => (
        <ContentTile key={content.id} content={content} />
      ))}
    </div>
  );
}
