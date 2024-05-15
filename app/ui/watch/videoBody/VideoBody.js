"use client";
import dynamic from "next/dynamic";
import classes from "./videoBody.module.css";
import React, { useEffect, useRef, useState } from "react";
const ServersButtons = dynamic(
  () => import("../serverButtons/ServersButtons"),
  {
    ssr: false,
  }
);

import BottomSocial from "../../bottomSocial/BottomSocial";
const HlcPlayer = dynamic(() => import("../../hlcPlayer/HlcPlayer"), {
  ssr: false,
});

import { calcRemainingTime, determineLive } from "@/app/lib/datesFunctions";

import EventCountDown from "../eventCoutdown/EventCountDown";
import ExtendButton from "../../channels/extendButton/ExtendButton";
import ReportBtn from "../../reportBtn/ReportBtn";
import EventEnded from "../eventEnded/EventEnded";
const ServersButtonsMobile = dynamic(
  () => import("../serverButtons/serversButtonsMobile/ServersButtonsMobile"),
  {
    ssr: false,
  }
);

const ExtendModeWrapper = dynamic(
  () => import("../../extendMode/wrapper/Wrapper"),
  {
    ssr: false,
  }
);

const VideoBody = ({
  social,
  eventDate,
  playStream,
  activeServer,
  servers,
  chatMessages,
  chatRules,
  chatFilteredWords,
  eventEnds,
}) => {
  const videoRef = useRef(null);
  const extendVideoRef = useRef(null);

  const [playingServer, setPlayingServer] = useState(activeServer);
  //   const [videoUrl, setVideoUrl] = useState(url);
  const [playStreaming, setPlayStreaming] = useState(determineLive(playStream));
  const [endedEvent, setEndedEvent] = useState(determineLive(eventEnds));
  const [remainingTime, setRemainingTime] = useState("");
  const [extendMode, setExtendMode] = useState(false);
  const [videoCurrentState, setVideoCurrentState] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(calcRemainingTime(eventDate));
      setPlayStreaming(determineLive(playStream));
      setEndedEvent(determineLive(eventEnds));
    }, 1000);

    return () => clearInterval(interval);
  }, [playStream, eventDate, eventEnds]);
  const activeExtendMode = () => {
    setExtendMode(!extendMode);
    let currentState;
    videoRef.current.paused ? (currentState = false) : (currentState = true);
    videoRef.current.pause();
    setVideoCurrentState(currentState);
    document.body.style.overflow = "hidden";
  };
  const exitExtenMode = () => {
    setExtendMode(!extendMode);
    let currentState;
    extendVideoRef.current.paused
      ? (currentState = false)
      : (currentState = true);
    extendVideoRef.current.pause();
    currentState ? videoRef.current.play() : videoRef.current.pause();
    extendVideoRef.current.pause();
    document.body.style.overflow = "";
  };
  return (
    <>
      <div id="my-root-div" className="watch-video">
        {extendMode && (
          <ExtendModeWrapper
            videoCurrentState={videoCurrentState}
            exitExtenMode={exitExtenMode}
            videoRef={extendVideoRef}
            chatMessages={chatMessages}
            chatRules={chatRules}
            chatFilteredWords={chatFilteredWords}
            url={playingServer.server.streamLinkUrl}
            setExtendMode={setExtendMode}
          />
        )}

        {endedEvent ? (
          <EventEnded />
        ) : playStreaming ? (
          <HlcPlayer
            videoRef={videoRef}
            url={playingServer.server.streamLinkUrl}
          />
        ) : (
          <EventCountDown
            eventDate={matchData?.eventDate}
            remainingTime={remainingTime}
          />
        )}
      </div>
      <div className={classes["watch-video-wrapper-bottom"]}>
        {playStreaming && !endedEvent && (
          <div className={classes["social-links-desktop"]}>
            <BottomSocial social={social} />
          </div>
        )}
        <div className={classes["servers-mobile"]}>
          <ServersButtonsMobile
            notLive={!playStreaming || endedEvent}
            playingServer={playingServer}
            setPlayingServer={setPlayingServer}
            servers={servers}
            eventDate={eventDate}
          />
        </div>

        {playStreaming && !endedEvent && (
          <div className={classes["modes-icons"]}>
            <ExtendButton activeExtendMode={activeExtendMode} />
            <ReportBtn />
          </div>
        )}
      </div>
      <div className={classes["servers"]}>
        <ServersButtons
          notLive={!playStreaming || endedEvent}
          playingServer={playingServer}
          setPlayingServer={setPlayingServer}
          servers={servers}
          eventDate={eventDate}
        />
      </div>
    </>
  );
};

export default VideoBody;
