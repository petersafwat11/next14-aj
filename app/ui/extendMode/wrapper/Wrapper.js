import React, { useEffect, useState } from "react";
import classes from "./wrapper.module.css";
// import Chat from "../chat/Chat";
import Image from "next/image";
import Chat from "../chat/Chat";
import HlcPlayer from "../../hlcPlayer/HlcPlayer";

const ExtendModeWrapper = ({
  exitExtenMode,
  videoRef,
  url,
  chatMessages,
  chatRules,
  chatFilteredWords,
  videoCurrentState,
}) => {
  const [showServers, setShowServers] = useState(false);
  const [inputActive, setInputActive] = useState(false);

  useEffect(() => {
    videoCurrentState ? videoRef.current.play() : videoRef.current.pause();
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

        <Image
          onClick={exitExtenMode}
          className={classes["extend-exit"]}
          src="/svg/chat/extend-mode/close.svg"
          alt="exit"
          width="15"
          height="15"
        />
      </div>
      <div className={classes["body"]}>
        <div
          className={
            inputActive ? classes["video-chat-active"] : classes["video"]
          }
        >
          {showServers ? (
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
          <HlcPlayer videoRef={videoRef} notRounded={true} url={url} />
        </div>

        <div className={inputActive ? classes["chat-active"] : classes["chat"]}>
          <Chat
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
