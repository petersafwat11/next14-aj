"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import classes from "./method.module.css";
import Popup from "../../popupWrapper/Popup";
import OtherPaymentMethod from "../otherPaymentMethod/OtherPaymentMethod";
import axios from "axios";
const Method = ({ name, width, height, data }) => {
  const [donationPopup, setDonationPopup] = useState({
    show: false,
    method: "",
  });
  const togglePopup = () => {
    setDonationPopup({
      show: !donationPopup.show,
      method: "",
    });
  };
  const userClickedMethod = (method) => {
    setDonationPopup({
      show: !donationPopup.show,
      method: method,
    });
  };
  return (
    <>
      {donationPopup.show && (
        <Popup>
          <OtherPaymentMethod
            toggle={togglePopup}
            title={donationPopup.method}
            data={
              donationPopup.method === "bitcoin"
                ? data?.bitcoinAddress
                : "Comming Soon"
            }
            message={
              "Please send any Bitcoin donations to the above wallet address, we highly appreciate it!"
            }
            button={donationPopup.method === "bitcoin" ? "Paid" : "Ok"}
          />
        </Popup>
      )}

      <div
        onClick={() => {
          name !== "share" ? userClickedMethod(name) : "";
        }}
        className={classes[name]}
      >
        <Image
          src={`/svg/donate/${name}.svg`}
          alt={name}
          width={width}
          height={height}
        />
      </div>
    </>
  );
};

export default Method;
