"use client";
import React, { useEffect, useState } from "react";
import classes from "./watchVideoBody.module.css";
import BottomSocial from "../../bottomSocial/BottomSocial";
import HlcPlayer from "../../hlcPlayer/HlcPlayer";
import ExtendButton from "../extendButton/ExtendButton";
import ReportBtn from "../../reportBtn/ReportBtn";
import ExtendModeWrapper from "../../extendMode/wrapper/Wrapper";
const WatchVideoBody = ({
  chatMessages,
  chatRules,
  chatFilteredWords,
  url,
  social,
}) => {
  const [extendMode, setExtendMode] = useState(false);
  const activeExtendMode = () => {
    setExtendMode(!extendMode);
    document.body.style.overflow = "hidden";
  };
  return (
    <>
      <div className="watch-video">
        <HlcPlayer url={url} />
      </div>
      <div className={classes["watch-video-options"]}>
        {extendMode && (
          <ExtendModeWrapper
            chatMessages={chatMessages}
            chatRules={chatRules}
            chatFilteredWords={chatFilteredWords}
            url={url}
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
