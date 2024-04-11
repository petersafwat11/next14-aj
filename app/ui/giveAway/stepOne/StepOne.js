"use client";
import React from "react";
import classes from "./stepOne.module.css";
const StepOne = ({
  errMessage,
  handleStepChange,
  dispatchAction,
  userInfo,
}) => {
  return (
    <div className={classes["container"]}>
      <div className={classes["body"]}>
        <div className={classes["input-group"]}>
          <label htmlFor="full-name" className={classes["label"]}>
            Full name
          </label>
          <input
            value={userInfo.fullName}
            onChange={(e) => {
              dispatchAction({
                type: "USER-INFO",
                value: { ...userInfo, fullName: e.target.value },
              });
            }}
            id="full-name"
            type="text"
            placeholder="Enter your name..."
            className={classes["input"]}
          />
        </div>
        <div className={classes["input-group"]}>
          <label htmlFor="email" className={classes["label"]}>
            Email Address
          </label>
          <input
            value={userInfo.email}
            onChange={(e) => {
              dispatchAction({
                type: "USER-INFO",
                value: { ...userInfo, email: e.target.value },
              });
            }}
            id="email"
            type="email"
            placeholder="Enter your email..."
            className={classes["input"]}
          />
        </div>
      </div>
      <div className={classes["bottom"]}>
        <p className={classes["bottom-para"]}>
          Please enter the details accurately as the winner will be contacted
          via email.
        </p>
        {errMessage.length > 0 && (
          <p className={classes["err-message"]}>{errMessage} </p>
        )}
        <button
          onClick={() => {
            handleStepChange(2);
          }}
          className={classes["next-button"]}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepOne;
