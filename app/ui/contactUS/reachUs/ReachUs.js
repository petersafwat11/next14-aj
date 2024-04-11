import React from 'react'
import Image from "next/image";
import classes from './reachUs.module.css'
const ReachUs = () => {
  return (
    <div className={classes["contact-us-methods"]}>
    <div className={classes["contact-us-first"]}>

      <div className={classes["contact-us-item"]}>
        <Image
          className={classes["email-icon"]}
          src="/svg/contact/email.svg"
          alt="mail"
          width="27"
          height="27"
        />
        <p>info@ajsports.ch</p>
      </div>
      <div className={classes["contact-us-item"]}>
        <Image
          className={classes["phone-icon"]}
          src="/svg/contact/phone.svg"
          alt="phone"
          width="27"
          height="27"
        />
        <p>+7(4942)35-51-86</p>
      </div>
    </div>
    <div className={classes["contact-us-second"]}>
      <div className={classes["contact-us-item-second"]}>
        <Image
          className={classes["location-icon"]}
          src="/svg/contact/location.svg"
          alt=""
          width="22"
          height="30"
        />
        <p>Festival naya Ul, bld. 10, appt. 19, Kostroma, Russia</p>
      </div>
    </div>
  </div>
)
}

export default ReachUs