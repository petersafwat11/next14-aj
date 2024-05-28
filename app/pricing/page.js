import Image from "next/image";
import classes from "./page.module.css";
import PageTitle from "../ui/pageTitle/PageTitle";
import InputGroup from "../ui/pricing/inputGroup/InputGroup";
import Social from "../ui/pricing/social/Social";
import Plans from "../ui/pricing/plans/Plans";
// import RemainingTime from "../ui/pricing/remainingTime/RemainingTime";

export const metadata = {
  title: "Pricing | AJ Sports",
};


const page = () => {
  return (
    <main className={classes["pricing"]}>
      <div className={classes["div-title"]}>
        <PageTitle title={"PRICING"} />
      </div>

      <section className={classes["notify-me"]}>
        <div className={classes[["container"]]}>
          <div className={classes["right"]}>
            {/* <RemainingTime /> */}
            <h2 className={classes["title"]}>
              All Good Things Come to Those who Wait...
            </h2>
            <div className={classes["input-group"]}>
              <InputGroup />
            </div>
          </div>
          <div className={classes["left"]}>
            <Image
              className={classes["rocket-icon"]}
              src="/svg/pricing/rocket-icon.svg"
              alt="faster"
              width="238"
              height="242"
            />
          </div>
          <div className={classes["input-group-mobile"]}>
            <InputGroup />
          </div>
        </div>
        <Social />
      </section>
      <span className={classes["devider"]}></span>
      <h3 className={classes["sub-title"]}>Our Packages</h3>
      <div className={classes["plans"]}>
        <Plans />
      </div>
      <span className={classes["devider-2"]}></span>

      <h3 className={classes["comming-soon"]}>
        Coming <span>Soon!</span>
      </h3>
    </main>
  );
};

export default page;
