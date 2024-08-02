"use client";
import React, { useEffect, useState } from "react";
import classes from "./social.module.css";
import Image from "next/image";
import axios from "axios";
const ChannelsSocail = () => {
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
            width="20"
            height="16"
          />
        </a>
      </div>
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
            width="20"
            height="16"
          />
        </a>
      </div>
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
            width="20"
            height="20"
          />
        </a>
      </div>
    </div>
  );
};

export default ChannelsSocail;
