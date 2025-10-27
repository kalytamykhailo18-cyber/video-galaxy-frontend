import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * ContentTile component for index page
 *
 * CSS Image Fitting Options (change className on <img> tag):
 * 1. "preview images cut" (default): className="w-full h-full object-cover"
 *    - Crops/cuts the image to fill the 4:3 box, maintaining aspect ratio
 * 2. "preview images transformed": className="w-full h-full object-contain"
 *    - Scales entire image to fit inside 4:3 box, adds black bars if needed
 *
 * To switch: Find the <img> tag below and change object-cover to object-contain or vice versa
 */
export default function ContentTile({ content }) {
  const [imageVariant, setImageVariant] = useState('a');

  useEffect(() => {
    // Get random image variant based on number of images available
    const numImages = parseInt(content.images) || 1;
    const variants = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const availableVariants = variants.slice(0, numImages);
    const randomVariant = availableVariants[Math.floor(Math.random() * availableVariants.length)];
    setImageVariant(randomVariant);
  }, [content.images]);

  const getMediaUrl = (filenameRoot) => {
    if (!filenameRoot) return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23000" width="400" height="300"/%3E%3C/svg%3E';

    return `/images/${filenameRoot}-${imageVariant}.jpg`;
  };

  return (
    <Link
      to={`/watch/${content.id}`}
      className="group relative aspect-[4/3] overflow-hidden bg-black rounded border border-gray-800 hover:border-gray-600 transition-all"
    >
      <img
        src={getMediaUrl(content.filenameRoot)}
        alt={content.imgAltTxt || content.title}
        className="w-full h-full object-cover"
        onError={(e) => {
          // Fallback to -a variant if random variant doesn't exist
          if (!e.target.src.includes('-a.jpg') && content.filenameRoot) {
            e.target.src = `/images/${content.filenameRoot}-a.jpg`;
          } else {
            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23000" width="400" height="300"/%3E%3C/svg%3E';
          }
        }}
      />

      <div className="absolute bottom-0 left-0 right-0 bg-black/40 p-3 flex items-center justify-between">
        <h3 className="font-semibold text-white text-sm line-clamp-1 flex-1">{content.title}</h3>
        {content.type === 'photo' && (
          <span className="text-xs text-gray-300 ml-2 whitespace-nowrap">photo series</span>
        )}
      </div>
    </Link>
  );
}
