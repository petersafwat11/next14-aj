import React, { useEffect, useState } from "react";
import classes from "./wrapper.module.css";
// import Chat from "../chat/Chat";
import Image from "next/image";
import HlcPlayer from "../../hlcPlayer/HlcPlayer";
const ExtendModeWrapper = ({
  url,
  chatMessages,
  chatRules,
  chatFilteredWords,
  setExtendMode,
}) => {
  const [showServers, setShowServers] = useState(false);
  const [inputActive, setInputActive] = useState(false);
  const [secondComponentHeight, setSecondComponentHeight] = useState("68.9%");

  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const keyboardHeight =
        windowHeight - document.documentElement.clientHeight;
      setSecondComponentHeight(`calc(68.9% - ${keyboardHeight}px)`);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
          onClick={() => {
            setExtendMode(false);
            document.body.style.overflow = "auto";
          }}
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
          <HlcPlayer notRounded={true} url={url} />
        </div>

        {/* <div className={inputActive ? classes["chat-active"] : classes["chat"]}>
          <Chat
            setInputActive={setInputActive}
            setExtendMode={setExtendMode}
            chatMessages={chatMessages}
            chatRules={chatRules}
            chatFilteredWords={chatFilteredWords}
          />
        </div> */}
      </div>
    </div>
  );
};

export default ExtendModeWrapper;
