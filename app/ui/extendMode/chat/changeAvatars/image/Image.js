import React, { useState } from "react";
import Image from "next/image";
import classes from "./image.module.css";
const ImageWithLoading = ({
  avatarCategory,
  subCategory,
  subSubCategory,
  index,
  newSelectedAvatar,
  setNewSElectedAvatar,
}) => {
  const [loading, setLoading] = useState(true);

  return (
    <div
      // className={loading ? "image-container loading" : "image-container"}>
      key={index}
      onClick={() => {
        setNewSElectedAvatar(
          avatarCategory +
            "/" +
            subCategory +
            "/" +
            subSubCategory +
            "/" +
            Number(Number(index) + 1)
        );
      }}
      className={
        newSelectedAvatar ==
        avatarCategory +
          "/" +
          subCategory +
          "/" +
          subSubCategory +
          "/" +
          Number(Number(index) + 1)
          ? classes["clicked-avatar"]
          : classes["avatar"]
      }
    >
      {newSelectedAvatar ==
        avatarCategory +
          "/" +
          subCategory +
          "/" +
          subSubCategory +
          "/" +
          Number(Number(index) + 1) && (
        <Image
          className={classes["checked-icon"]}
          src="/svg/chat/check.svg"
          alt="avatar"
          width="21"
          height="21"
          
        />
      )}
      <Image
        className={classes["avatar-icon"]}
        src={`/svg/chat/avatars/${avatarCategory}/${subCategory}/${subSubCategory}/${
          index + 1
        }.svg`}
        alt="avatar"
        width="57"
        height="57"
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}

      />
      {loading && <div className="loader"></div>}
    </div>
  );
};

export default ImageWithLoading;
