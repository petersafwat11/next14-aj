import Image from "next/image";
import React from "react";
import classes from "./staduim.module.css";

const Staduim = () => {
  return (
    <div className={classes["container"]}>
      <Image className={classes['logo']} src="/svg/watch/wwe/logo.svg" alt="logo" width="42" height="40" />
      <div className={classes["stadium"]}></div>
    </div>
  );
};

export default Staduim;
