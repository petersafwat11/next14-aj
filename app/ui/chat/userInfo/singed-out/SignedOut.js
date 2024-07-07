import React, { useState } from "react";
import classes from "./signedOut.module.css";
import Image from "next/image";

const SignedOut = ({
  notValid,
  usernameChoosen,
  selectUserName,
  startTyping,
  loodinguserNameAvailability,
}) => {
  const popupCenter = (url, title) => {
    const dualScreenLeft = window.screenLeft ?? window.screenX;
    const dualScreenTop = window.screenTop ?? window.screenY;
    const width =
      window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

    const height =
      window.innerHeight ??
      document.documentElement.clientHeight ??
      screen.height;

    const systemZoom = width / window.screen.availWidth;

    const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
    const top = (height - 550) / 2 / systemZoom + dualScreenTop;

    const newWindow = window.open(
      url,
      title,
      `width=${500 / systemZoom},height=${
        550 / systemZoom
      },top=${top},left=${left}`
    );

    newWindow?.focus();
  };
  return (
    <div className={classes["container"]}>
      <div className={classes["user-data"]}>
        <input
          value={usernameChoosen}
          onChange={(e) => {
            selectUserName(e.target.value);
          }}
          style={{
            border:
              loodinguserNameAvailability && startTyping
                ? "1.5px solid white"
                : notValid && startTyping
                ? "1.5px solid #D00"
                : !notValid && startTyping
                ? "1.5px solid #12A533"
                : "",
          }}
          className={classes["user-data-input"]}
          type="text"
          placeholder="Enter username...."
        />
        {loodinguserNameAvailability && startTyping ? (
          <div className={classes["spinner"]}></div>
        ) : notValid && startTyping ? (
          <img
            className={classes["validity-icon"]}
            src="/svg/chat/not-available-username.svg"
            width="17"
            height="17"
          />
        ) : !notValid && startTyping ? (
          <img
            className={classes["validity-icon"]}
            src="/svg/chat/available-username.svg"
            width="17"
            height="17"
          />
        ) : (
          ""
        )}
      </div>
      {(loodinguserNameAvailability && startTyping) ||
      (!loodinguserNameAvailability && !startTyping) ? (
        ""
      ) : notValid && startTyping ? (
        <p className={classes["username-unavailable"]}>
          Username not available
        </p>
      ) : (
        <p className={classes["username-available"]}>Username available</p>
      )}
      {/* <p className={classes["continue-text"]}>Or continue with</p> */}
      {/* <div className={classes["signin-options"]}>
        <Image
          onClick={() => {
            popupCenter("/signInFacebbok", "Sample Sign In");
          }}
          src="/svg/chat/signin-icons/Facebook.svg"
          alt="avatar"
          height="36"
          width="36"
        />
        <Image
          onClick={() => popupCenter("/signInGoogle", "Sample Sign In")}
          src="/svg/chat/signin-icons/Google.svg"
          alt="avatar"
          height="36"
          width="36"
        />
        <Image
          onClick={() => {
            popupCenter("/signInTwitter", "Sample Sign In");
          }}
          src="/svg/chat/signin-icons/Twitter.svg"
          alt="avatar"
          height="36"
          width="36"
        />
        <Image
          onClick={() => {
            popupCenter("/signInReddit", "Sample Sign In");
          }}
          src="/svg/chat/signin-icons/Reddit.svg"
          alt="avatar"
          height="36"
          width="36"
        />
      </div> */}
    </div>
  );
};

export default SignedOut;
