import React from "react";
import classes from "./videoTop.module.css";
import WatchNavigation from "../../watchNavigation/WatchNavigation";
import SocialIconsFallback from "../../whatchShare/SocialIconsFallBack";
import dynamic from "next/dynamic";
const WatchShare = dynamic(() => import("../../whatchShare/WatchShare"), {
  loading: () => <SocialIconsFallback />,
});

const VideoTop = ({ query, lang }) => {
  return (
    <div className={classes["watch-video-top"]}>
      <div className="navigation">
        <WatchNavigation page={"Sports"} />
      </div>
      <WatchShare
        reportData={{
          event: query?.secondTeamName
            ? `${query?.firstTeamName} vs ${query?.secondTeamName}`
            : query?.teamsTitle,
          server: lang,
        }}
      />
    </div>
  );
};

export default VideoTop;
