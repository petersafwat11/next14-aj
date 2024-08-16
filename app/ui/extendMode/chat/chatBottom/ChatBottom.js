import React, { useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { MdEmojiEmotions } from "react-icons/md";
import TagUsers from "../tagUsers/TagUsers";
import classes from "./chatBottom.module.css";
const ChatBottom = ({
  toggleUserInf,
  displayEmojisAndGifs,
  message,
  setInputMessage,
  setMentionSomeone,
  handleClick,
  isSending,
  inputRef,
  setInputActive,
  chatMode,
  slowModeRemainingSec,
  disableChat,
}) => {
  // const [showTagUsers, setShowTagUsers] = useState(false);

  // const toggleTagUsers = () => {
  //   setShowTagUsers(!showTagUsers);
  // };
  return (
    <div id="chat-bottom" className={classes["chat-bottom"]}>
      {/* {showTagUsers && (
        <TagUsers
          setMentionSomeone={setMentionSomeone}
          toggleTagUsers={toggleTagUsers}
        />
      )} */}
      <div className={classes["icons"]}>
        <div className={classes["user-dev"]}>
          <FaUser onClick={toggleUserInf} className={classes["user-icon"]} />
        </div>
        <div id="emojy-dev" className={classes["emojy-dev"]}>
          <MdEmojiEmotions
            onClick={displayEmojisAndGifs}
            className={classes["emojy"]}
          />
        </div>
      </div>

      <textarea
        onFocus={() => {
          setInputActive(true);
        }}
        onBlur={() => {
          setInputActive(false);
        }}
        disabled={
          chatMode.mode !== "Anyone Can Send" ||
          disableChat.value === true ||
          slowModeRemainingSec
            ? true
            : false
        }
        style={{
          border:
            disableChat.value === true || slowModeRemainingSec
              ? "1px solid #677077"
              : "",
          color:
            disableChat.value === true || slowModeRemainingSec ? "#677077" : "",
        }}
        placeholder={
          disableChat.value === true
            ? disableChat.reason
            : slowModeRemainingSec
            ? "Slow mode is on please wait"
            : "Type a message here"
        }
        value={message}
        // onKeyUp={(e) => {
        //   if (e.key === "@") {
        //     toggleTagUsers();
        //   }
        // }}
        onChange={(e) => {
          // if (e.key === "@") {
          //   return;
          // }

          setInputMessage(e.target.value);
        }}
        ref={inputRef}
        className={classes["chat-input"]}
        type="text"
      />
      {/* <div onClick={handleClick} className={classes["chat-bottom-send"]}>
        <AiOutlineArrowUp
          className={isSending ? classes["arrow-sending"] : classes["arrow"]}
          style={{ fontSize: ".95rem", color: "white" }}
        />
      </div> */}
      <div
        style={{ background: slowModeRemainingSec ? "#939393" : "" }}
        onClick={handleClick}
        className={classes["chat-bottom-send"]}
      >
        {slowModeRemainingSec ? (
          <p className={classes["countdown"]}>{slowModeRemainingSec}</p>
        ) : (
          <AiOutlineArrowUp
            className={isSending ? classes["arrow-sending"] : classes[""]}
            style={{ fontSize: ".95rem", color: "white" }}
          />
        )}
      </div>
    </div>
  );
};

export default ChatBottom;
