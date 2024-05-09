import React from "react";
import classes from "./socialShare.module.css";
import { BsTwitter } from "react-icons/bs";
import { MdFacebook } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import { GrReddit } from "react-icons/gr";
import { FaShareAlt, FaTelegramPlane } from "react-icons/fa";
const Loading = () => {
  return (
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
        <FaShareAlt className={classes["share-icon"]} />
        <span className={classes["tooltip"]}>Other Websites</span>
      </div>
    </div>
  );
};

export default Loading;
