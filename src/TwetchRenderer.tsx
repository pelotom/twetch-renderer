import React, { useCallback, useMemo } from 'react';
import fetchTwetchPost, { TwetchPost } from './data/fetchTwetchPost';
import LinkPreview from './LinkPreview';
import MediaGrid from './MediaGrid';
import TwitterPreview from './TwitterPreview';
import useAsync from './useAsync';
import { genericUrlRegex } from './util';

// import "./Twetch.css";

export interface TwetchRendererProps {
  txid: string;
  quoted?: boolean;
}

export default function TwetchRenderer({ txid, quoted = false }: TwetchRendererProps) {
  const fetcher = useCallback(() => fetchTwetchPost(txid), [txid]);
  const post = useAsync(fetcher);

  return (
    <div className={`twetch-renderer__root${quoted ? ' twetch-renderer__root--quoted' : ''}`}>
      {post ? (
        <Loaded post={post} quoted={quoted} />
      ) : (
        <div className="twetch-renderer__loading">Loading...</div>
      )}
    </div>
  );
}

interface LoadedProps {
  post: TwetchPost;
  quoted: boolean;
}

function Loaded({
  post: { createdAt, user, text, bitcoinFilesMedia, quotedTwetch, twitterData, files },
  quoted,
}: LoadedProps) {
  const richText = useMemo(
    () =>
      text.split(genericUrlRegex).map((segment, index) =>
        genericUrlRegex.test(segment) ? (
          <a key={index} href={segment}>
            {segment}
          </a>
        ) : (
          segment
        ),
      ),
    [],
  );

  return (
    <>
      <header className="twetch-renderer__header">
        <a className="twetch-renderer__header--icon" href={`https://twetch.app/u/${user.id}`}>
          <img src={user.icon} />
        </a>
        <div className="twetch-renderer__user">
          <a href={`/u/${user.id}`}>{user.name}</a>
          <p>@{user.id}</p>
        </div>
        <div className="twetch-renderer__timestamp">
          <p>{createdAt.toLocaleDateString()}</p>
        </div>
      </header>

      <div className="twetch-renderer__body">
        {richText && <p>{richText}</p>}

        <LinkPreview text={text} />

        {bitcoinFilesMedia && <MediaGrid media={[bitcoinFilesMedia]} />}

        {!files.length /* <-- doesn't really make sense to me but appears to be Twetch's behavior */ && (
          <TwitterPreview twitterData={twitterData} />
        )}

        {quotedTwetch && !quoted && <TwetchRenderer txid={quotedTwetch} quoted />}

        <MediaGrid media={files} />
      </div>
    </>
  );
}
