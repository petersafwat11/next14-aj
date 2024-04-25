import Image from "next/image";
import React from "react";
import classes from "./social.module.css";
const Social = () => {
  return (
    <div className={classes["header-social"]}>
      <Image
        className={classes["twitter"]}
        src="/svg/layout/social-icons/twitter.svg"
        alt="twitter-icon"
        width="17"
        height="17"
      />
      <Image
        className={classes["facebook"]}
        src="/svg/layout/social-icons/facebook.svg"
        alt="facebook-icon"
        width="17"
        height="17"
      />
      <Image
        className={classes["twitter"]}
        src="/svg/layout/social-icons/social.svg"
        alt="social-icon"
        width="17"
        height="17"
      />
      <Image
        className={classes["insta"]}
        src="/svg/layout/social-icons/insta.svg"
        alt="insta-icon"
        width="17"
        height="17"
      />
      <Image
        className={classes["ticktok"]}
        src="/svg/layout/social-icons/ticktok.svg"
        alt="tiktok-icon"
        width="17"
        height="17"
      />
      <Image
        className={classes["telegram"]}
        src="/svg/layout/social-icons/telegram.svg"
        alt="telegram-icon"
        width="17"
        height="17"
      />
    </div>
  );
};

export default Social;
