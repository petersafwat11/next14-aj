// "use client";
import React from "react";
import classes from "./page.module.css";
import PageTitle from "../ui/pageTitle/PageTitle";
import Top from "../ui/donate/top/Top";
import Input from "../ui/donate/input/Input";
import Method from "../ui/donate/method/Method";
import axios from "axios";

export const metadata = {
  title: "Donate | AJ Sports",
};

const Donate = async () => {
  const response = await axios.get(`${process.env.BACKEND_SERVER}/links`, {
    params: {
      fields: "payment",
    },
  });
  const data = response?.data?.data?.data[0]?.payment;

  return (
    <main className={classes["donate"]}>
      <div className={classes["container"]}>
        <PageTitle title={"DONATE"} />

        <div className={classes["donate-wrapper-first"]}>
          <Top />
          <Input />
          <p className={classes["paragraph"]}>
            We highly appreciate any donations and invest the funds into our{" "}
            <br /> platform to provide a greater service to the fans
          </p>

          <div className={classes["donation-methods-first"]}>
            <div className={classes["pay-by-card"]}>PAY BY CARD</div>
            <div className={classes["or"]}>OR</div>

            <Method name={"paypal"} width={23} height={26} />
            <Method data={data} name={"bitcoin"} width={19} height={24} />
            <Method name={"stripe"} width={85} height={24} />
            <Method name={"share"} width={16} height={28} />
          </div>
        </div>
        <span className={classes["devider"]}></span>

        <div className={classes["donate-wrapper-second"]}>
          <div className={classes["donation-methods-second"]}>
            <Method name={"goggle-pay"} width={26} height={26} />
            <Method name={"apple-pay"} width={26} height={31} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Donate;
