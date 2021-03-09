import React from "react";

const youtubeRegex1 = /https:\/\/www\.youtube\.com\/watch?.*v=([_a-zA-Z0-9]+).*/i;
const youtubeRegex2 = /https:\/\/youtu.be\/([_a-zA-Z0-9]+)/i;

interface YouTubeProps {
  videoId: string;
}

function YouTube({ videoId }: YouTubeProps) {
  return (
    <iframe
      className="jss960"
      frameBorder="0"
      allowFullScreen
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      title="YouTube video player"
      width="566"
      height="318.375"
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&amp;enablejsapi=1&amp;origin=https%3A%2F%2Ftwetch.app&amp;widgetid=1`}
    ></iframe>
  );
}

export default function renderYouTube(text: string) {
  let match = text.match(youtubeRegex1) || text.match(youtubeRegex2);
  if (!match) return null;

  return <YouTube videoId={match[1]} />;
}
