import Image from "next/image";
import React from "react";
import { BsCheckLg } from "react-icons/bs";
import classes from "./messageSent.module.css";
const MessageSent = ({ toggleMessageSentComponent }) => {
  return (
    <div className={classes["container"]}>
      <Image
        onClick={toggleMessageSentComponent}
        className={classes["exit"]}
        src="/svg/chat/exit-chat.svg"
        alt="exit"
        width="15"
        height="15"
      />
      <div className={classes["checked-div"]}>
        <BsCheckLg className={classes["checked-icon"]} />
      </div>
      <div className={classes["messages"]}>
        <p className={classes["thankyou-message"]}>
          Thank you for your feedback. Your request has been received and will
          be reviewed shortly.
        </p>
        <p className={classes["auto-close-message"]}>
          This message box will auto close in 5 sec
        </p>
      </div>
    </div>
  );
};

export default MessageSent;
