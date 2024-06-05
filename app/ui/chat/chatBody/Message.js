import Image from "next/image";
import React, { memo } from "react";
import classes from "./chatBody.module.css";
const Message = memo(function Message({
  message,
  setMentionSomeone,
  username,
  censorWords
}) {
  return (
    <div
      style={{
        background:
          message.username === "AJ Sports Moderator"
            ? "#e98c00"
            : message.username === username && message.username !== "anonymous"
            ? "#1C2730"
            : "",
      }}
      key={message?._id}
      className={classes["message"]}
    >
      <div className={classes["user-image"]}>
        <Image
          className={classes["user-icon"]}
          style={{
            borderRadius: message?.image?.startsWith("user") ? "50%" : "",
          }}
          src={
            message?.image?.startsWith("user")
              ? `${process.env.BACKEND_SERVER}/img/users/${message?.image}`
              : message?.image
          }
          alt="avatar"
          width="18"
          height="18"
        />
        {message.username === username && message.username !== "anonymous" && (
          <p className={classes["you-text"]}>You</p>
        )}
      </div>
      <div
        // style={{
        //   alignItems: message.message.includes("media.tenor.com")
        //     ? "center"
        //     : "",
        // }}
        className={classes["message-data"]}
      >
        {(message.username !== username ||
          message.username === "anonymous") && (
          <span
            style={{ color: message.color }}
            className={classes["username"]}
          >
            {message.username}
          </span>
        )}

        {message?.message?.startsWith("@") && (
          <div className={classes["mentioned"]}>
            {message.message.match(/@[^\s]+/g).map((tag, index) => (
              <span style={{ color: message.color }} key={index}>
                {tag}
              </span>
            ))}
          </div>
        )}
        {message?.message?.includes("media.tenor.com") && (
          <Image
            unoptimized
            src={message.message}
            width={"80"}
            height={"80"}
            alt="gif"
          />
        )}

        {message?.message?.includes("media.tenor.com")
          ? ""
          : message?.message?.startsWith("@")
          ? message?.message
              .slice(
                message.message.match(/@[^ ]+/).index +
                  message.message.match(/@[^ ]+/)[0].length
              )
              .trim()
          : censorWords(message.message)}
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
              width="10"
              height="10"
            />
          </div>

          <span className={classes["tooltip"]}>Reply to user</span>
        </div>
      )}
    </div>
  );
});

export default Message;
