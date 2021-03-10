import React from 'react';
import MediaGrid from './MediaGrid';

interface TwitterPreviewProps {
  twitterData?: any;
}

export default function TwitterPreview({ twitterData }: TwitterPreviewProps) {
  if (!twitterData) return null;

  const { text, media, user } = twitterData;

  return (
    <div className="twetch-renderer__twitter-preview">
      <div className="twetch-renderer__twitter-preview-media">
        <MediaGrid media={media.map((url: string) => ({ type: 'image', url }))} />
      </div>
      <p className="twetch-renderer__twitter-preview-text">{text}</p>
      <header>
        <img src={user.profile_image_url} />
        <div>
          <p className="twetch-renderer__twitter-preview-username">
            {user.name}
            <span className="twetch-renderer__twitter-preview-handle">@{user.screen_name}</span>
          </p>
          <p>twitter.com</p>
        </div>
      </header>
    </div>
  );
}
