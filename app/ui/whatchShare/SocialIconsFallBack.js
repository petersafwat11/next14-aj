import React from "react";
import { BsTwitter } from "react-icons/bs";
import { FaShareAlt, FaTelegramPlane } from "react-icons/fa";
import { GrReddit } from "react-icons/gr";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdFacebook } from "react-icons/md";
import classes from "./socialIcons.module.css";
const SocialIconsFallback = () => {
  return (
    <div className={classes["container"]}>
      <p className={classes["share-text"]}>Share this event </p>

      <div className={classes["watch-video-share"]}>
        <div className={classes["wrapper"]}>
          <BsTwitter className={classes["twitter-icon"]} />

          <span className={classes["tooltip"]}>Share on Twitter</span>
        </div>
        <div className={classes["wrapper"]}>
          <MdFacebook className={classes["facebook-icon"]} />

          <span className={classes["tooltip"]}>Share on Facebook</span>
        </div>
        <div className={classes["wrapper"]}>
          <IoLogoWhatsapp className={classes["whatsapp-icon"]} />

          <span className={classes["tooltip"]}>Share on Whatsapp</span>
        </div>
        <div className={classes["reddit"]}>
          <GrReddit className={classes["reddit-icon"]} />

          <span className={classes["tooltip"]}>Share on Reddit</span>
        </div>
        <div className={classes["wrapper"]}>
          <FaTelegramPlane className={classes["telegram-icon"]} />

          <span className={classes["tooltip"]}>Share on Telegram</span>
        </div>
        <div className={classes["wrapper"]}>
          <FaShareAlt
            className={classes["share-icon"]}
          />
          <span className={classes["tooltip"]}>Other Websites</span>
        </div>

        <span
          className={classes["watch-video-share-text"]}
        >
          Report Link
        </span>
      </div>
    </div>
  );
};

export default SocialIconsFallback;
