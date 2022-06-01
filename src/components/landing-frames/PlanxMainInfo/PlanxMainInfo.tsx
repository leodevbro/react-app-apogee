import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
// import { useTranslation } from "react-i18next";
// import ReactDOM from "react-dom";
// import ReactDOM from 'react-dom';

import { cla } from "src/App";
import { IPlusObject, PlusBox } from "src/components/PlusBox/PlusBox";
import style from "./PlanxMainInfo.module.scss";

import { imgs } from "src/imglinks";
import { SweetSlider } from "src/components/SweetSlider/SweetSlider";

export const PlanxMainInfo: React.FC<{
  className?: string;
}> = ({ className }) => {
  const { t } = useTranslation();

  const contentOfSpecificPlus: IPlusObject = {
    imgSrc: imgs.color_frost_2x,
    text1: `Modni - Arlo Mosaic Cool Blend`,
    text2: `10 1/8" x 15 7/8" Sheet`,
    // text3: `x.plusBox.text3`,
  };

  const slideItems = useMemo(() => {
    const arr: {
      id: string;
      name: string;
      slideImagePath: string;
      plusBox: IPlusObject;
    }[] = [
      {
        id: "0",
        name: "Collection Name 1",
        slideImagePath: imgs.gallery_2_2x,
        plusBox: {
          imgSrc: imgs.color_acorn_2x,
          text1: "Arrowhead",
          text2: "Wood Look Matte",
          text3: "Porcelain Tile",
        },
      },
      {
        id: "1",
        name: "Collection Name 2",
        slideImagePath: imgs.gallery_5_2x,
        plusBox: {
          imgSrc: imgs.color_frost_2x,
          text1: "Arrowhead",
          text2: "Wood Look Matte",
          text3: "Porcelain Tile",
        },
      },
      // {
      //   id: "2",
      //   name: "Collection Name 3",
      //   slideImagePath: imgs.collection_3_2x,
      //   plusBox: {
      //     imgSrc: imgs.color_nest_2x,
      //     text1: "Arrowhead",
      //     text2: "Wood Look Matte",
      //     text3: "Porcelain Tile",
      //   },
      // },
    ];

    // return arr.slice(0, 3);
    return arr;
  }, []);

  const arrForSlider = useMemo(() => {
    return slideItems.map((x) => {
      // const contentOfPlus = (
      //   <div className={style.plusContent}>
      //     <div className={style.left}>
      //       <img className={cla(style.plankImg)} alt="tile" src={x.plusBox.shopTileImagePath} />
      //     </div>

      //     <div className={style.right}>
      //       <div className={style.text1}>{x.plusBox.text1}</div>
      //       <div className={style.text2}>{x.plusBox.text2}</div>
      //       <div className={style.text3}>{x.plusBox.text3}</div>
      //     </div>
      //   </div>
      // );

      const contentOfPlus: IPlusObject = {
        imgSrc: x.plusBox.imgSrc,
        text1: x.plusBox.text1,
        text2: x.plusBox.text2,
        text3: x.plusBox.text3,
      };

      return {
        id: x.id,
        el: (
          <div className={style.slideItem}>
            <div className={style.boxForImage}>
              <img className={style.slideImage} alt="slide item" src={x.slideImagePath} />

              <PlusBox
                className={style.plusBox}
                classOfPlusButton={style.myPlusButton}
                openDir={"right"}
                content={contentOfPlus}
              />
            </div>
          </div>
        ),
      };
    });
  }, [slideItems]);

  return (
    <div className={cla(style.ground, className)}>
      <div className={style.myAbso}></div>

      <div className={style.mainBox}>
        <div className={style.part1}>
          <div className={style.title}>{t("whereWoodJustWontDo")}</div>
          <div className={style.subtitle}>{t("whenItComesToIndoorFlooring")}</div>
          <div className={style.boxOfImage}>
            <img className={style.img} alt={"main"} src={imgs.commercial_2x} />
            <PlusBox content={contentOfSpecificPlus} className={style.plusBox} />
          </div>
        </div>

        <div className={style.part2}>
          <div className={style.box1}>
            <div className={style.titleWrap}>{t("commercial")}</div>
            <div className={style.subtitleWrap}>{t("planxWorksHardAnd")}</div>
            <div className={style.shopButtonWrap}>
              <span className={style.span}>{t("shopPlanxCollection")}</span>
            </div>
          </div>

          <div className={style.box2}>
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

        <div className={style.part3}>
          <div className={style.box0}>
            <div className={style.titleWrap}>{t("residential")}</div>
            <div className={style.subtitleWrap}>{t("creatingAWarmInviting")}</div>
            <div className={style.shopButtonWrap}>
              <span className={style.span}>{t("shopPlanxCollection")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
