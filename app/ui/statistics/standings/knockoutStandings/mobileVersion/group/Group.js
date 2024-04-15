import Image from "next/image";
import React from "react";
import classes from "./group.module.css";
const Group = () => {
  return (
    <div className={classes["container"]}>
      <div className={classes["teams-logoes"]}>
        <Image
          className={classes["first-team-image"]}
          src="/svg/teams/man-united.svg"
          alt="team"
          width="44"
          height="34"
        />
        <Image
          className={classes["sec-team-image"]}
          src="/svg/teams/liverpool.svg"
          alt="team"
          width="25"
          height="34"
        />
      </div>
      <div className={classes["teams-names"]}>
        <p className={classes["team-name"]}>MUN</p>
        <p className={classes["team-name"]}>LFC</p>
      </div>
      <div className={classes["result"]}>
        <span>2 </span>
        <span> - </span>
        <span> 3</span>
      </div>
    </div>
  );
};

export default Group;
