"use client";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import classes from "./watchVideoBody.module.css";
import BottomSocial from "../../bottomSocial/BottomSocial";
const HlcPlayer = dynamic(() => import("../../hlcPlayer/HlcPlayer"), {
  ssr: false,
});
import ExtendButton from "../extendButton/ExtendButton";
import ReportBtn from "../../reportBtn/ReportBtn";
import { ShowingChatMobile } from "../../showingChat/ShowingChat";
const ExtendModeWrapper = dynamic(
  () => import("../../extendMode/wrapper/Wrapper"),
  {
    ssr: false,
  }
);
import Script from "next/script";
import AdsPage from "../../ads/AdsComponent";
const PlayerContainer = dynamic(
  () => import("../../hlcPlayer/PlayerContainer"),
  {
    ssr: false,
  }
);

const WatchVideoBody = ({
  chatRules,
  chatFilteredWords,
  url,
  social,
  mode,
  reportData,
}) => {
  const videoRef = useRef(null);
  const extendVideoRef = useRef(null);

  const [extendMode, setExtendMode] = useState(false);
  const [videoCurrentState, setVideoCurrentState] = useState(false);

  const activeExtendMode = () => {
    setExtendMode(!extendMode);
    let currentState;
    videoRef?.current?.paused ? (currentState = false) : (currentState = true);
    videoRef?.current?.pause();
    setVideoCurrentState(currentState);
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
  };
  const exitExtenMode = () => {
    setExtendMode(!extendMode);
    let currentState;
    extendVideoRef?.current?.paused
      ? (currentState = false)
      : (currentState = true);
    extendVideoRef?.current?.pause();
    currentState ? videoRef?.current?.play() : videoRef?.current?.pause();
    extendVideoRef?.current?.pause();
    document.body.style.overflow = "auto";
    document.body.style.position = "";
  };
const setVideoHeight=()=>{

}
  return (
    <>
      <div className="watch-video">
        {!extendMode && (
          <div  className={classes["videojs"]}>
            <PlayerContainer  videoRef={videoRef} url={url} />{" "}
          </div>
        )}
        {/* <HlcPlayer videoRef={videoRef} url={url} /> */}
      </div>
      <div className={classes["watch-video-options"]}>
        {extendMode && (
          <ExtendModeWrapper
            dots={false}
            mode={mode}
            videoCurrentState={videoCurrentState}
            exitExtenMode={exitExtenMode}
            chatRules={chatRules}
            chatFilteredWords={chatFilteredWords}
            url={url}
            videoRef={extendVideoRef}
          />
        )}

        <div className={classes["social-desktop"]}>
          <BottomSocial social={social} />
        </div>
        <div className={classes["server-btn-wrapper"]}>
          <button className={classes["server-name-btn"]}>Full HD</button>
        </div>

        <div className={classes["modes-icons"]}>
          <ExtendButton activeExtendMode={activeExtendMode} />
          <ReportBtn reportData={reportData} />
        </div>
        <ShowingChatMobile
          extendMode={extendMode}
          activeExtendMode={activeExtendMode}
        />
      </div>
      {/* adds scripts */}
      {!extendMode && (
        <>
          <AdsPage />
          {/* <Script
            type="text/javascript"
            src="//cdn.tapioni.com/asg_embed.js"
            data-spots="451173"
            data-tag="asg"
            data-subid1="%subid1%"
            data-subid2="%subid2%"
          ></Script>

          <Script
            type="text/javascript"
            src="//cdn.tapioni.com/asg_embed.js"
            data-spots="451172"
            data-tag="asg"
            data-subid1="%subid1%"
            data-subid2="%subid2%"
          ></Script>

          <Script
            type="text/javascript"
            src="//cdn.tapioni.com/ip-push.js"
            data-spot="451174"
            data-subid1="%subid1%"
          ></Script> */}
        </>
      )}
    </>
  );
};

export default WatchVideoBody;
// import React from "react";
// import PlayerContainer from "../../hlcPlayer/PlayerContainer";
// import classes from './watchVideoBody.module.css'
// const WatchVideoBody = () => {
//   return (
//     <div className={classes['videojs']}>
//       <PlayerContainer />
//     </div>
//   );
// };

// export default WatchVideoBody;
