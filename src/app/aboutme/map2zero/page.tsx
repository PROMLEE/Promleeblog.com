"use client";

import React from "react";
import { Navigation, Scrollbar, Mousewheel } from "swiper/modules";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
// import "swiper/css/pagination";
import {
  Page1,
  Page2,
  Page3,
  Page4,
  Page5,
  Page6,
  Page7,
} from "@/components/aboutme/map2zero";

const slideData = [
  <Page1 key={"map2zero-page1"} />,
  <Page2 key={"map2zero-page2"} />,
  <Page3 key={"map2zero-page3"} />,
  <Page4 key={"map2zero-page4"} />,
  <Page5 key={"map2zero-page5"} />,
  <Page6 key={"map2zero-page6"} />,
  <Page7 key={"map2zero-page7"} />,
];

const Page = () => {
  SwiperCore.use([Navigation, Scrollbar, Mousewheel]);
  return (
    <div className="my-10">
      <h1 className="my-5 text-5xl font-bold text-blue-700 dark:text-blue-400">
        Map: 2 Zero
      </h1>
      <Swiper
        scrollbar={{ draggable: true }}
        spaceBetween={50}
        mousewheel={{
          invert: false,
        }}
        centeredSlides={true}
        pagination={{ clickable: true }}
        modules={[Pagination]}
      >
        {slideData.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="prose my-1 mt-10 flex w-full select-none justify-center rounded-xl p-5 dark:prose-invert xl:h-[45rem]">
              {slide}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Page;
