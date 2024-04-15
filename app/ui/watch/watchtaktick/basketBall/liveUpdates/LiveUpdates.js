import Image from "next/image";
import React from "react";
import classes from "./liveUpdates.module.css";
const LiveUpdates = () => {
  return (
    <div className={classes["container"]}>
      <div className={classes["top"]}></div>
      <div className={classes["middle"]}>
        <Image
          className={classes["first-team"]}
          src="/svg/watch/basketball/club-1.svg"
          alt="club-1"
          width="118"
          height="69"
        />
        <p className={classes["vs"]}>Vs</p>
        <Image
          className={classes["second-team"]}
          src="/svg/watch/basketball/club-1.svg"
          alt="club-1"
          width="118"
          height="69"
        />
      </div>

      <div className={classes["bottom"]}>
        <div className={classes["item-top"]}>
          <p className={classes["first"]}>50%</p>
          <p className={classes["middle"]}>FIELD GOALS</p>
          <p className={classes["last"]}>50%</p>
        </div>
        <div className={classes["progress-bar"]}>
          <span className={classes["first-team-percentage"]}></span>
        </div>
      </div>
      <div className={classes["updated-time"]}>Last updated: 1 minute ago</div>
    </div>
  );
};

export default LiveUpdates;
