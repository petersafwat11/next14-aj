"use client";
import Image from "next/image";
import React, { useEffect, useReducer, useState } from "react";
// import { getDateDifference } from "../../../utils/convertDateFormat";
import FollowUS from "../followUS/FollowUS";
import dynamic from "next/dynamic";
const StepsWrapper = dynamic(() => import("../stepsWrapper/StepsWrapper"), {
  ssr: false,
});
import classes from "./wrapper.module.css";
import { getDateDifference } from "@/app/lib/datesFunctions";
const Popup = dynamic(() => import("../../popupWrapper/Popup"), {
  ssr: false,
});
import PageTitle from "../../pageTitle/PageTitle";

const followUsReducer = (state, action) => {
  if (action.type === "INTIATOR") {
    return {
      ...state,
      display: true,
      methodData: action.methodData,
      indicatorsNum: action.indicatorsNum,
    };
  } else if (action.type === "METHOD-DATA") {
    return { ...state, methodData: action.value };
  } else if (action.type === "USER-INFO") {
    return { ...state, userInfo: action.value };
  } else {
    return {
      ...state,
      display: false,
    };
  }
};

const Wrapper = ({ entries, eventData, allSocial }) => {
  const [followUs, dispatchAction] = useReducer(followUsReducer, {
    display: false,
    indicatorsNum: null,
    methodData: null,
    userInfo: { fullName: "", email: "" },
  });
  const [timeLeft, setTimeLeft] = useState({ num: 0, unit: "Days" });
  const { endTime } = eventData;
  useEffect(() => {
    const timeLeft = getDateDifference(endTime);
    setTimeLeft(timeLeft);
  }, [endTime]);
  return (
    <main className={classes["give-away"]}>
      {followUs.display && (
        <Popup>
          <StepsWrapper
            dispatchAction={dispatchAction}
            followUs={followUs}
            allSocial={allSocial}
          />
        </Popup>
      )}

      <div className={classes["container"]}>
        <PageTitle title={"GIVEAWAY"} />
        <section className={classes["give-away-wrapper"]}>
          <div className={classes["give-away-details"]}>
            <div className={classes["give-away-details-item"]}>
              <p>{entries?.userEntry}</p>
              <p>Your Entries</p>
            </div>
            <div className={classes["give-away-details-item"]}>
              <p>{entries?.totalEntries} </p>
              <p>Total Entries</p>
            </div>
            <div className={classes["give-away-details-item"]}>
              <p>{timeLeft?.num} </p>
              <p>{timeLeft?.unit} Left</p>
            </div>
          </div>
          <div className={classes["give-away-compition"]}>
            <span className={classes["devider"]}></span>
            <h2 className={classes["give-away-heading-2"]}>
              {eventData?.title}
            </h2>

            <div
              style={{ marginTop: "-.6rem" }}
              className={classes["give-away-image"]}
            >
              <Image
                className={classes["give-away-center-image"]}
                src={`${process.env.BACKEND_SERVER}/img/giveaway/${eventData?.prizeImage}`}
                crossOrigin="anonymous"
                alt="playstation"
                width={128}
                height={152}
              />
              <p className={classes["give-away-para"]}>
                {eventData?.description}
              </p>
            </div>
          </div>
          <div className={classes["follow-us"]}>
            <FollowUS
              categoryEntries={entries?.categoryEntries}
              dispatchAction={dispatchAction}
              src={"/svg/give-away/id-badge.svg"}
              alt={"Id-Badge"}
              width={23}
              height={23}
              indicatorsNum={2}
              para={"Full name and email"}
            />
            <FollowUS
              categoryEntries={entries.categoryEntries}
              dispatchAction={dispatchAction}
              src={"/svg/give-away/mail.svg"}
              alt={"Mail"}
              width={23}
              height={23}
              indicatorsNum={2}
              para={"Join an Email Newsletter"}
            />
            <FollowUS
              categoryEntries={entries.categoryEntries}
              dispatchAction={dispatchAction}
              src={"/svg/give-away/telegram.svg"}
              alt={"Telegram"}
              indicatorsNum={3}
              width={23}
              height={23}
              para={"Join our Telegram Channel"}
            />
            <FollowUS
              categoryEntries={entries.categoryEntries}
              dispatchAction={dispatchAction}
              src={"/svg/give-away/twitter.svg"}
              alt={"Twitter"}
              indicatorsNum={3}
              width={23}
              height={23}
              para={"Follow us on Twitter"}
            />
            <FollowUS
              categoryEntries={entries.categoryEntries}
              dispatchAction={dispatchAction}
              src={"/svg/give-away/retweet.svg"}
              alt={"Retweet"}
              indicatorsNum={3}
              width={23}
              height={23}
              para={"Retweet us on Twitter"}
            />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Wrapper;
