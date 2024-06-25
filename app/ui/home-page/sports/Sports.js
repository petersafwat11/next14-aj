"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import classes from "./sports.module.css";
import { useSearchParams, useRouter } from "next/navigation";
const Sports = () => {
  const SportsContainerRef = useRef(null);

  useEffect(() => {
    // This will run whenever the component re-renders
    if (SportsContainerRef.current) {
      SportsContainerRef.current.scrollLeft = 0;
    }
  });
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
  return (
    <section ref={SportsContainerRef} className={classes["sports"]}>
      <div
        onClick={() => {
          changeCategory("nfl");
        }}
        className={
          searchParams.get("category") === "nfl"
            ? classes["selected"]
            : classes["nfl"]
        }
      >
        <Image
          className={classes["sport-image"]}
          src="/svg/sports/nfl.svg"
          alt="nfl"
          width="48"
          height="48"
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
        className={
          searchParams.get("category") === "basketball"
            ? classes["selected"]
            : classes["basketball"]
        }
      >
        <Image
          className={classes["sport-image"]}
          src="/svg/sports/basketball.svg"
          alt="basketball"
          width="48"
          height="48"
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
        className={
          searchParams.get("category") === "football" ||
          searchParams.get("category") === null
            ? classes["selected"]
            : classes["football"]
        }
      >
        <Image
          className={classes["sport-image"]}
          src="/svg/sports/football.svg"
          alt="football"
          width="48"
          height="48"
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
        className={
          searchParams.get("category") === "fights"
            ? classes["selected"]
            : classes["boxing"]
        }
      >
        <Image
          className={classes["sport-image"]}
          src="/svg/sports/boxing.svg"
          alt="boxing"
          width="48"
          height="48"
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
        className={
          searchParams.get("category") !== "football" &&
          searchParams.get("category") !== "basketball" &&
          searchParams.get("category") !== "nfl" &&
          searchParams.get("category") !== "fights" &&
          searchParams.get("category") !== null
            ? classes["selected"]
            : classes["other"]
        }
      >
        <Image
          className={classes["sport-image"]}
          src="/svg/sports/other.svg"
          alt="other"
          width="52"
          height="48"
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
