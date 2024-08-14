import React, { useEffect, useState } from "react";
import classes from "./wrapper.module.css";
// import Chat from "../chat/Chat";
import Image from "next/image";
import Chat from "../chat/Chat";
import PlayerContainer from "../../hlcPlayer/PlayerContainer";

const ExtendModeWrapper = ({
  dots,
  exitExtenMode,
  videoRef,
  url,
  chatMessages,
  chatRules,
  chatFilteredWords,
  videoCurrentState,
  mode,
}) => {
  const [showServers, setShowServers] = useState(false);
  const [inputActive, setInputActive] = useState(false);

  useEffect(() => {
    videoCurrentState ? videoRef?.current?.play() : videoRef?.current?.pause();
  }, [videoCurrentState, videoRef]);

  return (
    <div className={classes["container"]}>
      <div className={classes["top"]}>
        <Image
          className={classes["logo"]}
          src="/svg/chat/extend-mode/logo.svg"
          alt="logo"
          width="43"
          height="34"
        />

        {/* <Image
          onClick={exitExtenMode}
          className={classes["extend-exit"]}
          src="/svg/chat/extend-mode/close.svg"
          alt="exit"
          width="15"
          height="15"
        /> */}
        <svg
          onClick={exitExtenMode}
          className={classes["extend-exit"]}
          width="15"
          height="15"
          viewBox="0 0 15 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="close" clip-path="url(#clip0_2_41798)">
            <path
              id="Vector"
              d="M15 2.14659L13.4893 0.700439L7.5 6.43377L1.51071 0.700439L0 2.14659L5.98929 7.87993L0 13.6133L1.51071 15.0594L7.5 9.32608L13.4893 15.0594L15 13.6133L9.01071 7.87993L15 2.14659Z"
              fill="#DDDDDD"
              fill-opacity="0.5"
            />
          </g>
          <defs>
            <clipPath id="clip0_2_41798">
              <rect
                width="15"
                height="15"
                fill="white"
                transform="translate(0 0.1875)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className={classes["body"]}>
        <div
          className={
            inputActive ? classes["video-chat-active"] : classes["video"]
          }
        >
          {dots === false ? (
            ""
          ) : showServers ? (
            <Image
              onClick={() => {
                setShowServers(!showServers);
              }}
              className={classes["close-menu"]}
              src="/svg/chat/extend-mode/close.svg"
              alt="exit"
              width="15"
              height="15"
            />
          ) : (
            <Image
              onClick={() => {
                setShowServers(!showServers);
              }}
              className={classes["open-menu"]}
              src="/svg/chat/extend-mode/menu-icon.svg"
              alt="exit"
              width="19"
              height="14"
            />
          )}
          {showServers && (
            <div className={classes["servers"]}>
              {["ENGLISH", "العربية", "ESPAÑOL", "DUTCH"].map(
                (server, index) => (
                  <p
                    onClick={() => {
                      setShowServers(!showServers);
                    }}
                    className={classes["server"]}
                    key={index}
                  >
                    {server}
                  </p>
                )
              )}
            </div>
          )}
          <div className={classes["videojs"]}>
            <PlayerContainer videoRef={videoRef} url={url} />{" "}
          </div>
          {/* <HlcPlayer videoRef={videoRef} notRounded={true} url={url} /> */}
        </div>

        <div className={inputActive ? classes["chat-active"] : classes["chat"]}>
          <Chat
            mode={mode}
            setInputActive={setInputActive}
            exitExtenMode={exitExtenMode}
            chatMessages={chatMessages}
            chatRules={chatRules}
            chatFilteredWords={chatFilteredWords}
          />
        </div>
      </div>
    </div>
  );
};

export default ExtendModeWrapper;
