import { useMemo } from 'react';

export default function VideoPlayer({ content }) {
  const getAspectClass = (ratio) => {
    const map = {
      '16:9': 'aspect-video',
      '9:16': 'aspect-[9/16]',
      '4:3': 'aspect-[4/3]',
      '3:4': 'aspect-[3/4]',
      '3:2': 'aspect-[3/2]',
      '2:3': 'aspect-[2/3]',
      '1:1': 'aspect-square',
    };
    return map[ratio] || 'aspect-video';
  };

  const getMediaUrl = (filenameRoot, isVideo = false) => {
    if (!filenameRoot) return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23000" width="800" height="600"/%3E%3C/svg%3E';

    if (isVideo) {
      return `/videos/${filenameRoot}-preview.mp4`;
    }

    // Always use -a variant to avoid 404 errors since not all variants exist
    return `/images/${filenameRoot}-a.jpg`;
  };

  const videoUrl = useMemo(() => getMediaUrl(content.filenameRoot, true), [content.filenameRoot]);
  const posterUrl = useMemo(() => getMediaUrl(content.filenameRoot, false), [content.filenameRoot]);
  const aspectClass = getAspectClass(content.aspectRatio || content.ratio);

  return (
    <div className={`w-full max-w-4xl mx-auto bg-black ${aspectClass}`}>
      {content.type === 'video' ? (
        <video
          controls
          className="w-full h-full"
          poster={posterUrl}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support video playback.
        </video>
      ) : (
        <img
          src={posterUrl}
          alt={content.imgAltTxt || content.title}
          className="w-full h-full object-contain"
          onError={(e) => {
            // Fallback to -a variant if random variant doesn't exist
            if (!e.target.src.includes('-a.jpg') && content.filenameRoot) {
              e.target.src = `/images/${content.filenameRoot}-a.jpg`;
            } else {
              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23000" width="800" height="600"/%3E%3C/svg%3E';
            }
          }}
        />
      )}
    </div>
  );
}
