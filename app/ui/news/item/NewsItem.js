import Image from "next/image";
import React from "react";
import classes from "./newsItem.module.css";
import Link from "next/link";
const NewsItem = ({ src, alt, heading, para, index }) => {
  return (
    <Link
      style={{ background: (index + 1) % 2 == 0 ? "#182228" : "inherit" }}
      href={`/news/${heading.replace(/ /g, "-")}`}
      className={classes["news-item"]}
    >
      <Image
        crossOrigin="anonymous"
        className={classes["news-item-image"]}
        src={src}
        alt={alt}
        width="108"
        height="85"
      />
      <div className={classes["news-item-content"]}>
        <h3 className={classes["news-item-heading"]}>{heading}</h3>
        <p className={classes["news-item-para"]}>{para}</p>
      </div>
    </Link>
  );
};

export default NewsItem;
