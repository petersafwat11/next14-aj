"use client";
import React, { useState } from "react";
import Sorting from "../sorting/Sorting";
import classes from "./comments.module.css";
import MakeComment from "./makeComment/MakeComment";
const Comments = ({ user }) => {
  const [fontStyle, setFontStyle] = useState("normal");
  const [comment, setComment] =
    useState(`I really appreciate the insights and perspective shared in this
  article. It's definitely given me something to think about and has
  helped me see things from a different angle. Thank you for writing
  and sharing!`);
  const [sorting, setSorting] = useState("Newest");
  const changeFontStyle = (val) => {
    setFontStyle(val);
  };
  const handleComment = (val) => {
    setComment(val);
  };
  const handleSorting = (val) => {
    setSorting(val);
  };
  return (
    <div className={classes["wrapper"]}>
      <h3 className={classes["title"]}>Comments</h3>

      <div className={classes["container"]}>
        {/* <div className={classes["make-comment"]}>
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
                setComment(e.target.value);
              }}
            />
          </div>
          <div className={classes["make-comment-bottom"]}>
            <div className={classes["para-Styles"]}>
              <Image
                onClick={() => {
                  if (fontStyle === "bold") {
                    return setFontStyle("normal");
                  }
                  setFontStyle("bold");
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
                    return setFontStyle("normal");
                  }

                  setFontStyle("italic");
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
        </div> */}
        <MakeComment
          user={user}
          fontStyle={fontStyle}
          changeFontStyle={changeFontStyle}
          comment={comment}
          handleComment={handleComment}
        />
        <div className={classes["top"]}>
          <h4 className={classes["all-comments-text"]}>ALL COMMENTS</h4>
          <Sorting
            options={["xxxxx"]}
            handleSorting={handleSorting}
            sorting={sorting}
          />
        </div>
        <div className={classes["comments"]}>
          <div className={classes["comment"]}>
            <h4 className={classes["user"]}>Anonymous</h4>
            <p className={classes["para"]}>
              {`I really appreciate the insights and perspective shared in this
        article. It's definitely given me something to think about and has
        helped me see things from a different angle. Thank you for writing
        and sharing!`}
            </p>
            <p className={classes["time"]}>5 min ago</p>
          </div>
        </div>
        <button className={classes["load-more"]}>Load More</button>
      </div>
    </div>
  );
};

export default Comments;
