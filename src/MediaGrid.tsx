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
        media.length % 2 === 1 && 'twetch-renderer__media-grid--odd',
      )}
    >
      {media.map(({ type, url }, index: number) => (
        <li key={index} className="twetch-renderer__media-grid-item">
          {type === 'image' ? (
            media.length > 1 ? (
              <div style={{ backgroundImage: `url(${url})` }} />
            ) : (
              <img className="jss2143" src={url} />
            )
          ) : type === 'video' ? (
            <video playsInline controls loop preload="metadata" src={url}></video>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
