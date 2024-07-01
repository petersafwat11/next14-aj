"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import classes from "./socail.module.css";
import { FaDiscord, FaTelegramPlane } from "react-icons/fa";
import { TfiTwitterAlt } from "react-icons/tfi";
import axios from "axios";
const Social = () => {
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
    // <div className={classes["copy-write-social"]}>
    //   <Image
    //     src="/svg/layout/footer/facebook.svg"
    //     alt="facebook"
    //     width="18"
    //     height="18"
    //   />
    //   <Image
    //     src="/svg/layout/footer/twitter.svg"
    //     alt="facebook"
    //     width="18"
    //     height="18"
    //   />
    //   <Image
    //     src="/svg/layout/footer/insta.svg"
    //     alt="insta"
    //     width="18"
    //     height="18"
    //   />
    //   <Image
    //     src="/svg/layout/footer/telegram.svg"
    //     alt="telegram"
    //     width="18"
    //     height="18"
    //   />
    // </div>
    <div className={classes["icons"]}>
      <a
        rel="noreferrer"
        target="_blank"
        className={classes["link"]}
        href={social?.discord}
      >
        <FaDiscord />
      </a>
      <a
        rel="noreferrer"
        target="_blank"
        className={classes["link"]}
        href={social?.twitter}
      >
        <TfiTwitterAlt />
      </a>
      <a
        rel="noreferrer"
        target="_blank"
        className={classes["link"]}
        href={social?.telegram}
      >
        <FaTelegramPlane />
      </a>
    </div>
  );
};

export default Social;
