"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import classes from "./mobile-menu.module.css";
import Beta from "../beta/Beta";
export const MenuMobile = () => {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div>
      <div className={classes["menu-mobile"]}>
        {!showMenu ? (
          <Image
            onClick={() => {
              setShowMenu(!showMenu);
            }}
            className={classes["menu-mobile-icon"]}
            src="/svg/layout/header/menu-icon.svg"
            alt="menu"
            width="28"
            height="15"
          />
        ) : (
          <Image
            onClick={() => {
              setShowMenu(!showMenu);
            }}
            className={classes["exit"]}
            src="/svg/layout/mobile-menu/exit.svg"
            alt="donate"
            width="17"
            height="17"
          />
        )}

        <Image
          className={classes["menu-mobile-logo"]}
          src="/svg/layout/header/logo-mobile.svg"
          alt="logo"
          width="76"
          height="59"
        />
        <Beta className={classes["beta"]} />
      </div>
      {showMenu && (
        <div className={classes["side-menu"]}>
          {/* <div className={classes["user-details"]}>
            <Image
              className={classes["user-icon"]}
              src="/svg/default-user-icon.svg"
              alt="user icon"
              width="51"
              height="40"
            />
            <div className={classes["settings-icon-wrapper"]}>
              <Image
                className={classes["settings-icon"]}
                src="/svg/layout/header/world.svg"
                alt="settings"
                width="21"
                height="21"
              />
            </div>
          </div> */}
          {/* <div className={classes["menu-mobile-lang"]}>
            <p className={classes["arabic"]}>العربية</p>
            <p className={classes["menu-mobile-lang-english"]}>English </p>
            <p>Español</p>
          </div> */}
          <div className={classes["menu-mobile-pages-links"]}>
            <div>
              <p
                onClick={() => {
                  router.push("/");
                  setShowMenu(!showMenu);
                }}
                className={
                  pathname === "/" || pathname.startsWith("/watch")
                    ? classes["menu-mobile-page-link-active"]
                    : classes["menu-mobile-page-link"]
                }
              >
                SPORTS{" "}
              </p>
              <span className={classes["devider"]}> </span>
            </div>

            <div>
              <p
                onClick={() => {
                  router.push("/channels");
                  setShowMenu(!showMenu);
                }}
                className={
                  pathname.includes("channels")
                    ? classes["menu-mobile-page-link-active"]
                    : classes["menu-mobile-page-link"]
                }
              >
                CHANNELS
              </p>
              <span className={classes["devider"]}> </span>
            </div>
            <div>
              <p
                onClick={() => {
                  router.push("/statistics");
                  setShowMenu(!showMenu);
                }}
                className={
                  pathname === "/statistics"
                    ? classes["menu-mobile-page-link-active"]
                    : classes["menu-mobile-page-link"]
                }
              >
                STATISTICS
              </p>
              <span className={classes["devider"]}> </span>
            </div>
            <div>
              <p
                onClick={() => {
                  router.push("/news");
                  setShowMenu(!showMenu);
                }}
                className={
                  pathname === "/news" || pathname.includes("newsArticle")
                    ? classes["menu-mobile-page-link-active"]
                    : classes["menu-mobile-page-link"]
                }
              >
                NEWS
              </p>

              <span className={classes["devider"]}> </span>
            </div>
            <div>
              <p
                onClick={() => {
                  router.push("/contact");
                  setShowMenu(!showMenu);
                }}
                className={
                  pathname === "/contact"
                    ? classes["menu-mobile-page-link-active"]
                    : classes["menu-mobile-page-link"]
                }
              >
                CONTACT
              </p>
            </div>
            <span className={classes["devider"]}> </span>
            <div>
              <p
                onClick={() => {
                  router.push("/pricing");
                  setShowMenu(!showMenu);
                }}
                className={classes["menu-mobile-page-link"]}
              >
                PRICING
              </p>
            </div>
          </div>
          <div className={classes["contact-us"]}>
            <div className={classes["buttons"]}>
              <button
                onClick={() => {
                  router.push("/donate");
                  setShowMenu(!showMenu);
                }}
                className={classes["donate-button"]}
              >
                <Image
                  className={classes["donate-icon"]}
                  src="/svg/layout/mobile-menu/donate.svg"
                  alt="donate"
                  width="22"
                  height="22"
                />

                {pathname.includes("giveaway") && (
                  <span className={classes["buttons-active"]}></span>
                )}
              </button>
              <button
                onClick={() => {
                  router.push("/give-away");
                }}
                className={classes["giveaway-button"]}
              >
                <Image
                  className={classes["giveaway-icon"]}
                  src="/svg/layout/mobile-menu/giveaway.svg"
                  alt="giveaway"
                  width="19"
                  height="19"
                />
                {pathname.includes("donate") && (
                  <span className={classes["buttons-active"]}></span>
                )}
              </button>
            </div>
          </div>
          <div className={classes["social"]}>
            <div className={classes["social-element"]}>
              <Image
                src="/svg/layout/social-icons/twitter.svg"
                alt="twitter-icon"
                width="19"
                height="16"
              />
            </div>
            <div className={classes["social-element"]}>
              <Image
                src="/svg/layout/social-icons/facebook.svg"
                alt="facebook-icon"
                width="19"
                height="19"
              />
            </div>
            <div className={classes["social-element"]}>
              <Image
                src="/svg/layout/social-icons/social.svg"
                alt="social-icon"
                width="19"
                height="19"
              />
            </div>
            <div className={classes["social-element"]}>
              <Image
                src="/svg/layout/social-icons/insta.svg"
                alt="insta-icon"
                width="20"
                height="19"
              />
            </div>
            <div className={classes["social-element"]}>
              <Image
                src="/svg/layout/social-icons/ticktok.svg"
                alt="tiktok-icon"
                width="20"
                height="20"
              />
            </div>
            <div className={classes["social-element"]}>
              <Image
                src="/svg/layout/social-icons/telegram.svg"
                alt="telegram-icon"
                width="19"
                height="19"
              />
            </div>
          </div>
          <div className={classes["different-leagues"]}>
            <div className={classes["league"]}>
              <Image
                className={classes["league-image"]}
                src="/svg/layout/mobile-menu/1.svg"
                alt="leageu"
                width="32"
                height="36"
              />
              <p> World Cup</p>
            </div>
            <div className={classes["league"]}>
              <Image
                className={classes["league-image"]}
                src="/svg/layout/mobile-menu/2.svg"
                alt="leageu"
                width="32"
                height="34"
              />
              <p> UEFA Nations League</p>
            </div>
            <div className={classes["league"]}>
              <Image
                className={classes["league-image"]}
                src="/svg/layout/mobile-menu/3.svg"
                alt="leageu"
                width="32"
                height="33"
              />
              <p> Champions League</p>
            </div>
            <div className={classes["league"]}>
              <Image
                className={classes["league-image"]}
                src="/svg/layout/mobile-menu/4.svg"
                alt="leageu"
                width="32"
                height="32"
              />
              <p>Premier League</p>
            </div>
            <div className={classes["league"]}>
              <Image
                className={classes["league-image"]}
                src="/svg/layout/mobile-menu/5.svg"
                alt="leageu"
                width="32"
                height="34"
              />
              <p>Europa League</p>
            </div>
            <div className={classes["league"]}>
              <Image
                className={classes["league-image"]}
                src="/svg/layout/mobile-menu/6.svg"
                alt="leageu"
                width="32"
                height="33"
              />
              <p>La Liga</p>
            </div>
            <div className={classes["league"]}>
              <Image
                className={classes["league-image"]}
                src="/svg/layout/mobile-menu/7.svg"
                alt="leageu"
                width="32"
                height="31"
              />
              <p>Bundesliga</p>
            </div>
            <div className={classes["league"]}>
              <Image
                className={classes["league-image"]}
                src="/svg/layout/mobile-menu/8.svg"
                alt="leageu"
                width="35"
                height="35"
              />
              <p>Ligue 1 </p>
            </div>
            <div className={classes["league"]}>
              <Image
                className={classes["league-image"]}
                src="/svg/layout/mobile-menu/9.svg"
                alt="leageu"
                width="32"
                height="35"
              />
              <p>Serie A </p>
            </div>{" "}
          </div>
        </div>
      )}
    </div>
  );
};
