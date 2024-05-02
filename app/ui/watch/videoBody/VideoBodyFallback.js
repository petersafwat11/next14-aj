import React from "react";
import BottomSocialFallback from "../../bottomSocial/BottomSocialFallback";
import ExtendButtonFallback from "../extendButton/ExtendButtonFallback";
import ReportBtn from "../../reportBtn/ReportBtn";
import classes from "./watchVideoBody.module.css";
const VideoBodyFallback = () => {
  return (
    <>
      <div className="watch-video">
        {/* <HlcPlayer url={playingServer} /> */}
      </div>
      <div className={classes["watch-video-options"]}>
        <div className={classes["social-desktop"]}>
          <BottomSocialFallback />
        </div>
        <div className={classes["server-btn-wrapper"]}>
          <button className={classes["server-name-btn"]}>Full HD</button>
        </div>

        <div className={classes["modes-icons"]}>
          {/* <ExtendButtonFallback /> */}
          <ReportBtn />
        </div>
      </div>
    </>
  );
};

export default VideoBodyFallback;
