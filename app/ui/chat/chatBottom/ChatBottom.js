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
  chatMode,
}) => {
  const [displayTagUSer, setDisplayTagUSer] = useState(false);
  const controlShowingUsers = () => {
    setDisplayTagUSer(!TagUsers);
  };
  const [searchUsers, setSearchUsers] = useState("");
  const searchedUsers = (users) => {
    setSearchUsers(users);
  };
  
  return (
    <div id="chat-bottom" className={classes["chat-bottom"]}>
      {displayTagUSer && (
        <TagUsers
          setMentionSomeone={setMentionSomeone}
          controlShowingUsers={controlShowingUsers}
        />
      )}
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
        value={message}
        // onKeyUp={(e) => {
        //   if (e.key === "@") {
        //     setDisplayTagUSer(true);
        //   }
        // }}
        disabled={chatMode.mode === "Anyone Can Send" ? false : true}
        onChange={(e) => {
          setInputMessage(e.target.value);
        }}
        ref={inputRef}
        className={classes["chat-input"]}
        type="text"
        placeholder="Type a message here"
      />
      <div onClick={handleClick} className={classes["chat-bottom-send"]}>
        <AiOutlineArrowUp
          className={isSending ? classes["sending"] : classes[""]}
          style={{ fontSize: ".95rem", color: "white" }}
        />
      </div>
    </div>
  );
};

export default ChatBottom;
