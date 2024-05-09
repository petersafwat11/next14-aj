import React from "react";
import dynamic from "next/dynamic";
import Loading from "./socialShare/loading";
const SocialShare = dynamic(() => import("./socialShare/SocialShare"), {
  loading: () => <Loading />,
});

const Share = ({ shareUrl, quote }) => {
  return (
    <div>
      <SocialShare shareUrl={shareUrl} quote={quote} />
    </div>
  );
};

export default Share;
