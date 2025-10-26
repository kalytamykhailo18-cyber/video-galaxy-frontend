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

  const getMediaUrl = (filenameRoot) => {
    const mediaMap = {
      'birds4': 'https://drive.google.com/uc?export=view&id=1gN-R2t4VPWI00lsfWRXPMegUrTvZZz8B',
      'birds6': 'https://drive.google.com/uc?export=view&id=1HjVMXHVPO9cGGt9wz8QV5SJjnvdMKKc3',
      'birds7': 'https://drive.google.com/uc?export=view&id=1I_K-PDHeSfOrwMxN3FJW3dWY0prwvTBk',
      'cats2': 'https://drive.google.com/uc?export=view&id=1gjZMXxnOQxY2aDcSbKGBrT1nVICFsFbC',
      'Maestro': 'https://drive.google.com/uc?export=view&id=1PGVGfW0Mb4A7id259Kvg2GnHZhZi5TsO',
      'chickens1': 'https://drive.google.com/uc?export=view&id=1uT_2XE35KYPCcBxeqIhzKL5tWWwnv9u7',
    };
    return mediaMap[filenameRoot] || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23000" width="800" height="600"/%3E%3C/svg%3E';
  };

  const mediaUrl = useMemo(() => getMediaUrl(content.filenameRoot), [content.filenameRoot]);
  const aspectClass = getAspectClass(content.ratio);

  return (
    <div className={`w-full max-w-4xl mx-auto bg-black ${aspectClass}`}>
      {content.type === 'video' ? (
        <video
          controls
          className="w-full h-full"
          poster={getMediaUrl(content.filenameRoot)}
        >
          <source src={mediaUrl} type="video/mp4" />
          Your browser does not support video playback.
        </video>
      ) : (
        <img
          src={mediaUrl}
          alt={content.imgAltTxt || content.title}
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23000" width="800" height="600"/%3E%3C/svg%3E';
          }}
        />
      )}
    </div>
  );
}
