import Image from "next/image";
import React from "react";
import classes from "./chatTop.module.css";
const ChatTop = ({ contollChatRoom, toggleChat, chatRoomSelection }) => {
  return (
    <div className={classes["chat-top"]}>
      <Image
        className={classes["chat-top-extend"]}
        src="/svg/chat/extend.svg"
        alt="extend"
        width="13"
        height="13"
      />
      <div className={classes["chat-top-text"]}>
        Chat
        <Image
          src="/svg/chat/down-arrow.svg"
          alt="extend"
          width="14"
          height="10"
        />
        <div className={classes["chat-rooms"]}>
          {["English (Default)", "Espain", "العربية", "Français"].map(
            (i, index) => (
              <p
                onClick={() => {
                  contollChatRoom(i);
                }}
                key={index}
                className={classes[i == "العربية" ? "arabic" : "chat-room"]}
                style={{
                  background: chatRoomSelection === i ? "#03A1CD" : "inherit",
                }}
              >
                {i}
              </p>
            )
          )}
        </div>
      </div>

      <Image
        onClick={toggleChat}
        className={classes["chat-top-exit"]}
        src="/svg/chat/exit-chat.svg"
        alt="exit"
        width="15"
        height="15"
      />
    </div>
  );
};

export default ChatTop;
