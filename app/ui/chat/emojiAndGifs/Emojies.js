import React from "react";
import classes from "./Emojies.module.css";
const EmojiPicker = ({ onSelect }) => {
  const emojiList = Array.from(
    { length: 129000 - 128000 + 1 },
    (_, index) => index + 128000
  );

  return (
    <div className={classes['container']}>
      {emojiList.map((codePoint) => (
        <span
          className={classes["emojie"]}
          key={codePoint}
          role="img"
          aria-label="emoji"
          onClick={() => onSelect(String.fromCodePoint(codePoint))}
        >
          {String.fromCodePoint(codePoint)}
        </span>
      ))}
    </div>
  );
};

export default EmojiPicker;
