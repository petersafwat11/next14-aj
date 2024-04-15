"use client";
import Image from "next/image";
import React, { useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import WhoWillWin from "./WhoWillWin";
import classes from "./poll.module.css";
const Poll = () => {
  const [showPoll, setShowPoll] = useState(false);

  return (
    <div className={classes["container"]}>
      <div className={classes["top"]}>
        <p className={classes["poll-maker"]}> Pinned by AJ Sports Admin</p>
        <Image
          className={classes["poll-icon"]}
          alt="pin"
          src="/svg/chat/pin.svg"
          width="18"
          height="18"
        />
      </div>
      <div className={classes["body"]}>
        <h2 className={classes["poll-title"]}>POLL TIME</h2>
        <p className={classes["poll-para"]}>
          Who will win the national Europa League this year?
        </p>
      </div>
      {showPoll && <WhoWillWin />}
      {/* {showPoll && ( */}
      <div className={classes["button-wrapper"]}>
        <button
          onClick={() => {
            setShowPoll(!showPoll);
          }}
          className={classes["show-less"]}
        >
          {showPoll ? "Show Less" : "Show More"}
        </button>
      </div>
      {/* // )} */}
      {/* {!showPoll && (
        <div className={classes["arrow-wrapper"]}>
          <RiArrowDownSLine
            onClick={() => {
              setShowPoll(!showPoll);
            }}
            className={showPoll ? classes["arrow-down"] : classes["arrow-up"]}
          />
        </div>
      )} */}
    </div>
  );
};

export default Poll;
