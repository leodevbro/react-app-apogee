import React, { useEffect, useRef, useState } from "react";
import { FindPlanx } from "src/components/landing-frames/FindPlanx/FindPlanx";
// import { GalleryView } from "src/components/landing-frames/GalleryView/GalleryView";
import { GalleryView2 } from "src/components/landing-frames/GalleryView2/GalleryView2";
import { GreenFriendly } from "src/components/landing-frames/GreenFriendly/GreenFriendly";
// import { useTranslation } from "react-i18next";
// import { useParams } from "react-router-dom";
// import { cla } from "src/App";
import { IntroView } from "src/components/landing-frames/IntroView/IntroView";
import { PlanxMainInfo } from "src/components/landing-frames/PlanxMainInfo/PlanxMainInfo";
import { PlanxTable } from "src/components/landing-frames/PlanxTable/PlanxTable";
import { SeeMoreFrame } from "src/components/landing-frames/SeeMoreFrame/SeeMoreFrame";
import { TheFinerPoints } from "src/components/landing-frames/TheFinerPoints/TheFinerPoints";
import { TonesView } from "src/components/landing-frames/TonesView/TonesView";
import { VideoView } from "src/components/landing-frames/VideoView/VideoView";
import { urlArrayOfVideoFrames } from "src/imglinks";
// import { AuthFlowEnum, BasicStatusOfUserT, UserRoleEnum } from "src/app/redux-slices/sweetSlice";
// import { useAuthCheck } from "src/app/routing/ProtectedRoutes";

// import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";
// import { AuthFlowEnum } from "src/app/redux-slices/sweetSlice";
// import { useAuthCheck } from "src/app/routing/ProtectedRoutes";

import style from "./TheLanding.module.scss";
// import { CloseButton } from "src/components/CloseButton/CloseButton";

export const TheLanding: React.FC<{
  mainAppBody: HTMLElement;
  wrapOfMainAppBody: HTMLElement;
}> = ({ mainAppBody, wrapOfMainAppBody }) => {
  // const params = useParams();
  // const { t } = useTranslation();
  // const basicStatusOfUser = useAuthCheck();

  // const navigate = useNavigate();

  // const isFullyLoggedIn = useMemo(() => {
  //   return (
  //     [UserRoleEnum.admin, UserRoleEnum.accounting, UserRoleEnum.sales] as BasicStatusOfUserT[]
  //   ).includes(basicStatusOfUser);
  // }, [basicStatusOfUser]);

  // const { t } = useTranslation();

  const [videoCanRender, setVideoCanRender] = useState(false);
  const scrollBoxRef = useRef<(Window & typeof globalThis) | HTMLElement>(window);

  useEffect(() => {
    setTimeout(() => {
      if (mainAppBody.getBoundingClientRect().height <= window.innerHeight) {
        scrollBoxRef.current = mainAppBody;
      } else {
        wrapOfMainAppBody.style.overflow = "initial"; // this helps sticky element to work
        mainAppBody.style.overflow = "initial"; // this helps sticky element to work
        (document.querySelector(":root") as HTMLElement).style.overflow = "initial"; // this helps sticky element to work
      }
      setVideoCanRender((prev) => true);
    }, 200);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={style.ground}>
      <div className={style.center}>
        <IntroView scrollingBox={scrollBoxRef.current} />
        <TonesView />

        {videoCanRender && (
          <VideoView
            frameCount={urlArrayOfVideoFrames.length - 1}
            scrollingBox={scrollBoxRef.current}
            // generalUrlOfImages={"./videos/frames/image{{id}}.jpg"}
            urlArray={urlArrayOfVideoFrames}
          />
        )}

        <PlanxMainInfo />
        <PlanxTable />
        {/* aaaa */}
        {/* <GalleryView /> */}
        <GalleryView2 />
        <FindPlanx />
        <GreenFriendly />
        <TheFinerPoints />
        <SeeMoreFrame />
      </div>
    </div>
  );
};
