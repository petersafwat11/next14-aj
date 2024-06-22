"use client";
import React, { useState } from "react";
import classes from "./showingChat.module.css";
import Image from "next/image";
import dynamic from "next/dynamic";
const Chat = dynamic(() => import("../chat/Chat"), {
  ssr: false,
});
const ShowingChat = ({ mode, chatRules, chatFilteredWords }) => {
  const [showChat, setShowChat] = useState(false);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div className={classes["container"]}>
      {!showChat ? (
        <Image
          onClick={toggleChat}
          className={classes["chat-icon"]}
          src="/svg/chat-floating.svg"
          alt="chat"
          width="120"
          height="120"
        />
      ) : (
        <div className={classes["chat"]}>
          <Chat
            mode={mode}
            chatRules={chatRules}
            chatFilteredWords={chatFilteredWords}
            toggleChat={toggleChat}
          />
        </div>
      )}
    </div>
  );
};

export default ShowingChat;

export const ShowingChatMobile = ({ activeExtendMode, extendMode }) => {
  return (
    <div className={classes["container-mobile"]} onClick={activeExtendMode}>
      {!extendMode && (
        <Image
          className={classes["chat-icon"]}
          src="/svg/chat-floating.svg"
          alt="chat"
          width="73"
          height="73"
        />
      )}
    </div>
  );
};
