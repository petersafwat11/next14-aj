import React from "react";
import classes from "./bottom.module.css";
const Bottom = () => {
  return (
    <div className={classes["container"]}>
      <p className={classes["para"]}>
        Statistics are updated every 5 seconds...{" "}
      </p>
    </div>
  );
};

export default Bottom;
