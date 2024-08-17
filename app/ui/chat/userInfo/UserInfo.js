"use client";
import Image from "next/image";
import { useState } from "react";
import Cookies from "js-cookie";

import classes from "./userInfo.module.css";
import SignedIn from "./signed-in/SignedIn";
import SignedOut from "./singed-out/SignedOut";
import axios from "axios";
const UserInfo = ({
  toggleChangeAvatar,
  selectedAvatar,
  toggleUserInf,
  toggleUsernameColor,
  color,
  setColor,
}) => {
  // const AJUser = Cookies.get("user");
  const [AJUser, setAJUser] = useState(Cookies.get("user"));
  const [loodinguserNameAvailability, setLoodinguserNameAvailability] =
    useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const [notValid, setNotValid] = useState(false);
  const [usernameChoosen, setUsernameChoosen] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);
  const toggleChangeUserName = async () => {
    const websiteLoginUser = AJUser ? JSON.parse(AJUser) : null;
    try {
      const confirmName = await axios.delete(
        `${process.env.BACKEND_SERVER}/users/regulrUsers/tempMail`,
        { name: websiteLoginUser.name }
      );
      if (websiteLoginUser) {
        setAJUser(null);
        return Cookies.remove("user");
      }
      // toggleUserInf();
    } catch (err) {
      console.log("err happend please try again later", err);
    }
  };
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
      setLoodinguserNameAvailability(false);
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
    if (!usernameChoosen || usernameChoosen.length < 1) {
      toggleUserInf();
      return;
    }
    try {
      const confirmName = await axios.post(
        `${process.env.BACKEND_SERVER}/users/regulrUsers/tempMail`,
        { name: usernameChoosen, image: selectedAvatar }
      );
      if (AJUser) {
        Cookies.remove("user");
      }
      Cookies.set("user", JSON.stringify(confirmName.data.data.user), {
        expires: 1,
      });
      setColor(confirmName?.data?.data?.user?.color);
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
            style={{
              borderRadius: selectedAvatar.startsWith("user") ? "50%" : "",
            }}
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
      {AJUser ? (
        <SignedIn
          toggleChangeUserName={toggleChangeUserName}
          AJUser={AJUser || null}
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
          Confirm
        </button>
        <button onClick={toggleUserInf} className={classes["cancel-button"]}>
          cancel
        </button>
      </div>
    </div>
  );
};
export default UserInfo;
