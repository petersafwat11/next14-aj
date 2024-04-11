"use client";
import SendMessage from "@/app/ui/layout/sendMessage/SendMessage";
import Popup from "@/app/ui/popupWrapper/Popup";
import React, { useState } from "react";
import classes from "./feedbackBtn.module.css";
const FeedbackBtn = () => {
  const [feedBackMessage, setFeedBackMessage] = useState(false);
  const toggleSendMessageComponent = () => {
    setFeedBackMessage(!feedBackMessage);
  };

  return (
    <>
      {feedBackMessage && (
        <Popup>
          <SendMessage
            toggleSendMessageComponent={toggleSendMessageComponent}
          />
        </Popup>
      )}

      <button
        onClick={toggleSendMessageComponent}
        className={classes["uesr-feedback-button"]}
      >
        Feedback
      </button>
    </>
  );
};

export default FeedbackBtn;
