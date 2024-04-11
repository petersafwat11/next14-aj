import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

import { TwitterShareButton } from "react-share";
import classes from "./stepTwo.module.css";
const StepTwo = ({ joinWebsiteGroup, allSocial, sendUserData }) => {
  const relatedLink =
    joinWebsiteGroup.text === "Telegram"
      ? allSocial?.telegram
      : allSocial?.twitter;
  console.log("related link", relatedLink, joinWebsiteGroup.text, allSocial);
  const pathname = usePathname();
  const shareUrl = `${process.env.FRONTEND_SERVER}${pathname}`;
  const quote = "Check out this awesome content!";

  return (
    <div className={classes["container"]}>
      <div className={classes["body"]}>
        {joinWebsiteGroup.text === "Telegram" ? (
          <div className={classes["telegram"]}>
            <Image
              className={classes["telegram-icon"]}
              src={"/svg/give-away/telegram-steps.svg"}
              alt="telegram"
              width="54"
              height="45"
            />
          </div>
        ) : joinWebsiteGroup.text === "Twitter" ? (
          <div className={classes["twitter"]}>
            <Image
              className={classes["telegram-icon"]}
              src={"/svg/give-away/twitter-steps.svg"}
              alt="twitter"
              width="66"
              height="53"
            />
          </div>
        ) : (
          <div className={classes["retweet"]}>
            <Image
              className={classes["retweet-icon"]}
              src={"/svg/give-away/retweet-steps.svg"}
              alt="twitter"
              width="66"
              height="66"
            />
          </div>
        )}

        <div className={classes["join"]}>
          {joinWebsiteGroup.text === "Retweet" ? (
            <TwitterShareButton url={shareUrl} title={quote}>
              <p
                className={classes["join-button"]}
                onClick={() => {
                  sendUserData(3);
                }}
              >
                {" "}
                Retweet
              </p>
            </TwitterShareButton>
          ) : (
            <a
              onClick={() => {
                sendUserData(3);
              }}
              href={relatedLink}
              target="_blank"
              className={classes["join-button"]}
              rel="noreferrer"
            >
              Join {joinWebsiteGroup.text}
            </a>
          )}

          <span className={classes["loading"]}>
            <span></span>
          </span>
        </div>
      </div>
      <div className={classes["bottom"]}>
        <p className={classes["message"]}>
          Please join the telegram group then refer back to here until it
          completes automatically.
        </p>
      </div>
    </div>
  );
};

export default StepTwo;
