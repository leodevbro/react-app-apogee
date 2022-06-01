import React, { useMemo } from "react";
import { cla } from "src/App";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import {
  changeUserStatus,
  BasicStatusOfUserT,
  AuthFlowEnum,
  UserRoleEnum,
} from "src/app/redux-slices/sweetSlice";
// import { fakeAuth, possibleAuthStatuses } from "src/app/routing/ProtectedRoutes";

import style from "./AuthSelectForTesting.module.scss";
// import { useAppSelector } from "src/app/hooks";

export const AuthSelectForTesting: React.FC<{ className?: string }> = ({ className }) => {
  // const [currAuthStatus, setCurrAuthStatus] = useState<BasicStatusOfUserT>("admin");

  const currAuthStatus = useAppSelector((store) => store.sweet.userStatus);
  const dispatch = useAppDispatch();

  const possibleAuthStatuses: BasicStatusOfUserT[] = useMemo(
    () => [
      AuthFlowEnum.notLoggedIn,
      AuthFlowEnum.pleaseCompleteYourAccount,
      AuthFlowEnum.accountConfirmationInProgress,

      UserRoleEnum.admin,
      UserRoleEnum.accounting,
      UserRoleEnum.sales,
    ],
    [],
  );

  return (
    <div className={cla(className, style.ground)}>
      <select
        disabled={false}
        value={currAuthStatus}
        onChange={(e) => {
          const val = e.target.value as BasicStatusOfUserT;
          // fakeAuth.status = val;
          // setCurrAuthStatus(fakeAuth.status);
          // console.log("val:", val);
          dispatch(changeUserStatus(val));
        }}
        className={cla(style.authSelect, style.selectCool)}
      >
        {possibleAuthStatuses.map((basicStatus, ind) => (
          <option key={basicStatus} value={basicStatus} className={style.optionOfAuthSelect}>
            {basicStatus}
          </option>
        ))}
      </select>
    </div>
  );
};
