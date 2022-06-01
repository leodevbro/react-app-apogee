import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
// import ReactDOM from "react-dom";

import { cla } from "src/App";
import style from "./FindPlanx.module.scss";

import { imgs } from "src/imglinks";

import { SweetSlider } from "src/components/SweetSlider/SweetSlider";

export const FindPlanx: React.FC<{
  className?: string;
}> = ({ className }) => {
  const { t } = useTranslation();

  const myData = useMemo(() => {
    const arr: { id: string; imgPath: string; headText: string; footText: string }[] = [
      { id: "0", imgPath: imgs.sample_frost_2x, headText: t("frost"), footText: t("orderSample") },
      { id: "1", imgPath: imgs.sample_acorn_2x, headText: t("acorn"), footText: t("orderSample") },
      { id: "2", imgPath: imgs.sample_nest_2x, headText: t("nest"), footText: t("orderSample") },
      { id: "3", imgPath: imgs.sample_bark_2x, headText: t("bark"), footText: t("orderSample") },
      {
        id: "4",
        imgPath: imgs.sample_meadow_2x,
        headText: t("meadow"),
        footText: t("orderSample"),
      },
    ];

    return arr;
  }, [t]);

  const arrForSlider = useMemo(() => {
    return myData.map((x) => {
      return {
        id: x.id,
        el: (
          <div className={style.elOfSlide}>
            <div className={style.head}>
              <span className={style.span}>{x.headText}</span>
            </div>

            <div className={style.mid}>
              <img className={style.slideImage} alt="slide item" src={x.imgPath} />
            </div>

            <div className={style.foot}>
              <span className={style.span}>{x.footText}</span>
            </div>
          </div>
        ),
      };
    });
  }, [myData]);

  return (
    <div className={cla(style.ground, className)}>
      <div className={style.mainBox}>
        <div className={style.top}>
          <span className={style.title}>{t("findYourPerfectPlanx")}</span>
        </div>

        <div className={style.top2}>
          <span className={style.text}>{t("startYourSearch")}</span>
        </div>

        <SweetSlider
          classOfSlider={style.superSlider}
          classOfSlide={style.superSlide}
          classOfGoLeft={style.goLeft}
          classOfGoRight={style.goRight}
          slideItems={arrForSlider}
          // leftRightPaddingCss={`clamp(20px, 5%, 96px)`}
        />

        <div className={style.footForButton}>
          <span className={style.shopButton}>{t("shopPlanxCollection")}</span>
        </div>
      </div>
    </div>
  );
};
