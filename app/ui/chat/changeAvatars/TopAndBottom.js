import Image from "next/image";
import React from "react";
import classes from "./topAndBottom.module.css";
export const TopPart = ({ toggleChangeAvatar, toggleImageUpload }) => {
  return (
    <div>
      <div className={classes["change-avatar-text"]}>
        <h3 className={classes["title"]}>Select an avatar</h3>
        <p className={classes["para"]}>
          Choose an avatar to be displayed on your profile picture.
        </p>
      </div>
      <div className={classes["file-pload-wrapper"]}>
        <Image
          className={classes["upload-icon"]}
          onClick={toggleChangeAvatar}
          src="/svg/chat/change-avatar/upload.svg"
          alt="upload"
          width="15"
          height="18"
        />
        <p className={classes["file-upload-para"]}>
          Drag and drop file or
          <span onClick={toggleImageUpload}>browse computer</span>
        </p>
      </div>
    </div>
  );
};
export const Actions = ({applyChanges,toggleChangeAvatar}) => {
  return (
    <div className={classes["actions"]}>
      <button onClick={applyChanges} className={classes["apply-button"]}>
        Apply
      </button>
      <button onClick={toggleChangeAvatar} className={classes["cancel-button"]}>
        Cancel
      </button>
    </div>
  );
};
