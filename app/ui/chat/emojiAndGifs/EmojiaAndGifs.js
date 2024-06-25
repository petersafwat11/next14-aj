import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import GifPicker from "gif-picker-react";
import React, { useEffect, useState } from "react";
import EmojiPicker from "./Emojies";
import classes from "./emogiAndGifs.module.css";
import Image from "next/image";
// import "../../../styles/";
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
  const onSelectEmojie = (emoji) => {
    setInputMessage(message + emoji);
  };
  // const customPickerStyles = {
  //   #root .search input[type="search"] {
  //     height: 40px;
  //     border: 1px solid white !important;
  //   }
  // };

  return (
    <div
      style={{ paddingBottom: emojyOrGifs === "gifs" ? "0" : "" }}
      id="emojies-gifs"
      className={classes["emojies-gifs"]}
    >
      <div className={classes["blue-header"]}></div>
      <div className={classes["space"]}></div>
      <Image
        onClick={displayEmojisAndGifs}
        className={classes["exit-emojy"]}
        src="/svg/chat/extend-mode/close.svg"
        alt="exit"
        width="12"
        height="12"
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
              classes[emojyOrGifs === "gifs" ? "option-selected" : "option"]
            }
            onClick={() => {
              chooseGifOrEmojies("gifs");
            }}
          >
            GIFs
          </p>
        </div>
        {emojyOrGifs === "emojy" && (
          <div className="emojy-picker">
            <div className={classes["space-2"]}></div>

            <Picker
              // style={customPickerStyles}
              className="emojy-picker-component"
              navPosition="none"
              data={data}
              theme="dark"
              previewPosition="none"
              perLine={windowDimensions.width > 410 ? 9 : 8}
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
