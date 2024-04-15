import React from "react";
import classes from "./signedIn.module.css";
import Image from "next/image";
import { signOut } from "next-auth/react";
import Cookies from "js-cookie";

const SignedIn = ({ session, selectedAvatar, AJUser, toggleUserInf }) => {
  console.log("user", JSON.parse(AJUser));
  const websiteLoginUser = AJUser ? JSON.parse(AJUser) : null;
  return (
    <div className={classes["container"]}>
      {websiteLoginUser ? (
        <Image src="/svg/menu-icon.svg" alt="logo" height="49" width="49" />
      ) : session.provider === "facebook" ? (
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
            console.log("signout");
            if (websiteLoginUser) {
              toggleUserInf();
              return Cookies.remove("user");
            }
            signOut({ redirect: false });
            toggleUserInf();
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
