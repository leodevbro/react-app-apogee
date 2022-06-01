import React, { useCallback, useState } from "react";

import { cla } from "src/App";
// import { Link } from "react-router-dom";
// import { useAppSelector } from "../app/hooks";
import { useDetectClickOutside } from "react-detect-click-outside";
import style from "./PlusBox.module.scss";

import { ReactComponent as PlusIcon2 } from "src/styling-constants/svg-items/plus2.svg";

import { t } from "i18next";

export interface IPlusObject {
  imgSrc: string;
  text1: string;
  text2?: string;
  text3?: string;
}

export const PlusBox: React.FC<{
  className?: string;
  classOfPlusButton?: string;
  openDir?: "left" | "right";
  content: IPlusObject;
}> = ({ className, classOfPlusButton, openDir = "right", content }) => {
  const [contentIsVis, setContentIsVis] = useState(false);

  const cl_vis_hid = contentIsVis ? style.vis : style.hid;

  const cl_dir = style[`dir${openDir}`];

  const fnForClickListener = useCallback((e) => {
    setContentIsVis((prev) => false);
  }, []);

  const ref = useDetectClickOutside({ onTriggered: fnForClickListener });

  return (
    <div ref={ref} className={cla(className, style.ground, cl_vis_hid, cl_dir)}>
      <div className={cla(style.content, cl_vis_hid)}>
        <div className={cla(style.contentIn, cl_vis_hid)}>
          <div className={style.up}>
            <div className={style.left}>
              <img className={cla(style.plankImg, cl_vis_hid)} alt="plank0" src={content.imgSrc} />
            </div>

            <div className={style.right}>
              <div className={style.infoTitle}>{content.text1}</div>
              <div className={style.infoDetails}>{content.text2}</div>
              <div className={style.infoDetailsMore}>{content.text3}</div>
            </div>
          </div>
          <div className={cla(style.down, cl_dir)}>
            <span className={style.shopButton}>{t("shopThisLook")}</span>
          </div>
        </div>
      </div>

      <div
        className={cla(style.plusButton, classOfPlusButton, cl_dir)}
        onClick={() => setContentIsVis((prev) => !prev)}
      >
        <PlusIcon2 />
      </div>
    </div>
  );
};
