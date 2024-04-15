import Image from "next/image";
import React from "react";
import classes from "./group.module.css";
const Group = ({ final }) => {
  return (
    <div className={final? classes["container-final"]: classes["container"]}>
      <div className={classes["team"]}>
        <div className={classes["team-data"]}>
          <Image
            className={classes["first-team-image"]}
            src="/svg/teams/man-united.svg"
            alt="team"
            width="23"
            height="21"
          />
          <p className={classes["team-name"]}>Manchester United</p>
        </div>
        <p className={classes["team-goals"]}>3</p>
      </div>
      <div className={classes["team"]}>
        <div className={classes["team-data"]}>
          <Image
            className={classes["first-team-image"]}
            src="/svg/teams/liverpool.svg"
            alt="team"
            width="17"
            height="21"
          />
          <p className={classes["team-name"]}>Liverpool</p>
        </div>
        <p className={classes["team-goals"]}>0</p>
      </div>
    </div>
  );
};

export default Group;
