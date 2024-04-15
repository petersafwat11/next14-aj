"use client";
import Image from "next/image";
import React, { useState } from "react";
import classes from "./whoWillWin.module.css";

const WhoWillWin = () => {
  const [selectedValue, setSelectedValue] = useState("");
  return (
    <div className={classes["who-will-win"]}>
      <div className={classes["options"]}>
        <div
          onClick={() => {
            if (selectedValue === "first-wins") {
              setSelectedValue("");
              return;
            }
            setSelectedValue("first-wins");
          }}
          style={{
            border: selectedValue === "first-wins" ? "1px solid #005174" : "1px solid transparent",
          }}
          className={classes["option"]}
        >
          <span className={classes["overlay-color-first"]}></span>
          <div className={classes["first"]}>
            <p className={classes["number"]}>1.</p>
            <p className={classes["name"]}>
              {selectedValue === "first-wins" && (
                <Image
                  className={classes["check-icon"]}
                  src="/svg/watch/check.svg"
                  alt="chaeck"
                  width="14"
                  height="12"
                />
              )}
              Anthony Joshua
            </p>
          </div>
          <div className={classes["second"]}>
            <p className={classes["votes"]}>1728 votes</p>
            <p className={classes["percentage"]}>89%</p>
          </div>
        </div>
        <div
          onClick={() => {
            if (selectedValue === "draw") {
              setSelectedValue("");
              return;
            }
            setSelectedValue("draw");
          }}
          style={{
            border: selectedValue === "draw" ? "1px solid #005174" : "1px solid transparent",
          }}
          className={classes["option"]}
        >
          <span className={classes["overlay-color-draw"]}></span>
          <div className={classes["first"]}>
            <p className={classes["number"]}>2.</p>
            <p className={classes["name"]}>
              {selectedValue === "draw" && (
                <Image
                  className={classes["check-icon"]}
                  src="/svg/watch/check.svg"
                  alt="chaeck"
                  width="14"
                  height="12"
                />
              )}
              Draw
            </p>
          </div>
          <div className={classes["second"]}>
            <p className={classes["votes"]}>72 votes</p>
            <p className={classes["percentage"]}>4%</p>
          </div>
        </div>
        <div
          onClick={() => {
            if (selectedValue === "second-wins") {
              setSelectedValue("");
              return;
            }

            setSelectedValue("second-wins");
          }}
          style={{
            border: selectedValue === "second-wins" ? "1px solid #005174" : "1px solid transparent",
          }}
          className={classes["option"]}
        >
          <span className={classes["overlay-color-second"]}></span>

          <div className={classes["first"]}>
            <p className={classes["number"]}>3.</p>
            <p className={classes["name"]}>
              {selectedValue === "second-wins" && (
                <Image
                  className={classes["check-icon"]}
                  src="/svg/watch/check.svg"
                  alt="chaeck"
                  width="14"
                  height="12"
                />
              )}
              Tyson Fury
            </p>
          </div>
          <div className={classes["second"]}>
            <p className={classes["votes"]}>152 votes</p>
            <p className={classes["percentage"]}>7%</p>
          </div>
        </div>
      </div>
      {/* <p className={classes["all-votes"]}>442k overall votes </p> */}
    </div>
  );
};

export default WhoWillWin;
