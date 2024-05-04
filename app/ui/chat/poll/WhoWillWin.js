"use client";
import Image from "next/image";
import React, { useState } from "react";
import classes from "./whoWillWin.module.css";
import axios from "axios";
import Cookies from "js-cookie";

const WhoWillWin = ({ pollItems, selectedValue, pollsData, makeVote }) => {
  return (
    <div className={classes["who-will-win"]}>
      {pollsData.poll ? (
        <div className={classes["options"]}>
          {pollsData?.poll?.inputs?.map((item, index) => (
            <div
              key={index}
              style={{
                border:
                  selectedValue === item.value
                    ? "1px solid #005174"
                    : "1px solid transparent",
              }}
              className={classes["option"]}
            >
              <span
                style={{
                  width:
                    item.votes > 0
                      ? `${Math.round(
                          (item.votes * 100) / pollsData.totalVotes,
                          1
                        )}%`
                      : "0%",
                }}
                className={classes["overlay-color-first"]}
              ></span>
              <div className={classes["first"]}>
                <p className={classes["number"]}>1.</p>
                <p className={classes["name"]}>
                  {selectedValue === item.value && (
                    <Image
                      className={classes["check-icon"]}
                      src="/svg/watch/check.svg"
                      alt="check"
                      width="12"
                      height="10"
                    />
                  )}
                  {item.value}
                </p>
              </div>
              <div className={classes["second"]}>
                <p className={classes["votes"]}>{item.votes}</p>
                <p className={classes["percentage"]}>
                  {item.votes > 0
                    ? `${Math.round(
                        (item.votes * 100) / pollsData.totalVotes,
                        1
                      )}%`
                    : "0%"}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={classes["unSelected-options"]}>
          {pollItems.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                makeVote(item.value);
              }}
              className={classes["unSelected-option"]}
            >
              {item.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WhoWillWin;
