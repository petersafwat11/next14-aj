"use client";
import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import classes from "./playerContainer.module.css";
export const VideoJS = ({ options, onReady, playerRef }) => {
  const divRef = React.useRef(null);
  // const playerRef = React.useRef(null);
  // const { options, onReady,playerRef } = props;
  React.useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");

      videoElement.setAttribute("playsinline", "");
      videoElement.setAttribute("webkit-playsinline", "true");
      divRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        player.setAttribute("playsinline", "");
        player.setAttribute("webkit-playsinline", "true");

        onReady && onReady(player);
      }));

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, playerRef, divRef, onReady]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div className={classes["videojs"]} data-vjs-player>
      <div className={classes["videojs-2"]} ref={divRef} />
    </div>
  );
};

export default VideoJS;
