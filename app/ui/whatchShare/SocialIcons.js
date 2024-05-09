"use client";
import React, { useEffect, useState } from "react";
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
import classes from "./socialIcons.module.css";
import Popup from "../popupWrapper/Popup";
import ShareLinks from "../shareLinks/ShareLinks";
import Report from "../report/Report";
import { handleMakingReport } from "@/app/lib/reportFunction";
import ThanksMessage from "../thanksMessage/ThanksMessage";
import { usePathname } from "next/navigation";
const SocialIcons = ({ reportData }) => {
  const pathname = usePathname();
  const shareUrl = `${process.env.FRONTEND_SERVER}${pathname}`;
  const quote = "Check out this awesome content!";

  const [showShareLinks, setShowShareLinks] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showThanksMessage, setShowThanksMessage] = useState(false);

  const toggleShareLinks = () => {
    setShowShareLinks(!showShareLinks);
  };
  const toggleReport = () => {
    setShowReport(!showReport);
  };
  const toggleThanksMessage = () => {
    setShowThanksMessage(!showThanksMessage);
  };

  const sendReport = async (val) => {
    const data = {
      ...reportData,
      reason: val,
      eventLink: shareUrl,
    };

    await handleMakingReport(data, toggleReport, toggleThanksMessage);
  };
  return (
    <div className={classes["container"]}>
      <p className={classes["share-text"]}>Share this event </p>

      <div className={classes["watch-video-share"]}>
        {showThanksMessage && (
          <Popup>
            <ThanksMessage
              showThanksMessage={showThanksMessage}
              setShowThanksMessage={setShowThanksMessage}
            />
          </Popup>
        )}

        {showReport && (
          <Popup>
            <Report
              handleMakingReport={sendReport}
              toggleReport={toggleReport}
            />
          </Popup>
        )}

        {showShareLinks && (
          <Popup>
            <ShareLinks
              shareUrl={shareUrl}
              quote={quote}
              toggleShareLinks={toggleShareLinks}
            />
          </Popup>
        )}
        <div className={classes["wrapper"]}>
          <TwitterShareButton url={shareUrl} title={quote}>
            <BsTwitter className={classes["twitter-icon"]} />
          </TwitterShareButton>

          <span className={classes["tooltip"]}>Share on Twitter</span>
        </div>
        <div className={classes["wrapper"]}>
          <FacebookShareButton url={shareUrl} quote={quote} title={quote}>
            <MdFacebook className={classes["facebook-icon"]} />
          </FacebookShareButton>

          <span className={classes["tooltip"]}>Share on Facebook</span>
        </div>
        <div className={classes["wrapper"]}>
          <WhatsappShareButton url={shareUrl} title={quote}>
            <IoLogoWhatsapp className={classes["whatsapp-icon"]} />
          </WhatsappShareButton>

          <span className={classes["tooltip"]}>Share on Whatsapp</span>
        </div>
        <div className={classes["reddit"]}>
          <RedditShareButton url={shareUrl} title={quote}>
            <GrReddit className={classes["reddit-icon"]} />
          </RedditShareButton>

          <span className={classes["tooltip"]}>Share on Reddit</span>
        </div>
        <div className={classes["wrapper"]}>
          <TelegramShareButton url={shareUrl} title={quote}>
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

        <span
          onClick={toggleReport}
          className={classes["watch-video-share-text"]}
        >
          Report Link
        </span>
      </div>
    </div>
  );
};

export default SocialIcons;
