// import Hls from "hls.js";
// import React, { useCallback, useEffect, useRef, useState } from "react";
// import P2pEngineHls from "swarmcloud-hls";
// import classes from "./hlcPlayer.module.css";

// const HlcPlayer = ({ url, notRounded, videoRef }) => {
//   const videoIConRef = useRef(null);
//   const [playing, setPlaying] = useState(false);
//   const [hls, setHls] = useState(null);

//   const playVideo = function () {
//     if (videoRef.current.paused) {
//       videoRef.current.play();
//     } else {
//       videoRef.current.pause();
//     }
//   };

//   const handlePlaying = function () {
//     setPlaying(!playing);
//   };

//   const handlePausing = function () {
//     setPlaying(!playing);
//   };

//   const onError = useCallback(
//     function (event, data) {
//       if (data?.fatal) {
//         switch (data?.type) {
//           case Hls?.ErrorTypes?.NETWORK_ERROR:
//             console.log("fatal network error encountered, try to recover");
//             hls?.startLoad();
//             break;
//           case Hls?.ErrorTypes?.MEDIA_ERROR:
//             console.log("fatal media error encountered, try to recover");
//             hls?.recoverMediaError();
//             break;
//           default:
//             console.log(
//               "fatal error encountered, destroy instance and create a new one"
//             );
//             hls?.off(Hls?.Events?.ERROR, onError);
//             hls?.destroy();
//             setHls(null);
//             break;
//         }
//       }
//     },
//     [hls]
//   );

//   useEffect(() => {
//     const p2pConfig = {
//       // Other p2pConfig options if applicable
//     };
//     console.log("url", url);
//     if (url) {
//       const hlsInstance =
//         hls ||
//         new Hls({
//           maxBufferSize: 0,
//           maxBufferLength: 20,
//           liveSyncDurationCount: 10,
//         });

//       hlsInstance?.on(Hls?.Events?.ERROR, onError);

//       p2pConfig.hlsjsInstance = hlsInstance;
//       new P2pEngineHls(p2pConfig);
//       hlsInstance?.loadSource(url);
//       hlsInstance?.attachMedia(videoRef?.current);
//       setTimeout(() => {
//         setHls(hlsInstance);
//       }, [5000]);
//     } else if (
//       videoRef?.current?.canPlayType("application/vnd.apple.mpegurl")
//     ) {
//       videoRef.current.src = url;
//     }

//     setPlaying(false);
//     console.log("url", hls);

//     return () => {
//       if (hls) {
//         hls.off(Hls?.Events?.ERROR, onError);
//         hls.destroy();
//       }
//     };
//   }, [url, videoRef, hls, onError]);

//   return (
//     <div className={classes["video-container"]}>
//       <video
//         controlsList="noplaybackrate"
//         className={
//           notRounded
//             ? classes["video-play"]
//             : playing
//             ? classes["video-play"]
//             : classes["video-pause"]
//         }
//         ref={videoRef}
//         width={"100%"}
//         height={"100%"}
//         controls={true}
//         autoPlay={false}
//         onPlay={handlePlaying}
//         onPause={handlePausing}
//       ></video>
//       {!playing && (
//         <div
//           onClick={() => {
//             console.log("clicked");
//             playVideo();
//           }}
//           ref={videoIConRef}
//           className={classes["play-icon"]}
//         ></div>
//       )}
//     </div>
//   );
// };

// export default HlcPlayer;

// import Hls from "hls.js";
// import React, { useEffect, useRef, useState } from "react";
// import P2pEngineHls from "swarmcloud-hls";
// import classes from "./hlcPlayer.module.css";
// const HlcPlayer = ({ url, notRounded, videoRef }) => {
//   const videoIConRef = useRef(null);
//   const [palying, setPlaying] = useState(false);
//   // Add a click event listener to the play button
//   const playVideo = function () {
//     // Toggle the video state
//     if (videoRef.current.paused) {
//       videoRef.current.play();
//     } else {
//       videoRef.current.pause();
//     }
//   };

//   // Add a play event listener to the video
//   const handlePlaying = function () {
//     setPlaying(!palying);
//   };

//   // Add a pause event listener to the video
//   const handlePausing = function () {
//     setPlaying(!palying);
//   };

//   useEffect(() => {
//     const p2pConfig = {
//       // Other p2pConfig options if applicable
//     };

//     const handleError = (error) => {
//       console.error("Error occurred:", error);
//     };

//     try {
//       if (Hls.isSupported() && url) {
//         const hls = new Hls({
//           maxBufferSize: 0, // Highly recommended setting in live mode
//           maxBufferLength: 25, // Highly recommended setting in live mode
//           liveSyncDurationCount: 10, // Highly recommended setting in live mode
//         });

//         p2pConfig.hlsjsInstance = hls;
//         new P2pEngineHls(p2pConfig);

//         hls.loadSource(url);
//         hls.attachMedia(videoRef.current);

//         hls.on(Hls.Events.ERROR, (event, data) => {
//           handleError(data);
//         });
//       } else if (
//         videoRef.current.canPlayType("application/vnd.apple.mpegurl")
//       ) {
//         videoRef.current.src = url;
//       }

//       videoRef.current.setAttribute("playsinline", "");
//       videoRef.current.setAttribute("webkit-playsinline", "true");

//       setPlaying(false);
//     } catch (error) {
//       handleError(error);
//     }
//   }, [url, videoRef, setPlaying]);
//   return (
//     <div
//       style={{ background: "#0d1317" }}
//       className={classes["video-container"]}
//     >
//       <video
//         // webkit-playsinline
//         playsInline
//         // poster="/wallpaper/main.jpg"
//         controlsList="noplaybackrate"
//         className={
//           notRounded
//             ? classes["video-play"]
//             : palying
//             ? classes["video-play"]
//             : classes["video-pause"]
//         }
//         ref={videoRef}
//         width={"100%"}
//         height={"100%"}
//         controls={true}
//         autoPlay={false}
//         onPlay={handlePlaying}
//         onPause={handlePausing}
//       ></video>
//       {!palying && (
//         <div
//           onClick={() => {
//             playVideo();
//           }}
//           ref={videoIConRef}
//           className={classes["play-icon"]}
//         ></div>
//       )}
//     </div>
//   );
// };

// export default HlcPlayer;
import React from "react";
import VideoJS from "./Player";

const HlcPlayer = ({ url }) => {
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: "https://content.jwplatform.com/manifests/yp34SRmf.m3u8",
        // url,
        type: "application/x-mpegURL",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    player.on("waiting", () => {
      console.log("player is waiting");
    });

    player.on("dispose", () => {
      console.log("player will dispose");
    });
  };

  return <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />;
};

export default HlcPlayer;
