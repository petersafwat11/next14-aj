"use client";
import React, { useState } from "react";
import classes from "./inputGroup.module.css";
const InputGroup = () => {
  const [enteredEmail, setEnteredEmail] = useState("");

  return (
    <div className={classes["notify-me-group"]}>
      <p className={classes["label"]}>
        Get notified when we launch premium packages
      </p>
      <div className={classes["input-group"]}>
        <input
          className={classes["notify-input"]}
          placeholder="Enter email address"
          value={enteredEmail}
          onChange={(e) => {
            setEnteredEmail(e.target.value);
          }}
        />
        <button className={classes["notify-button"]}>Notify me</button>
      </div>
    </div>
  );
};

export default InputGroup;
