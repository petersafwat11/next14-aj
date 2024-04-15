import Image from "next/image";
import React from "react";
import classes from "./rightPart.module.css";
const RightPart = ({
  toggleChangeAvatar,
  newSelectedAvatar,
  selectedAvatar,
}) => {
  return (
    <div className={classes["change-avatars-second"]}>
      <Image
        className={classes["exit"]}
        onClick={toggleChangeAvatar}
        src="svg/chat/change-avatar/exit.svg"
        alt="send"
        width="12"
        height="12"
      />
      <div className={classes["selected-avatar"]}>
        <div className={classes["new-selected-image"]}>
          {newSelectedAvatar ? (
            <img
              className={classes["selected-avatar-icon"]}
              src={`/svg/chat/avatars/${newSelectedAvatar}.svg`}
              alt="avatar"
              width="114"
            />
          ) : (
            <img
              className={classes["selected-avatar-icon"]}
              src={selectedAvatar}
              alt="avatar"
              width="114"
            />
          )}
        </div>

        <p>Your selected avatar</p>
      </div>
    </div>
  );
};

export default RightPart;
