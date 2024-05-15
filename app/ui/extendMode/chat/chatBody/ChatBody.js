import Image from "next/image";
import React from "react";
import classes from "./chatBody.module.css";
const ChatBody = ({
  messages,
  setMentionSomeone,
  username,
  messagesRef,
  lastMessage,
}) => {
  return (
    <div className={classes["chat-body"]}>
      <div ref={messagesRef} className={classes["messages"]}>
        {messages.map((message, index) => (
          <div ref={lastMessage} key={index} className={classes["message"]}>
            <div className={classes["user-image"]}>
              <Image
                // onClick={() => {
                //   console.log("usernames", message?.username, username);
                // }}
                className={classes["user-icon"]}
                src={
                  message.image.startsWith("user")
                    ? `${process.env.BACKEND_SERVER}/img/users/${message.image}`
                    : message.image
                }
                alt="avatar"
                width="26"
                height="26"
              />
              {message.username === username &&
                message.username !== "anonymous" && (
                  <p className={classes["you-text"]}>You</p>
                )}
            </div>
            <div className={classes["message-data"]}>
              {(message.username !== username ||
                message.username === "anonymous") && (
                <span
                  style={{ color: message.color }}
                  className={classes["username"]}
                >
                  {message.username}
                </span>
              )}

              {message.message.startsWith("@") && (
                <div className={classes["mentioned"]}>
                  {message.message.match(/@[^\s]+/g).map((tag, index) => (
                    <span style={{ color: message.color }} key={index}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {message.message.includes("media.tenor.com") && (
                <Image
                  unoptimized
                  src={message.message}
                  width={"50"}
                  height={"50"}
                  alt="gif"
                />
              )}

              {message.message.includes("media.tenor.com")
                ? ""
                : message.message.startsWith("@")
                ? message.message
                    .slice(
                      message.message.match(/@[^ ]+/).index +
                        message.message.match(/@[^ ]+/)[0].length
                    )
                    .trim()
                : message.message}
            </div>
            {message.username !== username && (
              <div
                onClick={() => {
                  setMentionSomeone(message.username);
                }}
                className={classes["replay-wrapper"]}
              >
                <div className={classes["replay-icon-div"]}>
                  <Image
                    className={classes["replay-icon"]}
                    src="/svg/chat/replay.svg"
                    alt="replay"
                    width="12"
                    height="12"
                  />
                </div>

                <span className={classes["tooltip"]}>Reply to user</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatBody;
