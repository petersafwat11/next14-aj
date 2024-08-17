import React from "react";
import classes from "./signedIn.module.css";
import Image from "next/image";
import Cookies from "js-cookie";

const SignedIn = ({ session, toggleChangeUserName, AJUser, toggleUserInf }) => {
  const websiteLoginUser = AJUser ? JSON.parse(AJUser) : null;
  return websiteLoginUser ? (
    <div className={classes["signedin-with-username"]}>
      <p className={classes["username-text"]}>{websiteLoginUser?.name}</p>
      <button
        onClick={toggleChangeUserName}
        className={classes["change-username"]}
      >
        Change Username
      </button>
    </div>
  ) : (
    <div className={classes["container"]}>
      {session.provider === "facebook" ? (
        <Image
          src="/svg/chat/signin-icons/Facebook.svg"
          alt="avatar"
          height="49"
          width="49"
        />
      ) : session.provider === "google" ? (
        <Image
          src="/svg/chat/signin-icons/Google.svg"
          alt="avatar"
          height="49"
          width="49"
        />
      ) : session.provider === "twitter" ? (
        <Image
          src="/svg/chat/signin-icons/Twitter.svg"
          alt="avatar"
          height="49"
          width="49"
        />
      ) : (
        <Image
          src="/svg/chat/signin-icons/Facebook.svg"
          alt="avatar"
          height="49"
          width="49"
        />
      )}
      <div className={classes["right"]}>
        <p className={classes["name"]}>
          {session?.user?.name || websiteLoginUser?.name}
        </p>
        <button
          onClick={() => {
            if (websiteLoginUser) {
              toggleUserInf();
              return Cookies.remove("user");
            }
          }}
          className={classes["sign-out"]}
        >
          Sign-out
        </button>
      </div>
    </div>
  );
};

export default SignedIn;
