// "use client";
import React from "react";
import classes from "./page.module.css";
import Popup from "../ui/popupWrapper/Popup";
import OtherPaymentMethod from "../ui/donate/otherPaymentMethod/OtherPaymentMethod";
import PageTitle from "../ui/pageTitle/PageTitle";
import Top from "../ui/donate/top/Top";
import Input from "../ui/donate/input/Input";
import Method from "../ui/donate/method/Method";
const Donate = () => {
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

            <Method name={"paypal"} width={28} height={32} />
            <Method name={"bitcoin"} width={23} height={30} />
            <Method name={"stripe"} width={72} height={30} />
            <Method name={"share"} width={20} height={34} />
          </div>
        </div>
        <span className={classes["devider"]}></span>

        <div className={classes["donate-wrapper-second"]}>
          <div className={classes["donation-methods-second"]}>
            <Method name={"goggle-pay"} width={32} height={32} />
            <Method name={"apple-pay"} width={32} height={38} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Donate;
