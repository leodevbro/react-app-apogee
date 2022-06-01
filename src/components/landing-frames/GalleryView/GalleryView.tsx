import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
// import ReactDOM from "react-dom";

import { cla } from "src/App";
import style from "./GalleryView.module.scss";


// =======================================================================================

// Core modules imports are same as usual
import {
  Navigation,
  //  Pagination
} from "swiper";
// Direct React component imports
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";

// Styles must use direct files imports
import "swiper/swiper.scss"; // core Swiper
import "swiper/modules/navigation/navigation.scss"; // Navigation module
// import "swiper/modules/pagination/pagination.scss"; // Pagination module

import { ReactComponent as SvgOfArrowRight } from "src/styling-constants/svg-items/arrow-right-3.svg";

import pathOfNestLoft from "src/styling-constants/raster-items/nest-loft.png";
import pathOfAcornCucina from "src/styling-constants/raster-items/acorn_cucina.png";

// DEPRICATED !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export const GalleryView: React.FC<{
  className?: string;
}> = ({ className }) => {
  const { t } = useTranslation();

  const myImages = useMemo<{ id: string; path: string }[]>(() => {
    const arr: { id: string; path: string }[] = [
      { id: "0", path: pathOfNestLoft },
      { id: "1", path: pathOfAcornCucina },
      { id: "2", path: pathOfNestLoft },
      { id: "3", path: pathOfAcornCucina },
      { id: "4", path: pathOfNestLoft },
      //
      { id: "5", path: pathOfAcornCucina },
      { id: "6", path: pathOfNestLoft },
      { id: "7", path: pathOfAcornCucina },
      { id: "8", path: pathOfNestLoft },
      { id: "9", path: pathOfAcornCucina },
    ];

    return arr;
  }, []);

  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);

  return (
    <div className={cla(style.ground, className)}>
      <div className={style.mainBox}>
        <div className={style.top}>
          <span className={style.title}>{t("gallery")}</span>
        </div>

        <Swiper
          slidesPerView={"auto"}
          spaceBetween={0}
          slidesPerGroup={1}
          loop={false}
          loopFillGroupWithBlank={true}
          // pagination={{
          //   clickable: true,
          // }}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          modules={[
            // Pagination,
            Navigation,
          ]}
          className={style.mySwiper}
        >
          {myImages.map((item) => {
            return (
              <SwiperSlide key={item.id} className={style.sl}>
                <img className={style.slideImage} alt="slide item" src={item.path} />
              </SwiperSlide>
            );
          })}

          {/* ---------------------- */}

          <div ref={navigationPrevRef} className={style.goLeft}>
            <SvgOfArrowRight className={style.svgOfArrow} />
          </div>

          <div ref={navigationNextRef} className={style.goRight}>
            <SvgOfArrowRight className={style.svgOfArrow} />
          </div>
        </Swiper>
      </div>
    </div>
  );
};
