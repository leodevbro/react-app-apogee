import React from "react";

import { cla } from "src/App";
// import { Link } from "react-router-dom";
// import { useAppSelector } from "../app/hooks";
import style from "./SubTitle.module.scss";

export const SubTitle: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  return (
    <div className={cla(className, style.subTitle)}>
      <span className={style.wrapSpan}>{text}</span>
    </div>
  );
};
