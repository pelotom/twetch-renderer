import React, { useCallback, useMemo } from 'react';
import fetchTwetchPost, { TwetchPost } from './data/fetchTwetchPost';
import LinkPreview from './LinkPreview';
import MediaGrid from './MediaGrid';
import TwitterPreview from './TwitterPreview';
import useAsync from './useAsync';
import { genericUrlRegex } from './util';
import clsx from 'clsx';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

export interface TwetchRendererProps {
  txid: string;
  isQuoted?: boolean;
}

export default function TwetchRenderer({ txid, isQuoted = false }: TwetchRendererProps) {
  const fetcher = useCallback(() => fetchTwetchPost(txid), [txid]);
  const post = useAsync(fetcher);

  return (
    <div
      className={clsx('twetch-renderer__root', isQuoted && 'twetch-renderer__root--quoted')}
      onClick={() => {
        window.location.href = `https://twetch.app/t/${txid}`;
      }}
    >
      {post ? (
        <Loaded post={post} isQuoted={isQuoted} />
      ) : (
        <div className="twetch-renderer__loading">Loading...</div>
      )}
    </div>
  );
}

interface LoadedProps {
  post: TwetchPost;
  isQuoted: boolean;
}

function Loaded({
  post: {
    createdAt,
    user,
    text,
    numLikes,
    numBranches,
    bitcoinFilesMedia,
    quotedTwetch,
    twitterData,
    files,
  },
  isQuoted,
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

  const userHref = `https://twetch.app/u/${user.id}`;

  return (
    <>
      <header className="twetch-renderer__header">
        <a href={userHref}>
          <div
            className="twetch-renderer__header--icon"
            style={{ backgroundImage: `url(${user.icon})` }}
          />
        </a>
        <div className="twetch-renderer__user">
          <a className="twetch-renderer__user-name" href={userHref}>
            {user.name}
          </a>
          <p className="twetch-renderer__user-id">@{user.id}</p>
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

        {quotedTwetch && !isQuoted && <TwetchRenderer txid={quotedTwetch} isQuoted />}

        <MediaGrid media={files} />
      </div>

      {!isQuoted && (
        <div className="twetch-renderer__stats">
          <div>
            <span>{numLikes}</span> Likes
          </div>
          <div>
            <span>{numBranches}</span> Branches
          </div>
        </div>
      )}
    </>
  );
}
