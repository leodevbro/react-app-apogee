import React from "react";

import { cla } from "src/App";
// import { Link } from "react-router-dom";
// import { useAppSelector } from "../app/hooks";
import style from "./HoLine.module.scss";

export const HoLine: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  return (
    <div className={cla(className, style.ground)}>
      <span className={style.wrapSpan}>
        <span className={style.leftSide}></span>
        <span className={style.text}>{text}</span>
        <span className={style.rightSide}></span>
      </span>
    </div>
  );
};
