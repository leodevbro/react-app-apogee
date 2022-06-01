import React from "react";
import { useTranslation } from "react-i18next";
// import ReactDOM from "react-dom";
// import ReactDOM from 'react-dom';

import { cla } from "src/App";
import style from "./GreenFriendly.module.scss";

import { imgs } from "src/imglinks";

export const GreenFriendly: React.FC<{
  className?: string;
}> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <div className={cla(style.ground, className)}>
      <div className={style.mainBox}>
        <img className={style.grassImage} alt="grass" src={imgs.certification_2x} />

        <div className={style.centerBox}>
          <div className={style.title}>{t("earthFirstFlooring")}</div>
          <div className={style.desc}>{t("thePlanxCollectionIsGreenGuard")}</div>
        </div>
      </div>
    </div>
  );
};
