import Image from "next/image";
import React from "react";
import classes from "./followUs.module.css";
const FollowUS = ({
  src,
  alt,
  width,
  height,
  para,
  dispatchAction,
  indicatorsNum,
  categoryEntries,
}) => {
  const num = categoryEntries?.find((item) => item._id === alt)?.num;
  return (
    <div
      onClick={() => {
        dispatchAction({
          type: "INTIATOR",
          steps: 1,
          methodData: {
            src: src,
            text: alt,
          },
          indicatorsNum: indicatorsNum,
        });
      }}
      className={classes["follow-us-method"]}
    >
      <Image
        className={classes["follow-us-method-image"]}
        src={src}
        alt={alt}
        width={width}
        height={height}
      />
      <p className={classes["follow-us-method-para"]}>{para}</p>
      <p className={classes["follow-us-method-num"]}> {num ? `+${num}` : 0}</p>
    </div>
  );
};

export default FollowUS;
