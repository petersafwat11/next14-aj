import React from "react";
import classes from "./matchDots.module.css";
const MatchDots = ({ options, selectedOption, changeOptions, vertical }) => {
  return (
    <div className={vertical? classes["vertical-dots"]: classes["dots"]}>
      {options.map((item, index) => (
        <div
          key={item}
          onClick={() => {
            changeOptions(item);
          }}
          className={classes[selectedOption === item ? "dot-selected" : "dot"]}
        >
          <div
            className={
              classes[
                selectedOption === item ? "meduim-dot-selected" : "meduim-dot"
              ]
            }
          >
            <span
              className={
                classes[
                  selectedOption === item ? "small-dot-selected" : "small-dot"
                ]
              }
            ></span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchDots;
