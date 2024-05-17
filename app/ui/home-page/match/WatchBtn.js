import React from "react";
import classes from "./watchBtn.module.css";
import Link from "next/link";

const WatchBtn = ({ name }) => {
  return (
    <div className={classes["action-button"]}>
      <Link
        href={`/watch/${name}`}
        // scroll={false}
        className={classes["watch-button"]}
      >
        WATCH
      </Link>
    </div>
  );
};

export default WatchBtn;
