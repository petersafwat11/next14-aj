import Hls from "hls.js";
import React, { useCallback, useEffect, useRef, useState } from "react";
import P2pEngineHls from "swarmcloud-hls";
import classes from "./hlcPlayer.module.css";

const HlcPlayer = ({ url, notRounded, videoRef }) => {
  const videoIConRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [hls, setHls] = useState(null);

  const playVideo = function () {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const handlePlaying = function () {
    setPlaying(!playing);
  };

  const handlePausing = function () {
    setPlaying(!playing);
  };

  const onError = useCallback(
    function (event, data) {
      if (data?.fatal) {
        switch (data?.type) {
          case Hls?.ErrorTypes?.NETWORK_ERROR:
            console.log("fatal network error encountered, try to recover");
            hls?.startLoad();
            break;
          case Hls?.ErrorTypes?.MEDIA_ERROR:
            console.log("fatal media error encountered, try to recover");
            hls?.recoverMediaError();
            break;
          default:
            console.log(
              "fatal error encountered, destroy instance and create a new one"
            );
            hls?.off(Hls?.Events?.ERROR, onError);
            hls?.destroy();
            setHls(null);
            break;
        }
      }
    },
    [hls]
  );

  useEffect(() => {
    const p2pConfig = {
      // Other p2pConfig options if applicable
    };

    if (url) {
      const hlsInstance =
        hls ||
        new Hls({
          maxBufferSize: 0,
          maxBufferLength: 30,
          liveSyncDurationCount: 10,
        });

      hlsInstance?.on(Hls?.Events?.ERROR, onError);

      p2pConfig.hlsjsInstance = hlsInstance;
      new P2pEngineHls(p2pConfig);
      hlsInstance?.loadSource(url);
      hlsInstance?.attachMedia(videoRef?.current);
      setHls(hlsInstance);
    } else if (videoRef?.current?.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = url;
    }

    setPlaying(false);

    return () => {
      if (hls) {
        hls.off(Hls?.Events?.ERROR, onError);
        hls.destroy();
      }
    };
  }, [url, videoRef, hls, onError]);

  return (
    <div className={classes["video-container"]}>
      <video
        controlsList="noplaybackrate"
        className={
          notRounded
            ? classes["video-play"]
            : playing
            ? classes["video-play"]
            : classes["video-pause"]
        }
        ref={videoRef}
        width={"100%"}
        height={"100%"}
        controls={true}
        autoPlay={false}
        onPlay={handlePlaying}
        onPause={handlePausing}
      ></video>
      {!playing && (
        <div
          onClick={() => {
            console.log("clicked");
            playVideo();
          }}
          ref={videoIConRef}
          className={classes["play-icon"]}
        ></div>
      )}
    </div>
  );
};

export default HlcPlayer;
