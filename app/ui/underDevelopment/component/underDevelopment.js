import Image from "next/image";
import React from "react";
import classes from "./underDevelopment.module.css";

const UnderDevelopment = ({message, title}) => {
  return (
    <div className={classes["container"]}>
      <Image
        className={classes["clock-img"]}
        src="/svg/under-dev/clock.svg"
        width="117"
        height="117"
        alt="clock"
      />
      <h2 className={classes["title"]}>{title}</h2>
      <p className={classes["thanks-message"]}>{message}</p>
    </div>
  );
};

export default UnderDevelopment;
