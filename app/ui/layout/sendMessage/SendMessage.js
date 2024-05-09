"use client";
import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import classes from "./sendMessage.module.css";
import Popup from "../../popupWrapper/Popup";
import ThanksMessage from "../../thanksMessage/ThanksMessage";
const SendMessage = ({ toggleSendMessageComponent }) => {
  const [message, setMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  const sendFeedback = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.BACKEND_SERVER}/feedback`,

        { message: message },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toggleMessageSentComponent();
    } catch (error) {
      console.log("error", error);
      // notify
    }
  };
  const toggleMessageSentComponent = () => {
    setMessageSent(!messageSent);
  };

  return (
    <div className={classes["send-message"]}>
      {messageSent && (
        <Popup>
          <ThanksMessage
            showThanksMessage={messageSent}
            setShowThanksMessage={setMessageSent}
          />
        </Popup>
      )}

      <div className={classes["send-message-top"]}>
        <h3 className={classes["heading"]}>Feedback</h3>
        <Image
          onClick={toggleSendMessageComponent}
          className={classes["exit"]}
          src="/svg/exit.svg"
          alt="exit"
          width="15"
          height="15"
        />
      </div>
      <div className={classes["send-message-body"]}>
        <textarea
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          className={classes["text-area"]}
          placeholder="Type a message..."
        />
        <p className={classes["send-message-para"]}>
          We care about your feedback and aim to adhere to your needs
          immediately.
        </p>
        <button
          onClick={(e) => {
            sendFeedback(e);
          }}
          className={classes["send-button"]}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default SendMessage;

export const SendMessageButton = () => {
  const [showSendMessage, setShowSendMessage] = useState(false);

  const toggleSendMessageComponent = () => {
    setShowSendMessage(!showSendMessage);
  };
  return (
    <>
      {showSendMessage && (
        <Popup>
          <SendMessage
            toggleSendMessageComponent={toggleSendMessageComponent}
          />
        </Popup>
      )}
      <div
        onClick={toggleSendMessageComponent}
        className={classes["send-message-button"]}
      >
        <p>Feedback</p>
      </div>
    </>
  );
};
