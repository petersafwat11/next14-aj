"use client";
import React from "react";
import Image from "next/image";
import BottomSocial from "../../bottomSocial/BottomSocial";
import classes from "./videoOptions.module.css";
import ExtendModeWrapper from "../../extendMode/wrapper/Wrapper";
const VideoOptions = ({
  chatMessages,
  chatRules,
  chatFilteredWords,
  playingServer,
  social,
}) => {
  const [extendMode, setExtendMode] = useState(false);

  return (
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
        <div className={classes["icon-div"]}>
          <Image
            className={classes["threat-mode-icon"]}
            src="/svg/watch/threat-mode.svg"
            alt="threat-mode"
            height={18}
            width={18}
          />
        </div>
        <div
          onClick={() => {
            setExtendMode(!extendMode);
            document.body.style.overflow = "hidden";
          }}
          className={classes["icon-div"]}
        >
          <Image
            className={classes["threat-mode-icon"]}
            src="/svg/watch/extend.svg"
            alt="extend-mode"
            height={15}
            width={15}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoOptions;
