import React from 'react';

interface MediaGridProps {
  media: { type: 'image' | 'video'; url: string }[];
  style?: React.CSSProperties;
}

export default function MediaGrid({ media, style = {} }: MediaGridProps) {
  if (!media.length) return null;

  return (
    <ul
      style={{
        // MuiGridList-root
        display: 'flex',
        padding: 0,
        flexWrap: 'wrap',
        listStyle: 'none',
        overflowY: 'auto',

        ...style,
      }}
    >
      {media.map(({ type, url }, index: number) => (
        <li
          key={index}
          style={{
            width: media.length % 2 && index === 0 ? '100%' : '50%',
            height: media.length > 1 ? 202 : undefined,
            padding: 2,

            // MuiGridListTile-root
            boxSizing: 'border-box',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              // MuiGridListTile-tile
              height: '100%',
              display: 'block',
              overflow: 'hidden',
              position: 'relative',
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
          </div>
        </li>
      ))}
    </ul>
  );
}
