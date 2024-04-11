"use client";
import Image from "next/image";
import React, { useState } from "react";
import classes from "./method.module.css";
import Popup from "../../popupWrapper/Popup";
import OtherPaymentMethod from "../otherPaymentMethod/OtherPaymentMethod";
const Method = ({ name, width, height }) => {
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
                ? "0x5C7f5cA94419A446002b16aA4B335221300E86E3"
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
          name !== "share" ? userClickedMethod() : "";
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
