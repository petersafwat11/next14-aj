"use client";
import dynamic from "next/dynamic";
import classes from "./videoBody.module.css";
import React, { useEffect, useState } from "react";
const ServersButtons = dynamic(() => import("../serverButtons/ServersButtons"), {
  ssr: false,
});

import BottomSocial from "../../bottomSocial/BottomSocial";
const HlcPlayer = dynamic(() => import("../../hlcPlayer/HlcPlayer"), {
  ssr: false,
});

import { calcRemainingTime, determineLive } from "@/app/lib/datesFunctions";

import EventCountDown from "../eventCoutdown/EventCountDown";
import ExtendButton from "../../channels/extendButton/ExtendButton";
import ReportBtn from "../../reportBtn/ReportBtn";
const ServersButtonsMobile = dynamic(() => import("../serverButtons/serversButtonsMobile/ServersButtonsMobile"), {
  ssr: false,
});


const ExtendModeWrapper = dynamic(() => import("../../extendMode/wrapper/Wrapper"), {
  ssr: false,
});

const VideoBody = ({
  social,
  eventDate,
  playStream,
  activeServer,
  servers,
  chatMessages,
  chatRules,
  chatFilteredWords,
}) => {
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
        {extendMode && (
          <ExtendModeWrapper
            chatMessages={chatMessages}
            chatRules={chatRules}
            chatFilteredWords={chatFilteredWords}
            url={playingServer.server.streamLinkUrl}
            setExtendMode={setExtendMode}
          />
        )}

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
          <BottomSocial social={social} />
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
