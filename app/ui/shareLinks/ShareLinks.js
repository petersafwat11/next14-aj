"use client";
import React from "react";
import { BsLine } from "react-icons/bs";
import { FaPinterestP, FaRegCopy } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { SiOdnoklassniki, SiWorkplace } from "react-icons/si";
import { SlSocialVkontakte } from "react-icons/sl";
import {
  EmailShareButton,
  LineShareButton,
  OKShareButton,
  PinterestShareButton,
  VKShareButton,
  WorkplaceShareButton,
} from "react-share";
import classes from "./shareLinks.module.css";

const ShareLinks = ({ toggleShareLinks, shareUrl, quote }) => {

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      // notify
    } catch (error) {

      console.error("Failed to copy text: ", error);
    }
  };

  return (
    <div className={classes["share-links"]}>
      <div className={classes["share-links-top"]}>
        <h3 className={classes["share-links-title"]}>Share a link</h3>
        <RxCross1 onClick={toggleShareLinks} className={classes["exit"]} />
      </div>
      <div className={classes["share-links-body"]}>
        <div
          // ref={manipaletePosition}
          className={classes["share-links-websites"]}
        >
          <div className={classes["share-links-website"]}>
            <PinterestShareButton
              url={shareUrl}
              media={"https://example.com/image.jpg"}
              description={quote}
            >
              <div className={classes["share-links-website-logo"]}>
                <div className={classes["pinterest"]}>
                  <FaPinterestP className={classes["pinterest-icon"]} />
                </div>
              </div>
            </PinterestShareButton>

            <p>Pinterest</p>
          </div>
          <div className={classes["share-links-website"]}>
            <EmailShareButton
              url={shareUrl}
              subject={"Check out this awesome content!"}
              body={
                "Hi,\n\nI wanted to share this awesome content with you:\n\n" +
                shareUrl
              }
            >
              <div className={classes["share-links-website-logo"]}>
                <MdEmail className={classes["email-icon"]} />
              </div>
            </EmailShareButton>

            <p>Email</p>
          </div>

          <div className={classes["share-links-website"]}>
            <LineShareButton url={shareUrl} title={quote}>
              <div className={classes["share-links-website-logo"]}>
                <BsLine className={classes["skype-icon"]} />
              </div>
            </LineShareButton>

            {/* LinkedinShareButton.js */}
            <p>Line</p>
          </div>
          <div className={classes["share-links-website"]}>
            <VKShareButton url={shareUrl} title={quote}>
              <div className={classes["share-links-website-logo"]}>
                <SlSocialVkontakte className={classes["skype-icon"]} />
              </div>
            </VKShareButton>
            {/* LinkedinShareButton.js */}
            <p>VK</p>
          </div>
          <div className={classes["share-links-website"]}>
            <OKShareButton url={shareUrl} title={quote}>
              <div className={classes["share-links-website-logo"]}>
                <SiOdnoklassniki className={classes["skype-icon"]} />
              </div>
            </OKShareButton>
            <p>OK</p>
          </div>
          <div className={classes["share-links-website"]}>
            <WorkplaceShareButton url={shareUrl}>
              <div className={classes["share-links-website-logo"]}>
                <SiWorkplace className={classes["skype-icon"]} />
              </div>
            </WorkplaceShareButton>
            <p>Workplace</p>
          </div>
        </div>
      </div>
      <div className={classes["share-links-bottom"]}>
        {shareUrl}
        <FaRegCopy onClick={handleCopy} className={classes["copy-icon"]} />
        {/* <div className={classes["share-links-copy"]}>
          <Image
            src="/svg/share-links/copy.svg"
            alt="copy"
            width="21"
            height="21"
          />
        </div> */}
      </div>
    </div>
  );
};

export default ShareLinks;
