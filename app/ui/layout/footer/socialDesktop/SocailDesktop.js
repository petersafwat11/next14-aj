"use client";
import React, { useEffect, useState } from "react";
import classes from "./socialDesktop.module.css";
import Image from "next/image";
import axios from "axios";
const SocailDesktop = () => {
  const [social, setSocail] = useState([
    { twitter: "/" },
    { telegram: "/" },
    { discord: "/" },
    { facebook: "/" },
    { instagram: "/" },
    {
      tiktok: "/",
    },
  ]);
  useEffect(() => {
    const getLinks = async () => {
      const links = await axios.get(`${process.env.BACKEND_SERVER}/links`);
      const social = links?.data?.data?.data
        ? links?.data?.data?.data[0]?.social
        : "/";
      setSocail(social);
    };
    getLinks();
  }, []);

  return (
    <div className={classes["footer-social"]}>
      <div className={classes["footer-social-element"]}>
        <a
          rel="noreferrer"
          target="_blank"
          className={classes["link"]}
          href={social?.twitter}
        >
          <Image
            src="/svg/layout/social-icons/twitter.svg"
            alt="twitter-icon"
            width="24"
            height="20"
          />
        </a>
      </div>
      {/* <div className={classes["footer-social-element"]}>
        <a
          rel="noreferrer"
          target="_blank"
          className={classes["link"]}
          href={social?.facebook}
        >
          <Image
            src="/svg/layout/social-icons/facebook.svg"
            alt="facebook-icon"
            width="24"
            height="24"
          />
        </a>
      </div> */}
      <div className={classes["footer-social-element"]}>
        <a
          rel="noreferrer"
          target="_blank"
          className={classes["link"]}
          href={social?.discord}
        >
          <Image
            src="/svg/layout/social-icons/social.svg"
            alt="social-icon"
            width="24"
            height="20"
          />
        </a>
      </div>
      {/* <div className={classes["footer-social-element"]}>
        <a
          rel="noreferrer"
          target="_blank"
          className={classes["link"]}
          href={social?.instagram}
        >
          <Image
            src="/svg/layout/social-icons/insta.svg"
            alt="insta-icon"
            width="24"
            height="24"
          />
        </a>
      </div> */}
      {/* <div className={classes["footer-social-element"]}>
        <a
          rel="noreferrer"
          target="_blank"
          className={classes["link"]}
          href={social?.tiktok}
        >
          <Image
            src="/svg/layout/social-icons/ticktok.svg"
            alt="tiktok-icon"
            width="24"
            height="24"
          />
        </a>
      </div> */}
      <div className={classes["footer-social-element"]}>
        <a
          rel="noreferrer"
          target="_blank"
          className={classes["link"]}
          href={social?.telegram}
        >
          <Image
            src="/svg/layout/social-icons/telegram.svg"
            alt="telegram-icon"
            width="24"
            height="24"
          />
        </a>
      </div>
    </div>
  );
};

export default SocailDesktop;
