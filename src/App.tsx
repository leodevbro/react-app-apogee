import React, { useEffect, useRef } from "react";
import {
  // BrowserRouter as BroRouter,
  Routes,
  Route,
  // Navigate,
  // Link,
  useLocation,
  // Link
} from "react-router-dom";

import "./App.scss";
import { ProtectedRoutesWrapper } from "./app/routing/ProtectedRoutes";

// import { TopRibbon } from "src/components/TopRibbon/TopRibbon";
import { Page1 } from "./pages/page1";
import { LangSelect } from "./components/LangSelect/LangSelect";
import classnames from "classnames";
import { useTranslation } from "react-i18next";

// import { AuthSelectForTesting } from "./components/LangSelect/AuthSelectForTesting";

// import { Footer } from "./components/Footer/Footer";

// import { OneOrder } from "./pages/OneOrder/OneOrder";

import { SweetArrow } from "./components/SweetDrop/SweetArrow";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { changeShowDevControl } from "./app/redux-slices/sweetSlice";
import { TheLanding } from "./pages/TheLanding/TheLanding";
// import { Sidebar } from "./components/Sidebar/Sidebar";

// import { useMediaQuery } from "react-responsive";
// import { Sidebar2 } from "./components/Sidebar2/Sidebar2";
// import { Sidebar3 } from "./components/Sidebar3/Sidebar3";

export const cla = classnames;

export type LangsT = "en" | "ka" | "ru";

const changeLangAttributeOnRoot = (newLang: LangsT) => {
  const superRoot = window.document.querySelector(".rootoflanding01") as
    | HTMLElement
    | null
    | undefined;
  if (superRoot) {
    // superRoot.dataset.lang = newLang; // [data-lang="en"] or [data-lang="ru"] or .......
    superRoot.setAttribute("data-lang", newLang); // [data-lang="en"] or [data-lang="ru"] or .......
  }
};

const App: React.FC = () => {
  const { i18n } = useTranslation();

  const appBodyRef = useRef<HTMLDivElement | null>(null);
  const wrapOfAppBodyRef = useRef<HTMLDivElement | null>(null);
  const { pathname } = useLocation();

  const storeOfStates = useAppSelector((store) => store);

  const currDevControlStatus = storeOfStates.sweet.showDevControl;
  // const currShowFullSidebarForDesktop = storeOfStates.sweet.showFullSidebarForDesktop;
  // const currShowSidebarForMobile = storeOfStates.sweet.showSidebarForMobile;

  // const is1004AndDown = useMediaQuery({ query: "(max-width: 1004px)" });

  // const showSb = useMemo(() => {
  //   return (
  //     (!is1004AndDown && currShowFullSidebarForDesktop) || (is1004AndDown && currShowSidebarForMobile)
  //   );
  // }, [currShowFullSidebarForDesktop, currShowSidebarForMobile, is1004AndDown]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (appBodyRef.current) {
      appBodyRef.current.scrollTo(0, 0);
    }
  }, [pathname]);

  useEffect(() => {
    changeLangAttributeOnRoot(i18n.language as LangsT);
  }, [i18n.language]);

  const land = appBodyRef.current && wrapOfAppBodyRef.current && (
    <TheLanding wrapOfMainAppBody={wrapOfAppBodyRef.current} mainAppBody={appBodyRef.current} />
  );

  return (
    <div className={"AppWrap"}>
      <SweetArrow
        className={cla("devControlArrow")}
        togglerByParent={{
          position: currDevControlStatus ? "toUp" : "toDown",
          toggleFn: () => dispatch(changeShowDevControl(!currDevControlStatus)),
        }}
      />

      <div className={cla("devControl", { showDevControl: currDevControlStatus })}>
        <LangSelect />
        {/* <AuthSelectForTesting /> */}
      </div>

      <div className={"App"} id={"appframe"}>
        <div className="appPopupPortal"></div>

        <div className="appTop">{/* <TopRibbon /> */}</div>

        <div className={"appBodyWrap"} ref={wrapOfAppBodyRef}>
          {/* <div className={cla("sidebarContainer2", showSb ? "showSb" : "hideSb")}> */}
          {/* <Sidebar3 /> */}
          {/* </div> */}

          <div className={"appBody"} ref={appBodyRef}>
            <div className={"mainBody"}>
              <Routes>
                <Route path={"/"} element={land} />
                <Route path={"/pages"} element={<Page1 />} />

                <Route element={<ProtectedRoutesWrapper />}>
                  {/* <Route path={"/orders/:orderId"} element={<OneOrder />} /> */}
                </Route>

                {/* <Route path={"*"} element={<Navigate to={"/"} />} /> */}
                <Route
                  path={"*"}
                  // element={
                  //   <div>
                  //     <span>Page not found (You can go to </span>
                  //     <Link to={"/"}>home page</Link>
                  //     <span>)</span>
                  //   </div>
                  // }
                  element={land}
                />
              </Routes>
            </div>

            <div className="appFoot">{/* <Footer /> */}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const appModalPortalObj: {
  v: Element | null;
  passed300: boolean;
} = {
  v: null,
  passed300: false,
};

window.addEventListener("load", function () {
  setTimeout(() => {
    appModalPortalObj.v = window.document.querySelector(".appPopupPortal");
    appModalPortalObj.passed300 = true;
  }, 300);
});

export default App;
