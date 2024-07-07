"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import classes from "./footer.module.css";
import Social from "./social/Social";
import SocailDesktop from "./socialDesktop/SocailDesktop";
const Footer = () => {
  const router = useRouter();
  return (
    <footer className={classes["footer"]}>
      <div className={classes["container"]}>
        <div className={classes["footer-container"]}>
          <div className={classes["footer-container-image"]}>
            <Image
              src="/svg/layout/footer/logo.svg"
              alt="logo"
              width={170}
              height={126}
            />
            {/* <div className={classes["footer-social"]}>
              <div className={classes["footer-social-element"]}>
                <Image
                  src="/svg/layout/social-icons/twitter.svg"
                  alt="twitter-icon"
                  width="24"
                  height="20"
                />
              </div>
              <div className={classes["footer-social-element"]}>
                <Image
                  src="/svg/layout/social-icons/facebook.svg"
                  alt="facebook-icon"
                  width="24"
                  height="24"
                />
              </div>
              <div className={classes["footer-social-element"]}>
                <Image
                  src="/svg/layout/social-icons/social.svg"
                  alt="social-icon"
                  width="24"
                  height="20"
                />
              </div>
              <div className={classes["footer-social-element"]}>
                <Image
                  src="/svg/layout/social-icons/insta.svg"
                  alt="insta-icon"
                  width="24"
                  height="24"
                />
              </div>
              <div className={classes["footer-social-element"]}>
                <Image
                  src="/svg/layout/social-icons/ticktok.svg"
                  alt="tiktok-icon"
                  width="24"
                  height="24"
                />
              </div>
              <div className={classes["footer-social-element"]}>
                <Image
                  src="/svg/layout/social-icons/telegram.svg"
                  alt="telegram-icon"
                  width="24"
                  height="24"
                />
              </div>
            </div> */}
            <SocailDesktop />
          </div>
          <div className={classes["footer-container-disclaimer"]}>
            <h3>Disclaimer</h3>
            <p>
              AJ Sports merely links/embeds content uploaded to popular media
              hosting websites such Vimeo.com, Dailymotion.com, Youtube.com,
              twitch.tv, reddit.com, etc. AJSports does not host any audiovisual
              content itself and has no ability to modify such content. We thus
              cannot accept any liability for the content transmitted by others
              as we are not affiliated nor endorsed by the external content. All
              content is copyright of their respective owners.
            </p>
            <p className={classes["contact-email"]}>Email: info@ajsports.ch</p>
            <div className={classes["footer-actions-mobile"]}>
              <button className={classes["protected-button"]}>PROTECTED</button>
              <button className={classes["dmca-button"]}>DMCA</button>
            </div>
          </div>
          <div className={classes["footer-container-second"]}>
            <div className={classes["footer-container-links"]}>
              <h4 className={classes["footer-container-links-heading"]}>
                Quick Menus
              </h4>
              <ul
                style={{ listStyle: "none" }}
                className={classes["footer-container-links-list"]}
              >
                <li
                  onClick={() => {
                    router.push("/");
                  }}
                  className={classes["footer-container-links-list-item"]}
                >
                  About Us
                </li>
                <li
                  onClick={() => {
                    router.push("/contact-us");
                  }}
                  className={classes["footer-container-links-list-item"]}
                >
                  Contact Us
                </li>
                <li
                  onClick={() => {
                    router.push("/donate");
                  }}
                  className={classes["footer-container-links-list-item"]}
                >
                  Donate
                </li>
                <li
                  onClick={() => {
                    router.push("/give-away");
                  }}
                  className={classes["footer-container-links-list-item"]}
                >
                  Giveaways
                </li>
              </ul>
            </div>
            <div className={classes["footer-container-links"]}>
              <h4
                onClick={() => {
                  router.push("/");
                }}
                className={classes["footer-container-links-heading"]}
              >
                Statistics
              </h4>
              <ul
                style={{ listStyle: "none" }}
                className={classes["footer-container-links-list"]}
              >
                <li className={classes["footer-container-links-list-item"]}>
                  Premier League
                </li>
                <li className={classes["footer-container-links-list-item"]}>
                  Champions League
                </li>
                <li className={classes["footer-container-links-list-item"]}>
                  Ligue 1
                </li>
                <li className={classes["footer-container-links-list-item"]}>
                  La Liga
                </li>
              </ul>
            </div>
            <div className={classes["footer-container-links"]}>
              <h4
                onClick={() => {
                  router.push("/");
                }}
                className={classes["footer-container-links-heading"]}
              >
                Sports
              </h4>
              <nav className={classes["footer-container-links-list"]}>
                <li className={classes["footer-container-links-list-item"]}>
                  NFL
                </li>
                <li className={classes["footer-container-links-list-item"]}>
                  Basketball
                </li>
                <li className={classes["footer-container-links-list-item"]}>
                  Football
                </li>
                <li className={classes["footer-container-links-list-item"]}>
                  Boxing
                </li>
              </nav>
            </div>
          </div>
        </div>

        <div className={classes["footer-bottom"]}>
          <div className={classes["footer-actions"]}>
            <p className={classes["protected-button"]}>PROTECTED</p>
            <p
              onClick={() => {
                router.push("/DMCA");
              }}
              className={classes["dmca-button"]}
            >
              DMCA
            </p>
          </div>

          <div className={classes["copy-write"]}>
            <div className={classes["mobile-news-letter"]}>
              <input
                className={classes["mobile-news-letter-input"]}
                type="text"
                placeholder=" Enter email for newsletter"
              />
              <button className={classes["mobile-news-letter-button"]}>
                Subscribe
              </button>
            </div>
            <p className={classes["copy-write-para"]}>
              &#169; 2023 AJ Sports, Inc. All rights reserved
            </p>
            <div className={classes["copy-write-links"]}>
              <p
                onClick={() => {
                  router.push("DMCA");
                }}
              >
                DMCA
              </p>
              <span>-</span>
              <p
                onClick={() => {
                  router.push("privacy-policy");
                }}
              >
                Privacy Policy
              </p>
              <span>-</span>
              <p
                onClick={() => {
                  router.push("FAQ");
                }}
              >
                F.A.Q
              </p>
            </div>
            {/* <div className={classes["copy-write-social"]}>
              <Image
                src="/svg/layout/footer/facebook.svg"
                alt="facebook"
                width="18"
                height="18"
              />
              <Image
                src="/svg/layout/footer/twitter.svg"
                alt="facebook"
                width="18"
                height="18"
              />
              <Image
                src="/svg/layout/footer/insta.svg"
                alt="insta"
                width="18"
                height="18"
              />
              <Image
                src="/svg/layout/footer/telegram.svg"
                alt="telegram"
                width="18"
                height="18"
              />
            </div> */}
            <Social />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
