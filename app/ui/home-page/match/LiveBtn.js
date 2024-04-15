"use client";
import React from "react";
import classes from "./liveBtn.module.css";

const LiveBtn = (live) => {
  return live?.live ? (
    <div className="live-button-div">
      <div className={classes["live-button"]}>
        <div className={classes["dot-wrapper"]}>
          <span></span>
        </div>
        <p>Live</p>
      </div>
    </div>
  ) : (
    <div className={classes["not-live"]}>LIVE</div>
  );
};

export default LiveBtn;
