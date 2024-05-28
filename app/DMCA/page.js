import Image from "next/image";
import React from "react";
import classes from "./page..module.css";
import PageTitle from "../ui/pageTitle/PageTitle";
export const metadata = {
  title: "DMCA | AJ Sports",
};

const Page = () => {

  return (
    <section className={classes["page"]}>
      <PageTitle title={"DMCA"} />

      <div className={classes["container"]}>
        <div className={classes["disclaimer"]}>
          <h3 className={classes["disclaimer-heading"]}>Disclaimer</h3>
          <div className={classes["disclaimer-para"]}>
            <p>
              AJ Sports merely links/embeds content uploaded to popular media
              hosting websites such Vimeo.com, Dailymotion.com, Youtube.com,
              twitch.tv, reddit.com, etc. AJSports does not host any audiovisual
              content itself and has no ability to modify such content. We thus
              cannot accept any liability for the content transmitted by others
              as we are not affiliated nor endorsed by the external content. All
              content is copyright of their respective owners.
            </p>
            <p>
              If you find any copyrighted content, we ask that you kindly
              contact us on our email, info@ajsports.ch , we will remove it
              immediately.
            </p>
          </div>
        </div>
        <div className={classes["second-part"]}>
          <div className={classes["companies-logoes"]}>
            <div className={classes["icon-wrapper"]}>
              <Image
                className={classes["netflix-icon"]}
                src="/svg/DMCA/netflix.svg"
                alt="netflix"
                width="130"
                height="36"
              />
            </div>
            <div className={classes["icon-wrapper"]}>
              <Image
                className={classes["vimeo-icon"]}
                src="/svg/DMCA/vimeo.svg"
                alt="vimeo"
                width="100"
                height="29"
              />
            </div>
            <div className={classes["icon-wrapper"]}>
              <Image
                className={classes["dailymotion-icon"]}
                src="/svg/DMCA/dailymotion.svg"
                alt="dailymotion"
                width="181"
                height="33"
              />
            </div>
            <div className={classes["icon-wrapper"]}>
              <Image
                className={classes["google-icon"]}
                src="/svg/DMCA/google.svg"
                alt="google"
                width="125"
                height="40"
              />
            </div>
            <div className={classes["icon-wrapper"]}>
              <Image
                className={classes["twitch-icon"]}
                src="/svg/DMCA/twitch.svg"
                alt="twitch"
                width="93"
                height="30"
              />
            </div>
            <div className={classes["icon-wrapper"]}>
              <Image
                className={classes["youtube-icon"]}
                src="/svg/DMCA/youtube.svg"
                alt="youtube"
                width="144"
                height="32"
              />
            </div>
          </div>
          <div className={classes["companies-logoes-mobile"]}>
            <div className={classes["icon-wrapper"]}>
              <Image
                className={classes["netflix-icon"]}
                src="/svg/DMCA/netflix.svg"
                alt="netflix"
                width="114"
                height="30"
              />
            </div>
            <div className={classes["icon-wrapper"]}>
              <Image
                className={classes["vimeo-icon"]}
                src="/svg/DMCA/vimeo.svg"
                alt="vimeo"
                width="105"
                height="29"
              />
            </div>

            <div className={classes["icon-wrapper"]}>
              <Image
                className={classes["google-icon"]}
                src="/svg/DMCA/google.svg"
                alt="google"
                width="110"
                height="36"
              />
            </div>
            <div className={classes["icon-wrapper"]}>
              <Image
                className={classes["youtube-icon"]}
                src="/svg/DMCA/youtube.svg"
                alt="youtube"
                width="127"
                height="27"
              />
            </div>

            <div className={classes["icon-wrapper"]}>
              <Image
                className={classes["twitch-icon"]}
                src="/svg/DMCA/twitch.svg"
                alt="twitch"
                width="93"
                height="30"
              />
            </div>
            <div className={classes["icon-wrapper"]}>
              <Image
                className={classes["dailymotion-icon"]}
                src="/svg/DMCA/dailymotion.svg"
                alt="dailymotion"
                width="165"
                height="30"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
