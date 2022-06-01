import React from "react";

import { cla } from "src/App";
// import { Link } from "react-router-dom";
// import { useAppSelector } from "../app/hooks";
import style from "./CloseButton.module.scss";

import { ReactComponent as CrossClose2Svg } from "src/styling-constants/svg-items/cross-close-2.svg";

export const CloseButton: React.FC<{
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}> = ({ className, onClick }) => {
  return (
    <div className={cla(className, style.ground)} onClick={onClick}>
      <CrossClose2Svg className={style.closeSvg} />
    </div>
  );
};
