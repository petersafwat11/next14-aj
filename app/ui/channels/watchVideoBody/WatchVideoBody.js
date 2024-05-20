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
const WatchVideoBody = ({
  chatMessages,
  chatRules,
  chatFilteredWords,
  url,
  social,
  mode,
  reportData
}) => {
  const videoRef = useRef(null);
  const extendVideoRef = useRef(null);

  const [extendMode, setExtendMode] = useState(false);
  const [videoCurrentState, setVideoCurrentState] = useState(false);

  const activeExtendMode = () => {
    setExtendMode(!extendMode);
    let currentState;
    videoRef?.current?.paused ? (currentState = false) : (currentState = true);
    videoRef.current.pause();
    setVideoCurrentState(currentState);

    // currentState
    //   ? extendVideoRef.current.play()
    //   : extendVideoRef.current.pause();
    document.body.style.overflow = "hidden";
  };
  const exitExtenMode = () => {
    setExtendMode(!extendMode);
    let currentState;
    extendVideoRef.current.paused
      ? (currentState = false)
      : (currentState = true);
    extendVideoRef.current.pause();
    currentState ? videoRef.current.play() : videoRef.current.pause();
    extendVideoRef.current.pause();
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <div className="watch-video">
        <HlcPlayer videoRef={videoRef} url={url} />
      </div>
      <div className={classes["watch-video-options"]}>
        {extendMode && (
          <ExtendModeWrapper
            mode={mode}
            videoCurrentState={videoCurrentState}
            exitExtenMode={exitExtenMode}
            chatMessages={chatMessages}
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
    </>
  );
};

export default WatchVideoBody;
