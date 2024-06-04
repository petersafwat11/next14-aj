"use client";
import Hls from "hls.js";
import React, { useCallback, useEffect, useRef, useState } from "react";
import P2pEngineHls from "swarmcloud-hls";
import classes from "./hlcPlayer.module.css";
import Contrrols from "./Contrrols";
import ChannelSettings from "./playerComponents/channel-settings/ChannelSettings";
import AboutLive from "./playerComponents/about/AboutLive";
import Shortcuts from "./playerComponents/shortcuts/Shortcuts";
import Qualites from "./playerComponents/qualities/Qualites";
const HlcPlayer = ({ url, notRounded, videoRef }) => {
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
  });
  const [mute, setMute] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [qualities, setQualities] = useState(false);
  const [aboutMenu, setAboutMenu] = useState(false);
  const [shortcutsMenu, setShortcutsMenu] = useState(false);
  const [workShortcuts, setWorkShortcuts] = useState(true);

  const containerRef = useRef(null);

  const showContextMenu = (event) => {
    event.preventDefault();
    const aboutMenu = document.getElementById("context");
    console.log(event.clientX);
    aboutMenu.style.left = event.clientX + "px";
    aboutMenu.style.top = event.clientY + "px";
    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
    });
  };

  const hideContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0 });
  };

  useEffect(() => {
    console.log(url);
    const p2pConfig = {
      // Other p2pConfig options if applicable
    };
    if (Hls.isSupported() && url) {
      const hls = new Hls({
        maxBufferSize: 0, // Highly recommended setting in live mode
        maxBufferLength: 25, // Highly recommended setting in live mode
        liveSyncDurationCount: 10, // Highly recommended setting in live mode
      });
      p2pConfig.hlsjsInstance = hls;
      new P2pEngineHls(p2pConfig);
      hls.loadSource(url);
      hls.attachMedia(videoRef.current);
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = url;
    }
    videoRef.current.setAttribute("playsinline", "");
    videoRef.current.setAttribute("webkit-playsinline", "");

    setIsPlaying(false);
  }, [url, videoRef]);

  useEffect(() => {
    document.addEventListener("click", hideContextMenu);

    return () => {
      document.removeEventListener("click", hideContextMenu);
    };
  }, []);

  const playVideo = useCallback(
    function () {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    },
    [videoRef]
  );
  useEffect(() => {
    function handleClickOnVideo(event) {
      if (videoRef.current && videoRef.current.contains(event.target)) {
        playVideo();
      }
    }

    document.addEventListener("mousedown", handleClickOnVideo);
    return () => {
      document.removeEventListener("mousedown", handleClickOnVideo);
    };
  }, [videoRef, playVideo]);
  const toggleFull = function () {
    if (containerRef.current.requestFullscreen) {
      containerRef.current.requestFullscreen();
    } else if (containerRef.current.webkitRequestFullscreen) {
      containerRef.current.webkitRequestFullscreen();
    } else if (containerRef.current.msRequestFullscreen) {
      containerRef.current.msRequestFullscreen();
    }
  };

  const toggleSound = useCallback(
    function () {
      setMute(videoRef.current.muted);
      if (videoRef.current.muted == true) {
        videoRef.current.muted = false;
        setMute(false);
      } else if (videoRef.current.muted == false) {
        videoRef.current.muted = true;
        setMute(true);
      }
    },
    [videoRef]
  );
  const togglePictureInPicture = async function () {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
    } else {
      if (videoRef.current.requestPictureInPicture) {
        await videoRef.current.requestPictureInPicture();
      }
    }
  };
  const increaseVolume = useCallback(() => {
    if (videoRef.current.volume < 1) {
      videoRef.current.volume += 0.1;
      console.log(videoRef.current.volume);
    }
  }, [videoRef]);

  const decreaseVolume = useCallback(() => {
    if (videoRef.current.volume > 0) {
      videoRef.current.volume -= 0.1;
      console.log(videoRef.current.volume);
    }
  }, [videoRef]);
  const seekingForward = useCallback(() => {
    if (videoRef.current.currentTime + 10 <= videoRef.current.duration) {
      videoRef.current.currentTime += 10;
      console.log(videoRef.current.currentTime);
    } else {
      videoRef.current.currentTime = videoRef.current.duration;
      console.log("too late");
    }
  }, [videoRef]);
  const seekingBackward = useCallback(() => {
    if (videoRef.current.currentTime - 10 >= 0) {
      videoRef.current.currentTime -= 10;
      console.log(videoRef.current.currentTime);
    } else {
      videoRef.current.currentTime = videoRef.current.duration;
      console.log("too late");
    }
  }, [videoRef]);

  const handleShortcutsChange = (event) => {
    setWorkShortcuts(event.target.checked);
    console.log("done");
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (workShortcuts === true) {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        if (event.code.includes("Digit")) {
          for (let i = 1; i <= 9; i++) {
            if (event.code == `Digit${i}`) {
              videoRef.current.currentTime =
                videoRef.current.duration * (i / 10);
              console.log(videoRef.current.duration * (i * 10));
              console.log("true");
            }
          }
        } else {
          switch (event.code) {
            case "Space":
              playVideo();
            case "ArrowUp":
              event.preventDefault();
              increaseVolume();
              break;
            // console.log('Key pressed:', event.code);
            case "ArrowDown":
              event.preventDefault();
              decreaseVolume();
              break;

            case "ArrowRight":
              event.preventDefault();
              seekingForward();
              break;
            case "ArrowLeft":
              event.preventDefault();
              seekingBackward();
              break;
            case "KeyC":
              event.preventDefault();
              // seekingBackward();
              break;
            case "KeyF":
              event.preventDefault();
              toggleFull();
              break;
            case "KeyM":
              event.preventDefault();
              toggleSound();
              break;
            default:
              break;
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    console.log("reached-11");

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    workShortcuts,
    decreaseVolume,
    increaseVolume,
    playVideo,
    seekingBackward,
    seekingForward,
    toggleSound,
    videoRef,
  ]);

  return (
    <div ref={containerRef} className={classes["container"]}>
      <ChannelSettings
        togglePictureInPicture={togglePictureInPicture}
        setAboutMenu={setAboutMenu}
        setShortcutsMenu={setShortcutsMenu}
        isVisible={contextMenu.visible}
      />
      {aboutMenu && <AboutLive setAboutMenu={setAboutMenu} />}
      {shortcutsMenu && (
        <Shortcuts
          workShortcuts={workShortcuts}
          handleShortcutsChange={handleShortcutsChange}
          setShortcutsMenu={setShortcutsMenu}
        />
      )}
      {qualities && <Qualites setQualities={setQualities} />}
      <video
        webkit-playsinline
        playsinline
        id="video"
        // controlsList="noplaybackrate"
        onContextMenu={showContextMenu}
        onClick={hideContextMenu}
        className={classes["video-play"]}
        ref={videoRef}
        width={"100%"}
        height={"100%"}
        controls={false}
        autoPlay={false}
      ></video>
      <button
        onClick={playVideo}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "transparent",
          cursor: "pointer",
        }}
      >
        {isPlaying ? (
          ""
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="76"
            height="87"
            viewBox="0 0 76 87"
            fill="none"
          >
            <path
              d="M72.569 39.2085C75.8839 41.1365 75.8839 45.9247 72.569 47.8527L7.51387 85.6909C4.18056 87.6297 -3.85644e-06 85.225 -3.68788e-06 81.3688L-3.79957e-07 5.6924C-2.114e-07 1.83627 4.18056 -0.568452 7.51387 1.37031L72.569 39.2085Z"
              fill="#D9D9D9"
            />
          </svg>
        )}
      </button>

      <Contrrols
        videoRef={videoRef}
        mute={mute}
        isPlaying={isPlaying}
        playVideo={playVideo}
        toggleFull={toggleFull}
        toggleSound={toggleSound}
        togglePictureInPicture={togglePictureInPicture}
        setQualities={setQualities}
      />
    </div>
  );
};

export default HlcPlayer;
