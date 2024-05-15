"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import classes from "./articleContent.module.css";

const ArticleContent = ({ title, subNews }) => {
  const router = useRouter();
  return (
    <div className={classes["container"]}>
      <div className={classes["article-top"]}>
        <BsFillArrowLeftCircleFill
          onClick={() => {
            router.push("/news");
          }}
          className={classes["arrow-back"]}
        />
        <div className={classes["top-text"]}>
          <h2 className={classes["news-article-heading"]}>{title}</h2>
          <span>Posted by AJ Sports Admin</span>
        </div>
      </div>
      {subNews?.length > 0 &&
        subNews?.map((item, index) => (
          <div
            style={{
              background: (index + 1) % 2 == 0 ? "#182228" : "inherit",
            }}
            key={item?._id}
            className={classes["news-item"]}
          >
            <p className={classes["news-article-title"]}>{item?.title}</p>
            <Image
              crossOrigin="anonymous"
              className={classes["news-article-image"]}
              src={`${process.env.BACKEND_SERVER}/img/news/${item?.image}`}
              alt="article-photo"
              width="400"
              height="270"
            />
            <p className={classes["news-article-para"]}>{item?.description}</p>
          </div>
        ))}
    </div>
  );
};

export default ArticleContent;
