import Image from "next/image";
import React from "react";
import classes from "./chatBody.module.css";
import Message from "./Message";
const ChatBody = ({
  chatFilteredWords,
  messages,
  setMentionSomeone,
  username,
  lastMessageRef,
  firstMessageRef,
}) => {
  const censorWords = (text) => {
    // Create a regular expression pattern for all words in the word list
    const pattern = new RegExp(`\\b(${chatFilteredWords.join("|")})\\b`, "gi");

    // Replace each matched word with asterisks
    const censoredText = text?.replace(pattern, (match) =>
      "*".repeat(match.length)
    );

    return censoredText;
  };

  return (
    <div className={classes["chat-body"]}>
      <div ref={lastMessageRef} className={classes["messages"]}>
        <div ref={firstMessageRef}></div>
        {messages.map((message, index) => (
          <Message
            censorWords={censorWords}
            setMentionSomeone={setMentionSomeone}
            username={username}
            message={message}
            key={message?._id || Math.round(Math.random() * 1000)}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatBody;
