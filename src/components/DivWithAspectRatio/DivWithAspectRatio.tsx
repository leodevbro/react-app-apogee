import React, { ReactNode } from "react";

import { cla } from "src/App";
// import { Link } from "react-router-dom";
// import { useAppSelector } from "../app/hooks";
import style from "./DivWithAspectRatio.module.scss";

export const DivWithAspectRatio: React.FC<{
  className?: string;
  classOfPaddingTop: string; // to manually adjust aspect ratio as percent
  content: ReactNode;
}> = ({ className, content, classOfPaddingTop }) => {
  return (
    <div className={cla(className, style.ground)}>
      <div className={cla(style.ground2, classOfPaddingTop)}>
        <div className={style.myDiv}>{content}</div>
      </div>
    </div>
  );
};
