import Image from "next/image";
import React from "react";
import classes from "./freebiePlan.module.css";
const FreebiePlan = () => {
  return (
    <div className={classes["freebie"]}>
      <div className={classes["plan-header"]}>
        <h4 className={classes["header-title"]}>Freebie</h4>
        <p className={classes["header-description"]}>
          ideal for individuals who want to watch sports for free
        </p>
        <h5 className={classes["price"]}>
          0$ <span className={classes["time"]}>/month</span>
        </h5>
      </div>
      <div className={classes["features"]}>
        {[
          "720p & 1080p Streams",
          "Chat Access",
          "400 + FHD Channels ",
          "No Buffer/Freezing",
          "Multiple Language Streams",
          "No adverts",
          "2k & 4k Streams ",
          "700 + FHD Channels",
          "Request Channels ",
          "24/7 Customer Support",
          "Android App",
        ].map((feature, index) => (
          <div
            key={index}
            className={
              classes[index < 5 ? "supported-feature" : "not-supported-feature"]
            }
          >
            {index < 5 ? (
              <Image
                src="/svg/pricing/free-supported.svg"
                alt="free-supported"
                width="24"
                height="24"
              />
            ) : (
              <Image
                src="/svg/pricing/free-not-supported.svg"
                alt="free-not-supported"
                width="24"
                height="24"
              />
            )}
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FreebiePlan;
