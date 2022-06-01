import React from "react";
import { Link } from "react-router-dom";
// import { useAppSelector } from "../app/hooks";

export const Component1: React.FC<{}> = () => {
  // prettier-ignore
  return (
    <div>
      <p style={{fontFamily: "arial"}}>This is Component1 inside Page 1</p>
      <br />
      <Link style={{display: "flex"}} to={"/register"}>Go To Register (first name, last name)</Link>

      <br />
      <br />

      <Link style={{display: "flex"}} to={"/orders/1234567"}>Go To One Order page</Link>
      <br />
    </div>
  );
};
