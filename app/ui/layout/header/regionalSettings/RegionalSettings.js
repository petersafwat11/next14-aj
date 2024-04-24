"use client";
import Image from "next/image";
import React from "react";
import classes from "./regionalSettings.module.css";

const RegionalSettings = ({ toggleSettings }) => {
  return (
    <div onClick={toggleSettings} className={classes["wrapper"]}>
      <div className={classes["container"]}>
        <div className={classes["world-image-wrapper"]}>
          <Image
            src="/svg/layout/header/world.svg"
            alt="logo"
            width="14"
            height="14"
          />
        </div>
        <p className={classes["text"]}>Regional Settings</p>
      </div>
    </div>
  );
};

export default RegionalSettings;
