"use client";
import Image from "next/image";
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import classes from "./report.module.css";
const Report = ({ toggleReport, handleMakingReport }) => {
  const causes = ["Stream not working", "Wrong Match", "Lag", "Other"];
  const [cause, setCause] = useState("");
  return (
    <div className={classes["report"]}>
      <RxCross1 onClick={toggleReport} className={classes["exit"]} />

      <div className={classes["top"]}>
        <h2 className={classes["title"]}>Report Link</h2>
      </div>
      <div className={classes["causes"]}>
        <div
          onClick={() => {
            setCause("Stream not working");
          }}
          className={
            cause === "Stream not working"
              ? classes["selected-cause"]
              : classes["cause"]
          }
        >
          <div className={classes["icon-wrapper"]}>
            <svg
              width="35"
              height="35"
              viewBox="0 0 33 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.0618 2.64579L30.3535 9.93746M30.3535 2.64579L23.0618 9.93746M31.0827 16.5V24.0833C31.0827 26.5335 31.0827 27.7586 30.6058 28.6945C30.1864 29.5177 29.5171 30.187 28.6939 30.6064C27.758 31.0833 26.5329 31.0833 24.0827 31.0833H8.91602C6.46579 31.0833 5.24067 31.0833 4.30481 30.6064C3.4816 30.187 2.81231 29.5177 2.39286 28.6945C1.91602 27.7586 1.91602 26.5335 1.91602 24.0833V8.91663C1.91602 6.4664 1.91602 5.24128 2.39286 4.30542C2.81231 3.48221 3.4816 2.81292 4.30481 2.39347C5.24067 1.91663 6.46579 1.91663 8.91602 1.91663H16.4993M2.12821 28.0592C2.81238 25.5979 5.06976 23.7916 7.74901 23.7916H17.9573C19.3126 23.7916 19.9902 23.7916 20.5537 23.9037C22.8677 24.364 24.6766 26.1729 25.1369 28.4869C25.249 29.0504 25.249 29.728 25.249 31.0833M19.416 12.8541C19.416 16.0758 16.8043 18.6875 13.5827 18.6875C10.361 18.6875 7.74935 16.0758 7.74935 12.8541C7.74935 9.63246 10.361 7.02079 13.5827 7.02079C16.8043 7.02079 19.416 9.63246 19.416 12.8541Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p>Stream not working </p>
        </div>
        <div
          onClick={() => {
            setCause("Wrong Match");
          }}
          className={
            cause === "Wrong Match"
              ? classes["selected-cause"]
              : classes["cause"]
          }
        >
          <div className={classes["icon-wrapper"]}>
            <svg
              width="35"
              height="35"
              viewBox="0 0 33 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.18893 6.18954L26.8098 26.8104M31.0827 16.5C31.0827 24.5541 24.5535 31.0833 16.4993 31.0833C8.4452 31.0833 1.91602 24.5541 1.91602 16.5C1.91602 8.44581 8.4452 1.91663 16.4993 1.91663C24.5535 1.91663 31.0827 8.44581 31.0827 16.5Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p>Wrong Match </p>
        </div>
        <div
          onClick={() => {
            setCause("Lag");
          }}
          className={
            cause === "Lag" ? classes["selected-cause"] : classes["cause"]
          }
        >
          <div className={classes["icon-wrapper"]}>
            <svg
              width="35"
              height="35"
              viewBox="0 0 29 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.66667 10.6666L2.96962 17.5031C2.46094 18.1135 2.2066 18.4187 2.20272 18.6765C2.19934 18.9005 2.29919 19.1137 2.4735 19.2546C2.67401 19.4166 3.0713 19.4166 3.86588 19.4166H14.5L13.0417 31.0833L20.3333 22.3333M19.823 13.5833H25.1341C25.9287 13.5833 26.326 13.5833 26.5265 13.7453C26.7008 13.8862 26.8007 14.0994 26.7973 14.3235C26.7934 14.5812 26.5391 14.8864 26.0304 15.4968L24.0524 17.8704M12.4186 6.16424L15.9583 1.91663L15.0837 8.91329M27.625 29.625L1.375 3.37496"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p>Lag</p>
        </div>
        <div
          onClick={() => {
            setCause("Other");
          }}
          className={
            cause === "Other" ? classes["selected-cause"] : classes["cause"]
          }
        >
          <div className={classes["icon-wrapper"]}>
            <svg
              width="35"
              height="35"
              viewBox="0 0 32 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.7556 12.125C12.0985 11.1503 12.7752 10.3284 13.6659 9.80494C14.5567 9.28144 15.604 9.09008 16.6223 9.26475C17.6406 9.43942 18.5643 9.96885 19.2297 10.7593C19.895 11.5497 20.2592 12.5501 20.2577 13.5833C20.2577 16.5 15.8827 17.9583 15.8827 17.9583M15.9993 23.7916H16.0139M30.5827 16.5C30.5827 24.5541 24.0535 31.0833 15.9993 31.0833C7.9452 31.0833 1.41602 24.5541 1.41602 16.5C1.41602 8.44581 7.9452 1.91663 15.9993 1.91663C24.0535 1.91663 30.5827 8.44581 30.5827 16.5Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p>Other</p>
        </div>
      </div>
      <div className={classes["bottom"]}>
        <p className={classes["try-again-para"]}>
          Please try another server in the meantime!
        </p>
        <button
          onClick={() => {
            handleMakingReport(cause);
          }}
          className={classes["send-button"]}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Report;
