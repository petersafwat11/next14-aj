import Image from "next/image";
import React from "react";
import classes from "./chatTop.module.css";
const ChatTop = ({
  toggleChat,
  // contollChatRoom,  chatRoomSelection
}) => {
  return (
    <div className={classes["chat-top"]}>
      <Image
        className={classes["chat-top-extend"]}
        src="/svg/chat/extend.svg"
        alt="extend"
        width="11"
        height="11"
      />
      <div className={classes["chat-top-text"]}>
        Chat
        {/* <Image
          src="/svg/chat/down-arrow.svg"
          alt="extend"
          width="12"
          height="8"
        /> */}
        {/* <div className={classes["chat-rooms"]}>
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
        </div> */}
      </div>

      <Image
        onClick={toggleChat}
        className={classes["chat-top-exit"]}
        src="/svg/exit.svg"
        alt="exit"
        width="12"
        height="12"
      />
    </div>
  );
};

export default ChatTop;
