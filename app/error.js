"use client";
import React from "react";
import classes from "./error.module.css";
import Link from "next/link";

const Page = () => {
  return (
    // <div className="wrapper">
    //   <TopLayout />
    //   <div className="wrapper-2">
    //     <Marque />

    <div className={classes["error"]}>
      <div className={classes["first-section"]}>
        <h2 className={classes["title"]}>Error 404 - Page Not Found</h2>
        <p className={classes["error-message"]}>
          Maybe this page moved? Got deleted? Is hiding out in quarantine? Never
          existed in the first place?
        </p>
      </div>
      <div className={classes["second-section"]}>
        <p className={classes["return-para"]}>
          Let&#x27;s go <Link href={"/"}>home</Link>
          and try from there.
        </p>
        <Link href={"/"} className={classes["button"]}>
          HOME
        </Link>
      </div>
    </div>
    //   </div>
    // </div>
  );
};

export default Page;
