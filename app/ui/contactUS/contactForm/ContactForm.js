"use client";
import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import dynamic from "next/dynamic";
const ThanksMessage = dynamic(
  () => import("../../thanksMessage/ThanksMessage"),
  {
    ssr: false,
  }
);
const Popup = dynamic(() => import("../../popupWrapper/Popup"), {
  ssr: false,
});

const SomethingElseSelceted = dynamic(
  () => import("../sothethingElse/SomethingElseSelceted"),
  {
    ssr: false,
  }
);

import Topics from "../topics/Topics";
import classes from "./contactForm.module.css";
const intialValue = {
  email: "",
  topic: "",
  message: "",
  somethingElse: "",
};
const contactUsReducer = (state, action) => {
  if (action.type === "RESET") {
    return intialValue;
  } else if (action.type === "EMAIL") {
    return {
      ...state,
      email: action.value,
    };
  } else if (action.type === "MESSAGE") {
    return {
      ...state,
      message: action.value,
    };
  } else if (action.type === "TOPIC-SOMETHING-ELSE") {
    return {
      ...state,
      somethingElse: action.value,
    };
  } else {
    return {
      ...state,
      topic: action.value,
    };
  }
};
const ContactForm = () => {
  const [contactUs, dispatchData] = useReducer(contactUsReducer, intialValue);
  const [showThanksMessage, setShowThanksMessage] = useState(false);

  const toggleThanksMessage = () => {
    setShowThanksMessage(!showThanksMessage);
  };

  const sendForm = async (event) => {
    event.preventDefault();

    let modifiedData = { ...contactUs };
    if (contactUs.somethingElse?.length > 0) {
      modifiedData = { ...modifiedData, topic: modifiedData.somethingElse };
    }
    delete modifiedData.somethingElse;
    try {
      const response = await axios.post(
        `${process.env.BACKEND_SERVER}/contact-us`,
        modifiedData
      );
      dispatchData({ type: "RESET" });
      toggleThanksMessage();

    } catch (error) {
      //notify
      console.log("error-here", error);
    }
  };
  const selectedTopic = contactUs.topic;
  useEffect(() => {
    selectedTopic !== "Something else"
      ? dispatchData({ type: "TOPIC-SOMETHING-ELSE", value: "" })
      : "";
  }, [selectedTopic]);

  return (
    <div className={classes["container"]}>
      {showThanksMessage && (
        <Popup>
          <ThanksMessage
            showThanksMessage={showThanksMessage}
            setShowThanksMessage={setShowThanksMessage}
          />
        </Popup>
      )}

      <div className={classes["input-group"]}>
        <label className={classes["label"]} htmlFor="email">
          Your email address
        </label>
        <input
          value={contactUs.email}
          onChange={(e) => {
            dispatchData({ type: "EMAIL", value: e.target.value });
          }}
          id="email"
          type="email"
          placeholder="Type your email..."
          className={classes["input"]}
        />
      </div>
      <Topics topic={contactUs.topic} dispatchData={dispatchData} />
      {contactUs.topic === "Something else" && (
        <SomethingElseSelceted
          inputValue={contactUs.somethingElse}
          dispatchData={dispatchData}
        />
      )}

      <div className={classes["input-group-textarea"]}>
        <label htmlFor="topic-message" className={classes["label"]}>
          Tell us what you need help with?
        </label>
        <textarea
          value={contactUs.message}
          onChange={(e) => {
            dispatchData({ type: "MESSAGE", value: e.target.value });
          }}
          id="topic-message"
          placeholder="Type a message......"
          rows="4"
          className={classes["text-area"]}
        />
      </div>
      <button
        onClick={(e) => {
          sendForm(e);
        }}
        type="submit"
        className={classes["send-button"]}
      >
        Send
      </button>
    </div>
  );
};

export default ContactForm;
