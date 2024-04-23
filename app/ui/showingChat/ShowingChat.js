"use client";
import React, { useState } from "react";
import classes from "./showingChat.module.css";
import Image from "next/image";
import Chat from "../chat/Chat";
// import Chat from "../chat/Chat";
const ShowingChat = ({ mode, chatMessages, chatRules, chatFilteredWords }) => {
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
            chatMessages={chatMessages}
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
