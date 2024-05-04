"use client";
import Image from "next/image";
import React from "react";
import classes from "./eventEnded.module.css";
const EventEnded = () => {
  return (
    <div className={classes["container"]}>
      <Image
        className={classes["logo"]}
        src="/svg/watch/event-will-start/logo.svg"
        alt="logo"
        width="111"
        height="67"
      />
      <p className={classes["text"]}>
        <span></span> WHOOPS! The event has concluded{" "}
      </p>
    </div>
  );
};

export default EventEnded;
