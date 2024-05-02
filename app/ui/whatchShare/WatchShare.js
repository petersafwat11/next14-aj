"use client";
import dynamic from "next/dynamic";
import React from "react";
const SocialIcons = dynamic(() => import("./SocialIcons"), {
  ssr: false,
});

const WatchShare = ({ reportData }) => {
  return <SocialIcons reportData={reportData} />;
};

export default WatchShare;
