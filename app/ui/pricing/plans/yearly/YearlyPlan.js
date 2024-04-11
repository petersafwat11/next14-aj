import React from 'react'
import classes from './yearlyPlan.module.css'
import Image from 'next/image'
const YearlyPlan = () => {
  return (
    <div className={classes["yearly"]}>
    <div className={classes["save-money"]}>
      Save 50% <p></p>
    </div>
    <div className={classes["plan-header"]}>
      <h4 className={classes["header-title"]}>Yearly</h4>
      <p className={classes["header-description"]}>
        Ideal for individuals who want advanced features and quality on
        a yearly basis.
      </p>
      <h5 className={classes["price"]}>
        19.99$ <span className={classes["time"]}>/ Year</span>
      </h5>
    </div>
    <span className={classes["comming-soon"]}>Comming Soon </span>
    <div className={classes["features"]}>
      {[
        "All Sports & Leagues",
        "2k & 4k Streams",
        "Up to 10 devices simultaneously",
        "2500 + 4K Channels",
        "No Buffer/Freezing",
        "Multiple Language Streams",
        "No Adverts",
        "Chat Access",
        "Dedicated Streaming Servers",
        "Request Channels & Leagues",
        "24/7 Customer Support",
        "iOS & Android App",
        "VOD (Full-match replay)",
      ].map((feature, index) => (
        <div key={index} className={classes["supported-feature"]}>
          <Image
            src="/svg/pricing/premuim-supported.svg"
            alt="premuim-supported"
            width="24"
            height="24"
          />
          {feature}
        </div>
      ))}
    </div>
  </div>
)
}

export default YearlyPlan