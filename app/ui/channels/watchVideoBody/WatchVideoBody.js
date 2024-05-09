"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import classes from "./watchVideoBody.module.css";
import BottomSocial from "../../bottomSocial/BottomSocial";
const HlcPlayer = dynamic(() => import("../../hlcPlayer/HlcPlayer"), {
  ssr: false,
});
import ExtendButton from "../extendButton/ExtendButton";
import ReportBtn from "../../reportBtn/ReportBtn";
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
