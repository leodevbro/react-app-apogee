import React from "react";
import { useTranslation } from "react-i18next";
// import { SweetIconBox } from "src/components/SweetIconBox/SweetIconBox";
// import { useNavigate } from "react-router-dom";
// import { useAppSelector } from "../app/hooks";
import { Component1 } from "../components/component1";

export const Page1: React.FC<{}> = () => {
  const { t } = useTranslation();

  // const navigate = useNavigate();
  // const navigRef = useRef(navigate);
  // navigRef.current = navigate;


  // useEffect(() => {
  //   setTimeout(() => {
  //     navigRef.current("/orders/123");
  //   }, 3000);
  // }, []);

  return (
    <div>
      <p style={{margin: "0px"}}>{t("p1")}</p>

      <Component1 />
    </div>
  );
};
