"use client";
import Script from "next/script";

export default function Home() {
  return (
    <>
      <Script
        id="aclib"
        type="text/javascript"
        src="//acscdn.com/script/aclib.js"
        onLoad={() => {
          if (window?.aclib && window?.aclib?.runAutoTag) {
            window?.aclib?.runAutoTag({
              zoneId: "uat9x0wobi",
            });
          }
        }}
      />{" "}
    </>
  );
}
