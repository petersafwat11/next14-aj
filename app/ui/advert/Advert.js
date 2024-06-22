"use client";
import React from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import classes from "./adver.module.css";
import { useRouter } from "next/navigation";

const Advert = () => {
  const router = useRouter();

  return (
    <div className={classes["advert"]}>
      <p className={classes["para"]}>from 99$/month</p>
      <h2 className={classes["title"]}>PLACE YOUR ADVERT HERE</h2>
      <button
        onClick={() => {
          router.replace(`/contact`);
        }}
        className={classes["button"]}
      >
        CONTACT US
        <BiRightArrowAlt className={classes["right-arrow"]} />
      </button>
    </div>
  );
};

export default Advert;
