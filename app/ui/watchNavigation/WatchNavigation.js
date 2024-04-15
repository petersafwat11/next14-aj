import Link from "next/link";
import React from "react";
import classes from "./watchNavigation.module.css";
const WatchNavigation = ({ page }) => {
  return (
    <div className={classes["navigate"]}>
      <Link href="/">Home</Link>
      <span> &gt; </span>
      <Link className={classes['active-page']} href={`/${page.toLowerCase()}`}>{page}</Link>
    </div>
  );
};

export default WatchNavigation;
