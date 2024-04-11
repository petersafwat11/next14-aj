"use client";
import React, { useState } from "react";
import FreebiePlan from "./freebie/FreebiePlan";
import MonthlyPlan from "./monthly/MonthlyPlan";
import YearlyPlan from "./yearly/YearlyPlan";
import classes from "./plans.module.css";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

const Plans = () => {
  return (
    <div className={classes["container"]}>
      <div className={classes["slider-wrapper"]}>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          modules={[Navigation, Pagination, EffectCoverflow]}
          className={classes["swiper_container"]}
        >
          <SwiperSlide className={classes["swiper-slidee"]}>
            <FreebiePlan />
          </SwiperSlide>
          <SwiperSlide className={classes["swiper-slidee"]}>
            <MonthlyPlan />
          </SwiperSlide>
          <SwiperSlide className={classes["swiper-slidee"]}>
            <YearlyPlan />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className={classes["plans"]}>
        <FreebiePlan />
        <YearlyPlan />
        <MonthlyPlan />
      </div>
    </div>
  );
};

export default Plans;
