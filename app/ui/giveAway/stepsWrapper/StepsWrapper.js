import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
// import axios from "axios";
import StepOne from "../stepOne/StepOne";
import StepThree from "../stepThree/StepThree";
import StepTwo from "../stepTwo/StepTwo";
import TopIndecator from "../topIndecators/TopIndecator";
import classes from "./stepsWrapper.module.css";
const StepsWrapper = ({ followUs, dispatchAction }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [allSocial, setSocial] = useState(null);

  const [errMessage, setErrMessage] = useState("");
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const [id, setId] = useState(null);
  const handNext = (val) => {
    const { email, fullName } = followUs.userInfo;
    console.log(email, fullName);

    if (!email || !fullName) {
      return setErrMessage("please enter the required data");
    }
    if (!validateEmail(email) || fullName.length < 6) {
      return setErrMessage(
        "please enter a vaild email and fullname more than 6 charactars"
      );
    }
    console.log(val);
    setCurrentStep(val);
  };
  const handleStepChange = async (val) => {
    if (
      (val === 2 && followUs.indicatorsNum === 2) ||
      (val === 3 && followUs.indicatorsNum === 3)
    ) {
      return await sendUserData(val, currentStep);
    }
    if (val > currentStep) {
      return handNext(val);
    }

    setCurrentStep(val);
  };
  const sendUserData = async (val) => {
    const data = { ...followUs.userInfo, method: followUs?.methodData?.text };
    try {
      const response = await axios.post(
        `${process.env.BACKEND_SERVER}/giveaway/folllower`,
        data
      );
      console.log("response", response);
      setId(response?.data?.data?.data?.id);
      setCurrentStep(val);
    } catch (error) {
      console.log("error-here", error);
      if (error.message === "Request failed with status code 409") {
        return setErrMessage("this email is already in the database");
      }
      setErrMessage(
        "please enter a vaild email and fullname more than 6 charactars"
      );
    }
  };
  // useEffect(() => {
  //   const fetchNewData = async (query) => {
  //     try {
  //       const response = await axios.get("links", query);
  //       const Allsocial = response.data?.data[0]?.social;
  //       delete Allsocial.facebook;
  //       delete Allsocial.tiktok;
  //       delete Allsocial.discord;
  //       setSocial(Allsocial);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   fetchNewData({ fields: "social" });
  // }, []);
  // const { indicatorsNum } = followUs;
  // useEffect(() => {
  //   if (currentStep === 3 || (currentStep === 2 && indicatorsNum === 2)) {
  //     setTimeout(() => {
  //       dispatchAction({ type: "STEPS" });
  //     }, [5000]);
  //   }
  // }, [currentStep, indicatorsNum, dispatchAction]);

  return (
    <div className={classes["container"]}>
      <div className={classes["top"]}>
        <div className={classes["indicators-wrapper"]}>
          <TopIndecator
            userInfo={followUs.userInfo}
            handleStepChange={handleStepChange}
            indicatorsNum={followUs.indicatorsNum}
            curState={currentStep}
          />
        </div>
        <Image
          onClick={() => {
            dispatchAction({ type: "DISPLAY", value: false });
          }}
          className={classes["exit"]}
          src="/svg/chat/exit-chat.svg"
          alt="exit"
          width="18"
          height="18"
        />
      </div>
      {currentStep === 1 && (
        <StepOne
          errMessage={errMessage}
          dispatchAction={dispatchAction}
          userInfo={followUs.userInfo}
          handleStepChange={handleStepChange}
        />
      )}
      {currentStep === 2 && followUs.indicatorsNum !== 2 && (
        <StepTwo
          allSocial={allSocial}
          sendUserData={sendUserData}
          joinWebsiteGroup={followUs.methodData}
          handleStepChange={handleStepChange}
        />
      )}
      {(currentStep === 3 ||
        (currentStep === 2 && followUs.indicatorsNum === 2)) && (
        <StepThree
          allSocial={allSocial}
          id={id}
          handleStepChange={handleStepChange}
        />
      )}
    </div>
  );
};

export default StepsWrapper;
