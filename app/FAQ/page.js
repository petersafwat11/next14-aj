import React from "react";
import classes from "./page.module.css";
import PageTitle from "../ui/pageTitle/PageTitle";
import FeedbackBtn from "./feefbackBtn/FeedbackBtn";
import { FAQ } from "./data";

export const metadata = {
  title: "FAQ | AJ Sports",
};

const Page = () => {
  return (
    <section className={classes["page"]}>
      <PageTitle title={"FAQ"} />

      <div className={classes["container"]}>
        {/* <span className={classes['back-icon']}>Back</span> */}
        <div className={classes["container-heading"]}>
          <h3 className={classes["container-heading-title"]}>
            Frequently Asked Questions
          </h3>
          <p className={classes["container-heading-para"]}>
            The ultimate sports streaming platform’s F.A.Q
          </p>
        </div>
        <div className={classes["questions-wrapper"]}>
          {FAQ.map((elem, index) => (
            <div key={index} className={classes["question-wrapper"]}>
              <h4 className={classes["question-wrapper-question"]}>
                {elem.question}
              </h4>
              <p className={classes["question-wrapper-answer"]}>
                {elem.answer}
              </p>
            </div>
          ))}
        </div>
        <div className={classes["uesr-feedback"]}>
          <h4 className={classes["uesr-feedback-heading"]}>
            Have any other questions?
          </h4>
          <p className={classes["uesr-feedback-para"]}>
            You may ask us any other question you may have by navigating to the
            contact page. Using our feedback form please enlist all the
            channels, sports, languages or leagues that you require, we will
            fulfil your needs within one week.
          </p>
          <FeedbackBtn />
        </div>
      </div>
    </section>
  );
};

export default Page;
