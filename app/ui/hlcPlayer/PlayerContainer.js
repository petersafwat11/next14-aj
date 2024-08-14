"use client";
import React from "react";
import VideoJS from "./Player";
import classes from "./playerContainer.module.css";
const PlayerContainer = ({ videoRef, url }) => {
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    preload: "none",
    fluid: true,
    sources: [
      {
        src: url,
        type: "application/x-mpegURL",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;
    player.setAttribute("playsinline", "");
    player.setAttribute("webkit-playsinline", "true");

    // You can handle player events here, for example:
    player.on("waiting", () => {
      console.log("player is waiting");
    });

    player.on("dispose", () => {
      console.log("player will dispose");
    });
  };

  return (
    <VideoJS
      options={videoJsOptions}
      onReady={handlePlayerReady}
      playerRef={videoRef}
    />
  );
};

export default PlayerContainer;
