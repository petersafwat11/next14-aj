import React from "react";
import classes from "./topIndecator.module.css";
function generateArray(num) {
  return Array.from(Array(num), (_, index) => index + 1);
}

const TopIndecator = ({ indicatorsNum, curState, handleStepChange }) => {
  return (
    <div className={classes["container"]}>
      {generateArray(indicatorsNum).map((item) => (
        <span
          onClick={() => {
            handleStepChange(item);
          }}
          key={item * Math.random()}
          className={
            classes[item === curState ? "cur-state-indicator" : "indicator"]
          }
        ></span>
      ))}
    </div>
  );
};

export default TopIndecator;
