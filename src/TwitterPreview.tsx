/* eslint-disable jsx-a11y/alt-text */

import MediaGrid from "./MediaGrid";

interface TwitterPreviewProps {
  twitterData?: any;
}

export default function TwitterPreview({ twitterData }: TwitterPreviewProps) {
  if (!twitterData) return null;

  const { text, media, user } = twitterData;

  return (
    <div
      style={{
        // jss7227
        // width: "100%",
        cursor: "pointer",
        display: "block",
        padding: "8px 12px",
        position: "relative",
        background: "#022640",
        borderRadius: 6,
        textDecoration: "none",

        // jss7222
        marginTop: 8
      }}
    >
      <div
        style={{
          // jss7228
          width: "calc(100% + 24px)",
          margin: "-9px 0 12px -12px",
          borderRadius: "6px 6px 0 0"
        }}
      >
        <MediaGrid
          media={media.map((url: string) => ({ type: "image", url }))}
          style={{ margin: -1 }}
        />
      </div>
      <p
        style={{
          // MuiTypography-root
          margin: 0,

          // jss7231
          color: "#F2F2F2",
          fontSize: 16,
          lineHeight: "21px",
          whiteSpace: "pre-line",
          textDecoration: "none",

          // MuiTypography-body1
          // fontSize: '1rem',
          fontFamily: "proxima-nova, Helvetica",
          fontWeight: 400
          // lineHeight: 1.5,
        }}
      >
        {text}
      </p>
      <div
        style={{
          // jss7232
          display: "flex",
          marginTop: 10
        }}
      >
        <img
          style={{
            // jss7233
            width: 30,
            height: 30,
            marginRight: 12,
            borderRadius: "100%"
          }}
          src={user.profile_image_url}
        />
        <div
          style={{
            // jss7234
            display: "flex",
            flexDirection: "column"
          }}
        >
          <p
            style={{
              // MuiTypography-body1
              // fontSize: '1rem',
              fontFamily: "proxima-nova, Helvetica",
              // fontWeight: 400,
              // lineHeight: 1.5,

              // jss7235
              color: "#F2F2F2",
              fontSize: 12,
              wordBreak: "break-word",
              fontWeight: "bold",
              lineHeight: "15px",
              textDecoration: "none",

              // MuiTypography-root
              margin: 0
            }}
          >
            {user.name}
            <span style={{ fontWeight: "normal", marginLeft: 6 }}>
              @{user.screen_name}
            </span>
          </p>
          <p
            style={{
              // MuiTypography-body1
              // fontSize: '1rem',
              fontFamily: "proxima-nova, Helvetica",
              // fontWeight: 400,
              // lineHeight: 1.5,

              // jss7235
              color: "#F2F2F2",
              fontSize: 12,
              lineHeight: "15px",
              textDecoration: "none",

              // MuiTypography-root
              margin: 0
            }}
          >
            twitter.com
          </p>
        </div>
        <div
          style={{
            // jss7237
            flexGrow: 1
          }}
        ></div>
      </div>
    </div>
  );
}
