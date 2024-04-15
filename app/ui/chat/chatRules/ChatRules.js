import React from "react";
import classes from "./chatRules.module.css";
const ChatRules = ({ data, rulesVisability }) => {
  return (
    <div className={classes["container"]}>
      <h2 className={classes["title"]}>Chat Rules</h2>
      <ol className={classes["list"]}>
        {data.map((item, index) => (
          <li key={index} className={classes["list-item"]}>
            <span className={classes["num"]}>{index + 1}.</span>
            {item}
          </li>
        ))}
      </ol>
      <h3 className={classes["sub-title"]}>
        Violation of these rules may result in a warning or IP ban.
      </h3>
      <button
        onClick={rulesVisability}
        className={classes["understand-button"]}
      >
        UNDERSTOOD
      </button>
    </div>
  );
};

export default ChatRules;
