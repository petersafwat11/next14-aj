'use client'
import Image from "next/image";
import React from "react";
import classes from "./makeComment.module.css";
const MakeComment = ({
  user,
  fontStyle,
  changeFontStyle,
  comment,
  handleComment,
}) => {
  return (
    <div className={classes["make-comment"]}>
      <div className={classes["comment"]}>
        <h4 className={classes["user"]}>{user || "Anonymous"}</h4>
        <textarea
          className={
            fontStyle === "normal"
              ? classes["input"]
              : fontStyle === "italic"
              ? classes["input-italic"]
              : classes["input-bold"]
          }
          value={comment}
          onChange={(e) => {
            handleComment(e.target.value);
          }}
        />
      </div>
      <div className={classes["make-comment-bottom"]}>
        <div className={classes["para-Styles"]}>
          <Image
            onClick={() => {
              if (fontStyle === "bold") {
                return changeFontStyle("normal");
              }
              changeFontStyle("bold");
            }}
            className={classes["chat-icon"]}
            src="/svg/donate/bold.svg"
            alt="chat"
            width="15"
            height="15"
          />
          <Image
            onClick={() => {
              if (fontStyle === "italic") {
                return changeFontStyle("normal");
              }

              changeFontStyle("italic");
            }}
            className={classes["chat-icon"]}
            src="/svg/donate/italic.svg"
            alt="chat"
            width="15"
            height="15"
          />
        </div>
        <button className={classes["comment-btn"]}>Comment</button>
      </div>
    </div>
  );
};

export default MakeComment;
