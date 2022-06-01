import React from "react";

import { cla } from "src/App";
// import { Link } from "react-router-dom";
// import { useAppSelector } from "../app/hooks";
import style from "./MediumTitle.module.scss";

export const MediumTitle: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  return (
    <div className={cla(className, style.ground)}>
      <span className={style.wrapSpan}>{text}</span>
    </div>
  );
};
