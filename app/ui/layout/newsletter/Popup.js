"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import classes from "./popup.module.css";
const Popup = ({ hidePopup }) => {
  const router = useRouter();

  return (
    <div className={classes["popup"]}>
      <div className={classes["container"]}>
        <Image
          onClick={hidePopup}
          className={classes["exit"]}
          src="/svg/chat/exit-chat.svg"
          alt="exit"
          width="15"
          height="15"
        />
        <div className={classes["popup-first"]}>
          <h3 className={classes["title"]}>
            Get Notified for Every Major Event that takes Place!
          </h3>
          <p className={classes["para"]}>
            Sign up to our email newsletter to receive regular updates on all
            the major events that arise, so you never miss out!
          </p>
        </div>
        <div className={classes["popup-second"]}>
          <div className={classes["notify"]}>
            <input
              className={classes["notify-input"]}
              type="text"
              placeholder="Enter email address"
            />
            <button className={classes["notify-button"]}> Notify me</button>
          </div>
          <p className={classes["popup-second-para"]}>
            We care about the protection of your data. read our{" "}
            <span
              onClick={() => {
                router.push("/privacy-policy");
              }}
            >
              Privacy policy
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Popup;
