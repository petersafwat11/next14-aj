import Image from "next/image";
import React from "react";
import classes from "./temprature.module.css";
const Temprature = () => {
  return (
    <div className={classes["container"]}>
      <Image className={classes['temp-icon']} src="/svg/watch/sun.svg" alt="sun" width="19" height="19" />
      17°
    </div>
  );
};

export default Temprature;
