import React from "react";
import classes from "./plan.module.css";
const Plan = ({ top, plan }) => {
  return (
    <div
      className={top ? classes["container-top"] : classes["container-bottom"]}
    >
      <p className={classes["text"]}>{plan}</p>
    </div>
  );
};

export default Plan;
