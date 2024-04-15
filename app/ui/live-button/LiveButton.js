import Link from "next/link";
import React from "react";
import classes from "./live-button.module.css";
const LiveBtn = ({ text }) => {
  return (
    <>
      <Link href='/' className={classes["live-btn"]}>
        <div className={classes["live-btn-rounded"]}></div>
        {text}
      </Link>
    </>
  );
};

export default LiveBtn;
