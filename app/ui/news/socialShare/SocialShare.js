"use client";
import React, { useState } from "react";
import { BsTwitter } from "react-icons/bs";
import { FaShareAlt, FaTelegramPlane } from "react-icons/fa";
import { GrReddit } from "react-icons/gr";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdFacebook } from "react-icons/md";
import {
  FacebookShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
// import { TbBrandDiscord } from "react-icons/tb";
import classes from "./socialShare.module.css";
const SocialShare = ({ shareUrl, quote }) => {
  const [showShareLinks, setShowShareLinks] = useState(false);

  const toggleShareLinks = () => {
    setShowShareLinks(!showShareLinks);
  };

  return (
    <div className={classes["watch-video-share"]}>
      <div className={classes["wrapper"]}>
        <TwitterShareButton
          className={classes["button-share"]}
          url={shareUrl}
          title={quote}
        >
          <BsTwitter className={classes["twitter-icon"]} />
        </TwitterShareButton>

        <span className={classes["tooltip"]}>Share on Twitter</span>
      </div>
      <div className={classes["wrapper"]}>
        <FacebookShareButton
          className={classes["button-share"]}
          url={shareUrl}
          quote={quote}
          title={quote}
        >
          <MdFacebook className={classes["facebook-icon"]} />
        </FacebookShareButton>

        <span className={classes["tooltip"]}>Share on Facebook</span>
      </div>
      <div className={classes["wrapper"]}>
        <WhatsappShareButton
          className={classes["button-share"]}
          url={shareUrl}
          title={quote}
        >
          <IoLogoWhatsapp className={classes["whatsapp-icon"]} />
        </WhatsappShareButton>

        <span className={classes["tooltip"]}>Share on Whatsapp</span>
      </div>
      <div className={classes["reddit"]}>
        <RedditShareButton
          className={classes["button-share"]}
          url={shareUrl}
          title={quote}
        >
          <GrReddit className={classes["reddit-icon"]} />
        </RedditShareButton>

        <span className={classes["tooltip"]}>Share on Reddit</span>
      </div>
      <div className={classes["wrapper"]}>
        <TelegramShareButton
          className={classes["button-share"]}
          url={shareUrl}
          title={quote}
        >
          <FaTelegramPlane className={classes["telegram-icon"]} />
        </TelegramShareButton>

        <span className={classes["tooltip"]}>Share on Telegram</span>
      </div>
      <div className={classes["wrapper"]}>
        <FaShareAlt
          onClick={toggleShareLinks}
          className={classes["share-icon"]}
        />
        <span className={classes["tooltip"]}>Other Websites</span>
      </div>
    </div>
  );
};

export default SocialShare;
