import React from "react";
import classes from "./somethinElseSelected.module.css";
const SomethingElseSelceted = ({ dispatchData, inputValue }) => {
  return (
    <div className={classes["input-group"]}>
      <label htmlFor="topic-title" className={classes["label"]}>
        Specify your topic
      </label>
      <input
        value={inputValue}
        onChange={(e) => {
          dispatchData({
            type: "TOPIC-SOMETHING-ELSE",
            value: e.target.value,
          });
        }}
        id="topic-title"
        type="text"
        placeholder="Type a topic..."
        className={classes["input"]}
      />
    </div>
  );
};

export default SomethingElseSelceted;
