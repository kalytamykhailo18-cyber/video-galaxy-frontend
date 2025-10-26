import { Link } from 'react-router-dom';

/**
 * ContentTile component for index page
 * ALWAYS displays preview images in 4:3 ratio (forced)
 * Shows title and description overlay on hover with semi-transparent black background
 */
export default function ContentTile({ content }) {
  const getMediaUrl = (filenameRoot) => {
    const mediaMap = {
      'birds4': 'https://drive.google.com/uc?export=view&id=1gN-R2t4VPWI00lsfWRXPMegUrTvZZz8B',
      'birds6': 'https://drive.google.com/uc?export=view&id=1HjVMXHVPO9cGGt9wz8QV5SJjnvdMKKc3',
      'birds7': 'https://drive.google.com/uc?export=view&id=1I_K-PDHeSfOrwMxN3FJW3dWY0prwvTBk',
      'cats2': 'https://drive.google.com/uc?export=view&id=1gjZMXxnOQxY2aDcSbKGBrT1nVICFsFbC',
      'Maestro': 'https://drive.google.com/uc?export=view&id=1PGVGfW0Mb4A7id259Kvg2GnHZhZi5TsO',
      'chickens1': 'https://drive.google.com/uc?export=view&id=1uT_2XE35KYPCcBxeqIhzKL5tWWwnv9u7',
    };
    return mediaMap[filenameRoot] || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23000" width="400" height="300"/%3E%3C/svg%3E';
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
          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23000" width="400" height="300"/%3E%3C/svg%3E';
        }}
      />

      <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm p-3">
        <h3 className="font-semibold text-white text-sm mb-1 line-clamp-1">{content.title}</h3>
        <p className="text-xs text-gray-300 line-clamp-2">{content.description}</p>
      </div>
    </Link>
  );
}
