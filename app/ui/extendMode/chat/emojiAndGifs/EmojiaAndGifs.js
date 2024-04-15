import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import GifPicker from "gif-picker-react";
import React, { useEffect, useState } from "react";
import classes from "./emogiAndGifs.module.css";
import Image from "next/image";

const EmojiaAndGifs = ({
  emojyOrGifs,
  chooseGifOrEmojies,
  setInputMessage,
  message,
  displayEmojisAndGifs,
  sendGif,
}) => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: "",
    height: "",
  });
  const handleResize = () => {
    setWindowDimensions({
      width: window.screen.width,
      height: window.screen.height,
    });
  };
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div
      style={{ paddingBottom: emojyOrGifs === "gifs" ? "0" : "" }}
      id="emojies-gifs"
      className={classes["emojies-gifs"]}
    >
      <div className={classes["blue-header"]}></div>
      <div className={classes["space"]}></div>
      {emojyOrGifs == "emojy" && <div className={classes["space-2"]}></div>}
      <Image
        onClick={displayEmojisAndGifs}
        className={classes["exit-emojy"]}
        src="/svg/chat/extend-mode/close.svg"
        alt="exit"
        width="15"
        height="15"
      />
      <div className={classes["emojie-and-gifs-wrapper"]}>
        <div className={classes["emojies-gifs-top"]}>
          <p
            className={
              classes[emojyOrGifs === "emojy" ? "option-selected" : "option"]
            }
            onClick={() => {
              chooseGifOrEmojies("emojy");
            }}
          >
            Emojis
          </p>
          <p
            className={
              classes[emojyOrGifs == "gifs" ? "option-selected" : "option"]
            }
            onClick={() => {
              chooseGifOrEmojies("gifs");
            }}
          >
            GIFs
          </p>
        </div>
        {emojyOrGifs === "emojy" && (
          
          <div className="emoji-extendmode">
            <Picker
              navPosition="none"
              className={classes["emojy-picker"]}
              data={data}
              theme="dark"
              previewPosition="none"
              perLine={
                windowDimensions.height < 1400 &&
                windowDimensions.height > 1000 &&
                windowDimensions.width < 1100
                  ? 11
                  : windowDimensions.width < 600
                  ? 9
                  : windowDimensions.width < 400
                  ? 8
                  : windowDimensions.width < 1400
                  ? 7
                  : windowDimensions.width < 1600
                  ? 9
                  : 10
              }
              onEmojiSelect={(e) => {
                setInputMessage(e.native, true);
              }}
            />
          </div>
        )}
        {emojyOrGifs === "gifs" && (
          <GifPicker
            tenorApiKey={"AIzaSyBo8FTXtwIbVtdnWNTZwy4BmlTbb5VH_ME"}
            theme="dark"
            onGifClick={(TenorImage) => {
              sendGif(TenorImage.url);
              displayEmojisAndGifs();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default EmojiaAndGifs;
