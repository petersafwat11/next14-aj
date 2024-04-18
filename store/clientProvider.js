"use client";
import React, { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";
import styles from "./clientProvider.module.css";
import SessionLayout from "./SessionLayout";
export default function Provider({ children, session }) {
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
    <>
      {showScrollTopIcon && (
        <Image
          onClick={scrollToTopPage}
          className={styles["scroll-top"]}
          src="/svg/layout/scroll-top.svg"
          alt="scroll-top"
          width="30"
          height="30"
        />
      )}

      <SessionLayout>{children}</SessionLayout>
    </>
  );
}
