import React from "react";

import Twetch, { TwetchProps } from "./Twetch";

export default function TwetchRenderer(props: Omit<TwetchProps, "quoted">) {
  return <Twetch {...props} />;
}
