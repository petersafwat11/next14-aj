"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { SendMessageButton } from "../sendMessage/SendMessage";
import Image from "next/image";
const DiscordIcon = dynamic(() => import("../discordIcon/DiscordIcon"), {
  ssr: false,
});
import styles from "./icons.module.css";
const Icons = () => {
  const [showScrollTopIcon, setShowScrollTopIcon] = useState(false);
  const updateDimensions = () => {
    if (window.scrollY > 350) {
      setShowScrollTopIcon(true);
    } else {
      setShowScrollTopIcon(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  const scrollToTopPage = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <SendMessageButton />
      <DiscordIcon />
      {showScrollTopIcon && (
        <Image
          onClick={scrollToTopPage}
          className={styles["scroll-top"]}
          src="/svg/layout/scroll-top.svg"
          alt="scroll-top"
          width="24"
          height="24"
        />
      )}
    </div>
  );
};

export default Icons;
