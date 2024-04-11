import React from "react";
import classes from "./pageTitle.module.css";
const PageTitle = ({ title }) => {
  return (
    <div className={classes["top-heading"]}>
      <h2 className={classes["top-heading-title"]}>{title}</h2>
      <span></span>
    </div>
  );
};

export default PageTitle;
