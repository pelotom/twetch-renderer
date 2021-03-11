import clsx from 'clsx';
import React, { useCallback, useState } from 'react';
import ImageSlides from 'react-imageslides';

interface MediaGridProps {
  media: { type: 'image' | 'video'; url: string }[];
}

export default function MediaGrid({ media }: MediaGridProps) {
  const [imageSlide, setImageSlide] = useState<string | undefined>(undefined);

  const openImage = useCallback((e, url: string) => {
    e.preventDefault();
    e.stopPropagation();
    setImageSlide(url);
  }, []);

  if (!media.length) return null;

  const images = media.filter(({ type }) => type === 'image').map(({ url }) => url);

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
              <div style={{ backgroundImage: `url(${url})` }} onClick={e => openImage(e, url)} />
            ) : (
              <img src={url} onClick={e => openImage(e, url)} />
            )
          ) : type === 'video' ? (
            <video playsInline controls loop preload="metadata" src={url}></video>
          ) : null}
        </li>
      ))}

      {imageSlide && (
        <div
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            setImageSlide(undefined);
          }}
        >
          <button className="twetch-renderer__media-grid-close">
            <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
            </svg>
          </button>
          {/*
            Weird index calculation + showPageButton must be false due to bug:
            https://github.com/loadingwyn/react-imageViewer/issues/17
          */}
          <ImageSlides
            index={images.findIndex(url => url === imageSlide) + 1}
            images={images}
            isOpen
            showPageButton={false}
          />
        </div>
      )}
    </ul>
  );
}
