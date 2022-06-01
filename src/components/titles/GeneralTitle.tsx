import React from "react";

import { cla } from "src/App";
// import { Link } from "react-router-dom";
// import { useAppSelector } from "../app/hooks";
import style from "./GeneralTitle.module.scss";

export const GeneralTitle: React.FC<{ text: string; className?: string }> = ({
  text,
  className,
}) => {
  return (
    <div className={cla(className, style.genTitle)}>
      <span className={style.wrapSpan}>{text}</span>
    </div>
  );
};
