import BPU, { Out } from 'bpu';
import { request } from 'graphql-request';
import { bitcoinFilesUrlRegex, twetchUrlRegex } from '../util';
import twetchPostQuery from './twetchPostQuery';

export interface TwetchPost {
  createdAt: Date;
  files: Media[];
  user: {
    id: number;
    name: string;
    icon: string;
  };
  text: string;
  numLikes: number;
  numBranches: number;
  // map: Record<string, string>;
  bitcoinFilesMedia?: Media;
  quotedTwetch?: string;
  twitterData?: object;
}

export interface Media {
  type: 'image' | 'video';
  url: string;
}

export default async function fetchTwetchPost(txid: string): Promise<TwetchPost> {
  const [
    onChainData,
    {
      post: {
        createdAt,
        userByUserId: { icon, id, name },
        // bContent,
        files,
        // mapTwdata
        numLikes,
        numBranches,
        ...post
      },
    },
  ] = await Promise.all([
    fetchOnChainData(txid),
    request('https://api.twetch.app/v1/graphql', twetchPostQuery, { txid }),
  ]);

  // console.log(post)

  // console.log(onChainData)

  // const raw = bContent || "";

  // const bitcoinFilesUrlMatch = raw.match(bitcoinFilesUrlRegex);
  // const twetchUrlMatch = raw.match(twetchUrlRegex);

  // const bitcoinFilesMedia = bitcoinFilesUrlMatch
  //   ? bitcoinFilesUrlMatch[1]
  //   : undefined;
  // const quotedTwetch = twetchUrlMatch ? twetchUrlMatch[1] : undefined;

  // const text = raw
  //   .replace(bitcoinFilesUrlRegex, "")
  //   .replace(twetchUrlRegex, "")
  //   .trim();

  // console.log(files);

  return {
    ...onChainData,
    createdAt: new Date(createdAt),
    files: files
      ? await Promise.all((JSON.parse(files) as string[]).map(fetchBitcoinFileMedia))
      : [],
    user: {
      id: Number(id),
      name,
      icon,
    },
    numLikes: Number(numLikes),
    numBranches: Number(numBranches),
    // text,
    // bitcoinFilesMedia,
    // quotedTwetch,
    // twitterData: mapTwdata && JSON.parse(mapTwdata)
  };
}

async function fetchOnChainData(txid: string) {
  const response = await fetch(`https://media.bitcoinfiles.org/tx/${txid}`);
  if (!response.ok) throw response;

  const { out } = await BPU.parse({
    tx: { r: await response.json() },
    split: [{ token: { s: '|' } }],
  });

  const twetchOut = out.find(output => output.tape[0].cell[0].op === 0)!;

  const twetchOutput = await parseTwetchOutput(txid, twetchOut);
  if (!twetchOutput) throw Error(`${txid}: unrecognized Twetch post type`);

  let { raw, twitterData, bitcoinFilesMedia } = twetchOutput;

  const bitcoinFilesUrlMatch = raw.match(bitcoinFilesUrlRegex);
  const twetchUrlMatch = raw.match(twetchUrlRegex);

  bitcoinFilesMedia =
    bitcoinFilesMedia ||
    (bitcoinFilesUrlMatch ? await fetchBitcoinFileMedia(bitcoinFilesUrlMatch[1]) : undefined);

  const quotedTwetch = twetchUrlMatch ? twetchUrlMatch[1] : undefined;

  const text = raw.replace(bitcoinFilesUrlRegex, '').replace(twetchUrlRegex, '').trim();

  return {
    text,
    bitcoinFilesMedia,
    quotedTwetch,
    twitterData,
  };
}

async function parseTwetchOutput(
  txid: string,
  { e, tape }: Out,
): Promise<{
  raw: string;
  twitterData?: any;
  bitcoinFilesMedia?: Media;
} | null> {
  // if (!(e.a === "false" && tape.length === 3)) return null;

  const [{ cell: bCells }] = tape;

  if (
    !(
      bCells[0].op === 0 &&
      bCells[1].ops === 'OP_RETURN' &&
      bCells[2].s === '19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut'
    )
  )
    return null;

  const type = bCells[4].s;

  if (type === 'text/plain') {
    let raw = bCells[3].s;

    if (!raw) return null;

    const { cell: mapCells } = tape[1];

    if (!(mapCells[0].s === '1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5' && mapCells[1].s === 'SET'))
      return null;

    const keyValArray = mapCells.slice(2).map(cell => cell.s!);
    const map: Record<string, string> = {};
    for (let i = 0; i < keyValArray.length; i += 2) {
      map[keyValArray[i]] = keyValArray[i + 1];
    }

    return {
      raw,
      twitterData: map.twdata_json && JSON.parse(map.twdata_json),
    };
  } else if (type?.startsWith('image/')) {
    return {
      raw: '',
      bitcoinFilesMedia: {
        type: 'image',
        url: `https://media.bitcoinfiles.org/${txid}`,
      },
    };
  } else if (type?.startsWith('video/')) {
    return {
      raw: '',
      bitcoinFilesMedia: {
        type: 'video',
        url: `https://media.bitcoinfiles.org/${txid}`,
      },
    };
  }

  return null;
}

async function fetchBitcoinFileMedia(txid: string): Promise<Media> {
  const { bitcoinFilesMedia } = await fetchOnChainData(txid);
  if (!bitcoinFilesMedia) throw Error(`txid ${txid} does not represent media`);
  return bitcoinFilesMedia;
}
