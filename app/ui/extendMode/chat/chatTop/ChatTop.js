import Image from "next/image";
import React from "react";
import classes from "./chatTop.module.css";
const ChatTop = ({ contollChatRoom, chatRoomSelection, exitExtenMode }) => {
  return (
    <div className={classes["chat-top"]}>
      {/* <Image
        className={classes["chat-top-extend"]}
        src="/svg/chat/extend.svg"
        alt="extend"
        width="13"
        height="13"
      /> */}
      <div className={classes["chat-top-text"]}>
        Chat
        {/* <Image
          src="/svg/chat/down-arrow.svg"
          alt="extend"
          width="14"
          height="10"
        /> */}
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
                  background: chatRoomSelection === i ? "#0085AA" : "inherit",
                }}
              >
                {i}
              </p>
            )
          )}
        </div>
      </div>
      <svg
        onClick={exitExtenMode}
        className={classes["chat-top-exit"]}
        width="23"
        height="23"
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

      {/* <Image
        onClick={exitExtenMode}
        className={classes["chat-top-exit"]}
        src="/svg/chat/extend-mode/close.svg"
        alt="exit"
        width="15"
        height="15"
      /> */}
    </div>
  );
};

export default ChatTop;
