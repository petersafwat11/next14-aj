"use client";
import Image from "next/image";
import React from "react";
import classes from "./sports.module.css";
import { useSearchParams, useRouter } from "next/navigation";
const Sports = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const changeCategory = (val) => {
    const params = new URLSearchParams(searchParams);
    if (val) {
      params.set("category", val);
    } else {
      params.delete("category");
    }
    replace(`/?${params.toString()}`);
  };
  console.log('searchParams.get("category")', searchParams.get("category"));
  return (
    <section className={classes["sports"]}>
      <div
        onClick={() => {
          changeCategory("nfl");
        }}
        className={classes["nfl"]}
      >
        <Image
          className={classes["sport-image"]}
          src="/svg/sports/nfl.svg"
          alt="nfl"
          width="60"
          height="60"
        />
        <p>NFL</p>
        {searchParams.get("category") === "nfl" ? (
          <span className={classes["customized-border"]}></span>
        ) : (
          <span className={classes["customized-hover"]}></span>
        )}
      </div>
      <div
        onClick={() => {
          changeCategory("basketball");
        }}
        className={classes["basketball"]}
      >
        <Image
          className={classes["sport-image"]}
          src="/svg/sports/basketball.svg"
          alt="basketball"
          width="60"
          height="60"
        />
        <p>Basketball</p>
        {searchParams.get("category") === "basketball" ? (
          <span className={classes["customized-border"]}></span>
        ) : (
          <span className={classes["customized-hover"]}></span>
        )}
      </div>
      <div
        onClick={() => {
          changeCategory("football");
        }}
        className={classes["football"]}
      >
        <Image
          className={classes["sport-image"]}
          src="/svg/sports/football.svg"
          alt="football"
          width="60"
          height="60"
        />
        <p>Football</p>
        {searchParams.get("category") === "football" ||
        searchParams.get("category") === null ? (
          <span className={classes["customized-border"]}></span>
        ) : (
          <span className={classes["customized-hover"]}></span>
        )}
      </div>
      <div
        onClick={() => {
          changeCategory("fights");
        }}
        className={classes["boxing"]}
      >
        <Image
          className={classes["sport-image"]}
          src="/svg/sports/boxing.svg"
          alt="boxing"
          width="60"
          height="60"
        />
        <p>Fights</p>
        {searchParams.get("category") === "fights" ? (
          <span className={classes["customized-border"]}></span>
        ) : (
          <span className={classes["customized-hover"]}></span>
        )}
      </div>
      <div
        onClick={() => {
          changeCategory("others");
        }}
        className={classes["other"]}
      >
        <Image
          className={classes["sport-image"]}
          src="/svg/sports/other.svg"
          alt="other"
          width="65"
          height="60"
        />
        <p>Others</p>
        {searchParams.get("category") !== "football" &&
        searchParams.get("category") !== "basketball" &&
        searchParams.get("category") !== "nfl" &&
        searchParams.get("category") !== "fights" &&
        searchParams.get("category") !== null ? (
          <span className={classes["customized-border"]}></span>
        ) : (
          <span className={classes["customized-hover"]}></span>
        )}
      </div>
    </section>
  );
};

export default Sports;
