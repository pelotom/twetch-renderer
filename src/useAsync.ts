import { useEffect, useState } from "react";

export default function useAsync<T>(fetcher: () => Promise<T>): T | undefined {
  const [result, setResult] = useState<T | undefined>(undefined);

  useEffect(() => {
    let alive = true;

    fetcher().then((result) => alive && setResult(result));

    return () => {
      alive = false;
    };
  }, [fetcher]);

  return result;
}
