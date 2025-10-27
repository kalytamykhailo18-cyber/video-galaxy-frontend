import ContentTile from './ContentTile';

export default function ContentGrid({ items }) {
  if (!items || items.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-gray-500 text-xl">No content available</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((content) => (
        <ContentTile key={content.id} content={content} />
      ))}
    </div>
  );
}
