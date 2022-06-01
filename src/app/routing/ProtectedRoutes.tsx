import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { AuthFlowEnum, BasicStatusOfUserT, UserRoleEnum } from "../redux-slices/sweetSlice";

export const asyncDoWait = async (wait: number): Promise<"done"> => {
  return new Promise((resolve) => setTimeout(() => resolve("done"), wait));
};

export const useAuthCheck = (args?: { forcedValue?: BasicStatusOfUserT }): BasicStatusOfUserT => {
  const forcedValue = args?.forcedValue;

  const userStatus = useAppSelector((store) => store.sweet.userStatus);

  if (forcedValue) {
    return forcedValue;
  }
  return userStatus;
};

export const ProtectedRoutesWrapper: React.FC<{}> = () => {
  const authStatusOfthisUser = useAuthCheck();
  const location = useLocation();

  if (
    (
      [UserRoleEnum.admin, UserRoleEnum.accounting, UserRoleEnum.sales] as BasicStatusOfUserT[]
    ).includes(authStatusOfthisUser)
  ) {
    return <Outlet />;
  }

  if (
    location.pathname.includes("/ideabooks") &&
    (
      [
        UserRoleEnum.admin,
        UserRoleEnum.accounting,
        UserRoleEnum.sales,
        AuthFlowEnum.pleaseCompleteYourAccount,
        AuthFlowEnum.accountConfirmationInProgress,
      ] as BasicStatusOfUserT[]
    ).includes(authStatusOfthisUser)
  ) {
    return <Outlet />;
  }

  if (
    (
      [
        AuthFlowEnum.pleaseCompleteYourAccount,
        AuthFlowEnum.accountConfirmationInProgress,
      ] as BasicStatusOfUserT[]
    ).includes(authStatusOfthisUser) &&
    location.pathname === "/profile"
  ) {
    return <Outlet />;
  }

  if (
    (
      [
        AuthFlowEnum.pleaseCompleteYourAccount,
        AuthFlowEnum.accountConfirmationInProgress,
      ] as BasicStatusOfUserT[]
    ).includes(authStatusOfthisUser)
  ) {
    return (
      <div>
        <span>Your account is not yet completed (You can go to </span>
        <Link to={"/profile"}>profile page</Link>
        <span> to complete your account)</span>
      </div>
    );
  }

  if (([AuthFlowEnum.notLoggedIn] as BasicStatusOfUserT[]).includes(authStatusOfthisUser)) {
    // return <Navigate to={"/"} />;
    return (
      <div>
        <span>You are not logged in (You can go to </span>
        <Link to={"/"}>home page</Link>
        <span>)</span>
      </div>
    );
  }

  return (
    <div>
      <Link to={"/"}>Thinking... (You can go to home page)</Link>
    </div>
  );
};
