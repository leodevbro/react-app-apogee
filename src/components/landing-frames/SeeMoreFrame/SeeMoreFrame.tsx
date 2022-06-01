import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
// import ReactDOM from "react-dom";

import { cla } from "src/App";
import style from "./SeeMoreFrame.module.scss";

import { imgs } from "src/imglinks";

import { SweetSlider } from "src/components/SweetSlider/SweetSlider";
import { IPlusObject, PlusBox } from "src/components/PlusBox/PlusBox";

export const SeeMoreFrame: React.FC<{
  className?: string;
}> = ({ className }) => {
  const { t } = useTranslation();

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
        slideImagePath: imgs.collection_1_2x,
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
        slideImagePath: imgs.collection_2_2x,
        plusBox: {
          imgSrc: imgs.color_frost_2x,
          text1: "Arrowhead",
          text2: "Wood Look Matte",
          text3: "Porcelain Tile",
        },
      },
      {
        id: "2",
        name: "Collection Name 3",
        slideImagePath: imgs.collection_3_2x,
        plusBox: {
          imgSrc: imgs.color_nest_2x,
          text1: "Arrowhead",
          text2: "Wood Look Matte",
          text3: "Porcelain Tile",
        },
      },
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

            <div className={style.foot}>
              <span className={style.name}>{x.name}</span>
            </div>
          </div>
        ),
      };
    });
  }, [slideItems]);

  return (
    <div className={cla(style.ground, className)}>
      <div className={style.mainBox}>
        <div className={style.top}>
          <span className={style.title}>{t("wantToSeeMoreWoodLookTile")}</span>
        </div>

        <div className={style.top2}>
          <span className={style.info}>{t("planxIsJustOneOfMany")}</span>
        </div>

        <div className={style.top3}>
          <span className={style.info}>{t("shopAllWoodLooks")}</span>
        </div>

        <SweetSlider
          classOfSlider={style.superSlider}
          classOfSlide={style.superSlide}
          classOfGoLeft={style.goLeft}
          classOfGoRight={style.goRight}
          slideItems={arrForSlider}
          // leftRightPaddingCss={`clamp(20px, 5%, 96px)`}
        />

        <div className={style.veryFoot}>{t("thePlanxCollectionIsThe")}</div>
      </div>
    </div>
  );
};
