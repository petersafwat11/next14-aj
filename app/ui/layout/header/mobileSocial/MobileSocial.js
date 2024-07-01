"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import classes from "./mobileSocial.module.css";
import axios from "axios";
const MobileSocial = () => {
  const [social, setSocail] = useState([
    { twitter: "/" },
    { telegram: "/" },
    { discord: "/" },
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
    <div className={classes["social"]}>
      <div className={classes["social-element"]}>
        <a href={social?.twitter} target="_blank">
          <Image
            src="/svg/layout/social-icons/twitter.svg"
            alt="twitter-icon"
            width="19"
            height="16"
          />
        </a>
      </div>
      <div className={classes["social-element"]}>
        <a href={social?.discord} target="_blank">
          <Image
            src="/svg/layout/social-icons/social.svg"
            alt="social-icon"
            width="19"
            height="19"
          />
        </a>
      </div>
      <div className={classes["social-element"]}>
        <a href={social?.telegram} target="_blank">
          <Image
            src="/svg/layout/social-icons/telegram.svg"
            alt="telegram-icon"
            width="19"
            height="19"
          />
        </a>
      </div>
    </div>
  );
};

export default MobileSocial;
