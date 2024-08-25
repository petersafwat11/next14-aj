"use client";
import React from "react";
import VideoJS from "./Player";
import classes from "./playerContainer.module.css";
import videojs from "video.js";
import P2pEngineVHS from "@swarmcloud/vhs";

const PlayerContainer = ({ videoRef, url }) => {
  const playerRef = React.useRef(null);
  let engine;

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    preload: "none",
    fluid: true,
    html5: {
      vhs: {
        overrideNative: true,
      },
    },
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

    playerRef.current = player;

    player.on("xhr-hooks-ready", () => {
      if (engine) {
        engine.destroy();
      }
      engine = new P2pEngineVHS(
        player,
        {
          // trackerZone: 'hk',    // Uncomment if using a specific tracker zone
          // trackerZone: 'us',    // Uncomment if using a specific tracker zone
          // token: YOUR_TOKEN     // Replace with your actual token if required
        },
        videojs
      );
    });

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
