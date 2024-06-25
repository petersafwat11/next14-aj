"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Cookies from "js-cookie";

import classes from "./userInfo.module.css";
import SignedIn from "./signed-in/SignedIn";
import SignedOut from "./singed-out/SignedOut";
import axios from "axios";
import { checkSessionValidty } from "@/app/lib/sessionCheck";
const UserInfo = ({
  toggleChangeAvatar,
  selectedAvatar,
  toggleUserInf,
  toggleUsernameColor,
  color,
}) => {
  const { data: session, status } = useSession();
  const [loodinguserNameAvailability, setLoodinguserNameAvailability] =
    useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const [notValid, setNotValid] = useState(false);
  const [usernameChoosen, setUsernameChoosen] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);

  const checkRequest = async (val) => {
    try {
      const response = await axios.post(
        `${process.env.BACKEND_SERVER}/users/regulerUsers/tempMail/checkAvailability`,
        { name: val }
      );
      setLoodinguserNameAvailability(false);
      setNotValid(false);
    } catch (err) {
      setNotValid(true);
      console.log("err happend please try again later", err);
    }
  };
  const selectUserName = async (val) => {
    setUsernameChoosen(val);
    if (val.length > 0) {
      setStartTyping(true);
    } else {
      setStartTyping(false);
    }
    setLoodinguserNameAvailability(true);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timeout
    const newTimeout = setTimeout(async () => {
      await checkRequest(val);
    }, 1000);

    // Store the new timeout ID
    setTypingTimeout(newTimeout);
  };
  const confirmUserName = async () => {
    if (notValid) {
      return;
    }
    try {
      const confirmName = await axios.post(
        `${process.env.BACKEND_SERVER}/users/regulrUsers/tempMail`,
        { name: usernameChoosen }
      );
      Cookies.set("user", JSON.stringify(confirmName.data.data.user), {
        expires: 1,
      });
      toggleUserInf();
    } catch (err) {
      console.log("err happend please try again later", err);
    }
  };

  return (
    <div className={classes["user-info"]}>
      <div className={classes["user-info-top"]}>
        {color && (
          <span
            style={{ backgroundColor: color }}
            onClick={toggleUsernameColor}
            className={classes["username-color"]}
          ></span>
        )}
        <div className={classes["selected-avatar"]}>
          <Image
            src={
              selectedAvatar.startsWith("user")
                ? `${process.env.BACKEND_SERVER}/img/users/${selectedAvatar}`
                : selectedAvatar
            }
            alt="avatar"
            height="78"
            width="79"
          />
          {/* {false && (
            <p className={classes["username-unavailable"]}>
              please signIn to change your avatar
            </p>
          )} */}
        </div>
        <button
          onClick={toggleChangeAvatar}
          className={classes["change-button"]}
        >
          CHANGE
        </button>
      </div>
      <div className={classes["user-info-body"]}>
        <p className={classes["user-info-para"]}>Your Display Name</p>
      </div>
      {(session && checkSessionValidty(session?.expires)) ||
      Cookies.get("user") ? (
        <SignedIn
          AJUser={Cookies.get("user") || null}
          session={session}
          selectedAvatar={selectedAvatar}
          toggleUserInf={toggleUserInf}
        />
      ) : (
        <SignedOut
          loodinguserNameAvailability={loodinguserNameAvailability}
          startTyping={startTyping}
          notValid={notValid}
          usernameChoosen={usernameChoosen}
          selectUserName={selectUserName}
        />
      )}
      <div className={classes["user-info-actions"]}>
        <button onClick={confirmUserName} className={classes["confirm-button"]}>
          Confirm{" "}
        </button>
        <button onClick={toggleUserInf} className={classes["cancel-button"]}>
          cancel{" "}
        </button>
      </div>
    </div>
  );
};
export default UserInfo;
