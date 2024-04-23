"use client";
import classes from "./videoBody.module.css";
import Image from "next/image";
import React, { Suspense, useEffect, useState } from "react";
import ServersButtons from "../serverButtons/ServersButtons";
import BottomSocial from "../../bottomSocial/BottomSocial";
import HlcPlayer from "../../hlcPlayer/HlcPlayer";
import { calcRemainingTime, determineLive } from "@/app/lib/datesFunctions";
import BottomSocialFallback from "../../bottomSocial/fallback/BottomSocial";

import EventCountDown from "../eventCoutdown/EventCountDown";
import ExtendButton from "../../channels/extendButton/ExtendButton";
import ReportBtn from "../../reportBtn/ReportBtn";
import ServersButtonsMobile from "../serverButtons/serversButtonsMobile/ServersButtonsMobile";

const VideoBody = ({ eventDate, playStream, activeServer, servers }) => {
  const [playingServer, setPlayingServer] = useState(activeServer);
  //   const [videoUrl, setVideoUrl] = useState(url);
  const [playStreaming, setPlayStreaming] = useState(determineLive(playStream));
  const [remainingTime, setRemainingTime] = useState(
    calcRemainingTime(eventDate)
  );
  const [extendMode, setExtendMode] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(calcRemainingTime(eventDate));
      setPlayStreaming(determineLive(playStream));
    }, 1000);

    return () => clearInterval(interval);
  }, [playStream, eventDate]);
  const activeExtendMode = () => {
    setExtendMode(!extendMode);
    document.body.style.overflow = "hidden";
  };

  return (
    <>
      <div id="my-root-div" className="watch-video">
        {playStreaming ? (
          <HlcPlayer url={playingServer.server.streamLinkUrl} />
        ) : (
          <EventCountDown
            // eventDate={matchData?.eventDate}
            remainingTime={remainingTime}
          />
        )}
      </div>
      <div className={classes["watch-video-wrapper-bottom"]}>
        <div className={classes["social-links-desktop"]}>
          <Suspense fallback={<BottomSocialFallback />}>
            <BottomSocial />
          </Suspense>
        </div>
        <div className={classes["servers-mobile"]}>
          <ServersButtonsMobile
            notLive={!playStreaming}
            playingServer={playingServer}
            setPlayingServer={setPlayingServer}
            servers={servers}
          />
        </div>

        <div className={classes["modes-icons"]}>
          <ExtendButton activeExtendMode={activeExtendMode} />
          <ReportBtn />
        </div>
      </div>

      <div className={classes["servers"]}>
        <ServersButtons
          notLive={!playStreaming}
          playingServer={playingServer}
          setPlayingServer={setPlayingServer}
          servers={servers}
        />
      </div>
    </>
  );
};

export default VideoBody;
