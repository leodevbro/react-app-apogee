import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
// import ReactDOM from "react-dom";

import { cla } from "src/App";
import style from "./GalleryView2.module.scss";

import { imgs } from "src/imglinks";

import { SweetSlider } from "src/components/SweetSlider/SweetSlider";

export const GalleryView2: React.FC<{
  className?: string;
}> = ({ className }) => {
  const { t } = useTranslation();

  const myImages = useMemo<{ id: string; path: string }[]>(() => {
    const arr: { id: string; path: string }[] = [
      { id: "0", path: imgs.gallery_1_2x },
      { id: "1", path: imgs.gallery_2_2x },
      { id: "2", path: imgs.gallery_3_2x },
      { id: "3", path: imgs.gallery_4_2x },
      { id: "4", path: imgs.gallery_5_2x },
      //
      { id: "5", path: imgs.gallery_6_2x },
      { id: "6", path: imgs.gallery_7_2x },
      { id: "7", path: imgs.gallery_8_2x },
    ];

    return arr;
  }, []);

  const arrForSlider = useMemo(() => {
    return myImages.map((x) => {
      return {
        id: x.id,
        el: <img className={style.slideImage} alt="slide item" src={x.path} />,
      };
    });
  }, [myImages]);

  return (
    <div className={cla(style.ground, className)}>
      <div className={style.mainBox}>
        <div className={style.top}>
          <span className={style.title}>{t("gallery")}</span>
        </div>

        <SweetSlider
          classOfSlider={style.superSlider}
          classOfSlide={style.superSlide}
          classOfGoLeft={style.goLeft}
          classOfGoRight={style.goRight}
          slideItems={arrForSlider}
          // leftRightPaddingCss={`clamp(20px, 5%, 96px)`}
        />
      </div>
    </div>
  );
};
