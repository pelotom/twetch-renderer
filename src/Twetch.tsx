import React, { useCallback } from 'react';
import fetchTwetchPost from './data/fetchTwetchPost';
import LinkPreview from './LinkPreview';
import TwitterPreview from './TwitterPreview';
import MediaGrid from './MediaGrid';
import useAsync from './useAsync';
import { genericUrlRegex } from './util';

// import "./Twetch.css";

export interface TwetchProps {
  txid: string;
  quoted?: boolean;
}

export default function Twetch({ txid, quoted }: TwetchProps) {
  const fetcher = useCallback(() => fetchTwetchPost(txid), [txid]);
  const post = useAsync(fetcher);

  if (!post) return <span>Loading...</span>;

  const { createdAt, user, text, bitcoinFilesMedia, quotedTwetch, twitterData, files } = post;

  const richText = text.split(genericUrlRegex).map((segment, index) =>
    genericUrlRegex.test(segment) ? (
      <a key={index} href={segment}>
        {segment}
      </a>
    ) : (
      segment
    ),
  );

  return (
    <div className={`Twetch${quoted ? ' Twetch__Quoted' : ''}`}>
      <div className="Twetch__Header">
        <a href={`/u/${user.id}`}>
          <div
            style={{
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
              backgroundImage: `url(${user.icon})`,
            }}
          ></div>
        </a>
        <div className="Twetch__User">
          <a href={`/u/${user.id}`}>{user.name}</a>
          <p>@{user.id}</p>
        </div>
        <div className="Twetch__Timestamp">
          <p>{createdAt.toLocaleDateString()}</p>
        </div>
      </div>

      <div className="Twetch__Body">
        {richText && <p>{richText}</p>}

        <LinkPreview text={text} />

        {bitcoinFilesMedia && <MediaGrid media={[bitcoinFilesMedia]} />}

        {!files.length /* <-- doesn't really make sense to me but appears to be Twetch's behavior */ && (
          <TwitterPreview twitterData={twitterData} />
        )}

        {quotedTwetch && !quoted && <Twetch txid={quotedTwetch} quoted />}

        <MediaGrid media={files} />
      </div>
    </div>
  );
}
