import Image from "next/image";
import React from "react";
import classes from "./underDevelopment.module.css";
const UnderDevelopment = () => {
  return (
    <div className={classes["container"]}>
      <Image
      className={classes['clock-img']}
        src="/svg/under-dev/clock.svg"
        width="200"
        height="200"
        alt="clock"
      />
      <h2 className={classes["title"]}>This page is under development</h2>
      <p className={classes["thanks-message"]}>Thank you for your patience</p>
    </div>
  );
};

export default UnderDevelopment;
