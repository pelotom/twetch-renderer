import clsx from 'clsx';
import React from 'react';

interface MediaGridProps {
  media: { type: 'image' | 'video'; url: string }[];
}

export default function MediaGrid({ media }: MediaGridProps) {
  if (!media.length) return null;

  return (
    <ul
      className={clsx(
        'twetch-renderer__media-grid',
        media.length > 1 && 'twetch-renderer__media-grid--multi',
      )}
    >
      {media.map(({ type, url }, index: number) => (
        <li
          key={index}
          className="twetch-renderer__media-grid-item"
          style={{
            width: media.length % 2 && index === 0 ? '100%' : '50%',
          }}
        >
          {type === 'image' ? (
            media.length > 1 ? (
              <div
                style={{
                  backgroundImage: `url(${url})`,
                  borderRadius: index < 2 - (media.length % 2) ? '6px 6px 0px 0px' : undefined,

                  // jss7229
                  width: '100%',
                  height: '100%',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }}
              ></div>
            ) : (
              <img
                className="jss2143"
                style={{
                  borderRadius: index < 2 ? '6px 6px 0px 0px' : undefined,

                  // jss7229
                  width: '100%',
                  height: '100%',
                }}
                src={url}
              />
            )
          ) : type === 'video' ? (
            <video
              playsInline
              controls
              loop
              style={{
                // jss321
                width: '100%',
                height: '100%',
                margin: '0 auto',

                // jss416
                display: 'block',
                borderRadius: 6,
              }}
              preload="metadata"
              src={url}
            ></video>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
