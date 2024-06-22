"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./discordIcon.module.css";
import axios from "axios";
const DiscordIcon = () => {
  const [discordLink, setDiscordLink] = useState("/");
  useEffect(() => {
    const getLink = async () => {
      const links = await axios.get(`${process.env.BACKEND_SERVER}/links`);
      const discordLink = links?.data?.data?.data
        ? links?.data?.data?.data[0]?.social?.discord
        : "/";
      setDiscordLink(discordLink);
    };
    getLink();
  }, []);
  return (
    <a
      href={discordLink}
      target={"_blank"}
      className={styles["telegram-link"]}
      rel="noreferrer"
    >
      <Image
        className={styles["telegram-icon"]}
        src="/svg/discord-floating.svg"
        alt="telegram-channel"
        width="54"
        height="54"
      />
    </a>
  );
};

export default DiscordIcon;
