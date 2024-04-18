"use client";
import Image from "next/image";
import React, { useState } from "react";
import classes from "./xx.module.css";
import axios from "axios";
import Cookies from "js-cookie";

const WhoWillWin = ({ makeVote }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  return (
    <div className={classes["who-will-win"]}>
      {selectedValue ? (
        <div className={classes["options"]}>
          {["first", "second", "draw"].map((item, index) => (
            <div
              key={index}
              style={{
                border:
                  selectedValue === item
                    ? "1px solid #005174"
                    : "1px solid transparent",
              }}
              className={classes["option"]}
            >
              <span
                // style={{
                //   width:
                //     item.votes > 0
                //       ? `${Math.round(
                //           (item.votes * 100) / pollsData.totalVotes,
                //           1
                //         )}%`
                //       : "0%",
                // }}
                className={classes["overlay-color-first"]}
              ></span>
              <div className={classes["first"]}>
                <p className={classes["number"]}>1.</p>
                <p className={classes["name"]}>
                  {selectedValue === item && (
                    <Image
                      className={classes["check-icon"]}
                      src="/svg/watch/check.svg"
                      alt="chaeck"
                      width="14"
                      height="12"
                    />
                  )}
                  {item}
                </p>
              </div>
              <div className={classes["second"]}>
                <p className={classes["votes"]}>{item.votes}</p>
                <p className={classes["percentage"]}>
                  {/* {item.votes > 0
                    ? `${Math.round(
                        (item.votes * 100) / pollsData.totalVotes,
                        1
                      )}%`
                    : "0%"} */}
                  50%
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={classes["unSelected-options"]}>
          <p className={classes['text']}>Who will win?</p>
          {["first", "second", "draw"].map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedValue(item);
              }}
              className={classes["unSelected-option"]}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WhoWillWin;
