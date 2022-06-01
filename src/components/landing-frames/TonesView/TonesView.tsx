import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
// import ReactDOM from "react-dom";
// import ReactDOM from 'react-dom';

import { cla } from "src/App";
import style from "./TonesView.module.scss";

import { imgs } from "src/imglinks";
import { DivWithAspectRatio } from "src/components/DivWithAspectRatio/DivWithAspectRatio";

export const TonesView: React.FC<{
  className?: string;
}> = ({ className }) => {
  const { t } = useTranslation();

  const [selectedToneIndex, setSelectedToneIndex] = useState(0);

  const arrayOfTonePairs = useMemo(() => {
    const arr: {
      id: string;
      name: string;
      tileImgSrc: string;
      plankImgSrc: string;
      perspectiveImgSrc: string;
    }[] = [
      {
        id: "0",
        name: t("frost"),
        tileImgSrc: imgs.color_frost_2x,
        plankImgSrc: imgs.color_acorn_frost_2x,
        perspectiveImgSrc: imgs.color_frost_large_2x,
      },

      {
        id: "1",
        name: t("acorn"),
        tileImgSrc: imgs.color_acorn_2x,
        plankImgSrc: imgs.color_acorn_acorn_2x,
        perspectiveImgSrc: imgs.color_acorn_large_2x,
      },

      {
        id: "2",
        name: t("nest"),
        tileImgSrc: imgs.color_nest_2x,
        plankImgSrc: imgs.color_nest_2x,
        perspectiveImgSrc: imgs.color_nest_large_2x,
      },

      {
        id: "3",
        name: t("bark"),
        tileImgSrc: imgs.color_bark_2x,
        plankImgSrc: imgs.color_bark_small_2x,
        perspectiveImgSrc: imgs.color_bark_large_2x,
      },

      {
        id: "4",
        name: t("meadow"),
        tileImgSrc: imgs.color_meadow_2x,
        plankImgSrc: imgs.color_acorn_meadow_2x,
        perspectiveImgSrc: imgs.color_meadow_large_2x,
      },
    ];

    return arr;
  }, [t]);

  return (
    <div className={cla(style.ground, className)}>
      <div className={style.mainBox}>
        <div className={style.title}>{t("woodTonesAndWarmVibes")}</div>
        <div className={style.descAndFrost}>
          <div className={style.desc}>{t("thePlanxCollectionEffortlesslyCaptures")}</div>
          <div className={style.frost}>
            <div className={style.frostWrap}>
              <div className={style.textOfFrost}>{arrayOfTonePairs[selectedToneIndex].name}</div>
              <div className={style.toneBoxes}>
                {[0, 1, 2, 3, 4].map((item, index) => {
                  const isSelected = index === selectedToneIndex;
                  const cl_selected = isSelected ? style.selected : "";

                  return (
                    <div key={index} className={cla(style.toneBox, cl_selected)}>
                      <div
                        className={style.innerBox}
                        onClick={() => setSelectedToneIndex(index)}
                      ></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className={cla(style.visuals, style[`tone${selectedToneIndex}`])}>
          <div className={style.version1}>
            <DivWithAspectRatio
              classOfPaddingTop={style.myAspectRatio}
              content={
                <div className={style.parent}>
                  <div className={style.left}>
                    <img
                      className={style.meadowImage}
                      alt="tone view"
                      src={arrayOfTonePairs[selectedToneIndex].perspectiveImgSrc}
                    />
                  </div>

                  <div className={style.right}>
                    <img
                      className={style.plankImage}
                      alt="tone view of plank"
                      src={arrayOfTonePairs[selectedToneIndex].tileImgSrc}
                    />
                  </div>

                  <div className={style.rightDown}>
                    <img
                      className={cla(style.plankImage2, {
                        [style.tricky]: arrayOfTonePairs[selectedToneIndex].name === t("nest"),
                      })}
                      alt="tone view of plank"
                      src={arrayOfTonePairs[selectedToneIndex].plankImgSrc}
                    />

                    <div className={style.theSize}>{`12" x 72"`}</div>
                  </div>
                </div>
              }
            />
          </div>

          {/* <div className={style.version2}>4546465</div> */}
        </div>
      </div>
    </div>
  );
};
