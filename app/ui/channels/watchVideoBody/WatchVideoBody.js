"use client";
import React, { Suspense, useState } from "react";
import classes from "./watchVideoBody.module.css";
import Image from "next/image";
// import ExtendModeWrapper from "../../extendMode/wrapper/Wrapper";
import BottomSocial from "../../bottomSocial/BottomSocial";
import HlcPlayer from "../../hlcPlayer/HlcPlayer";
import ExtendButton from "../extendButton/ExtendButton";
import ReportBtn from "../../reportBtn/ReportBtn";
import ExtendModeWrapper from "../../extendMode/wrapper/Wrapper";
const WatchVideoBody = ({
  chatMessages,
  chatRules,
  chatFilteredWords,
  playingServer,
  social
}) => {
  const [extendMode, setExtendMode] = useState(false);
  const activeExtendMode = () => {
    setExtendMode(!extendMode);
    document.body.style.overflow = "hidden";
  };
  return (
    <>
      <div className="watch-video">
        <HlcPlayer url={playingServer} />
      </div>
      <div className={classes["watch-video-options"]}>
        {extendMode && (
          <ExtendModeWrapper
            chatMessages={chatMessages}
            chatRules={chatRules}
            chatFilteredWords={chatFilteredWords}
            url={playingServer}
            setExtendMode={setExtendMode}
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
          <ReportBtn />
        </div>
      </div>
    </>
  );
};

export default WatchVideoBody;
