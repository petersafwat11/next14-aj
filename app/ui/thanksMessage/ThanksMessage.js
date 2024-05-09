import Image from "next/image";
import React, { useEffect } from "react";
import classes from "./thanksMessage.module.css";

const ThanksMessage = ({ showThanksMessage, setShowThanksMessage }) => {
  useEffect(() => {
    if (showThanksMessage) {
      setTimeout(() => {
        setShowThanksMessage(false);
      }, [5000]);
    }
  }, [showThanksMessage, setShowThanksMessage]);

  return (
    <div className={classes["container"]}>
      <div className={classes["body"]}>
        <div className={classes["left"]}>
          <Image
            className={classes["check"]}
            src="/svg/thanksMessage/check.svg"
            alt="chat"
            width="62"
            height="60"
          />
        </div>
        <div className={classes["right"]}>
          <h3 className={classes["title"]}>Thank you for your assistance</h3>
          <p className={classes["para"]}>
            We will aim to fix the issue as soon as possible
          </p>
        </div>
      </div>
      <div className={classes["loading"]}>
        <span></span>
      </div>
    </div>
  );
};

export default ThanksMessage;
