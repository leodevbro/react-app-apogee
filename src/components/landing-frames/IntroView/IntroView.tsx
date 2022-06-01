import React, { useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
// import ReactDOM from "react-dom";
// import ReactDOM from 'react-dom';

import { cla } from "src/App";
import style from "./IntroView.module.scss";

import { imgs } from "src/imglinks";

// import { ReactComponent as SvgOfPlus } from "src/styling-constants/svg-items/more-btn.svg";
import { IPlusObject, PlusBox } from "src/components/PlusBox/PlusBox";
import { useMediaQuery } from "react-responsive";
// import { useMyCoolSticky } from "src/components/hooks/some-hooks";

export const IntroView: React.FC<{
  className?: string;
  scrollingBox: (Window & typeof globalThis) | HTMLElement; // window or div
}> = ({ className, scrollingBox }) => {
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const parentOfStickyRef = useRef<HTMLDivElement | null>(null);

  const { t } = useTranslation();

  const is700AndDown = useMediaQuery({ query: "(max-width: 700px)" });

  const isMobileRef = useRef(is700AndDown);
  isMobileRef.current = is700AndDown;

  const plusContent: IPlusObject = {
    imgSrc: imgs.color_acorn,
    text1: `Modni - Arlo Mosaic Cool Blend`,
    text2: `10 1/8" x 15 7/8" Sheet`,
  };

  const registerFn = useCallback(() => {
    const scrollBox = window.document.querySelector(".appBody");
    const wrap = document.querySelector(`.${style.ground}`);
    const manip = document.querySelector(`.${style.introDescription}`) as any;
    if (!wrap || !scrollBox || !manip) {
      return;
    }
    // video.currentTime = video.duration;

    // 0, 2.5, 5.7, 9, 12.4

    // 41.6

    // video.addEventListener("timeupdate", function () {
    //   if (video.currentTime > 2.5) {
    //     video.pause();
    //   }
    // });

    // clip-path: inset(0% 100% 0% 0% round 0px);

    const scrollFn = () => {
      // console.log(window.scrollY, wrap.getBoundingClientRect().top);
      const distanceFromTop = window.scrollY + wrap.getBoundingClientRect().top;
      // console.log(window.scrollY);

      const rawPercentScrolled =
        (window.scrollY - distanceFromTop) / (wrap.scrollHeight - window.innerHeight);
      // console.log(window.scrollY, distanceFromTop);
      const percentScrolled = 100 * Math.min(Math.max(rawPercentScrolled * 1, 0), 1);
      // console.log("=", percentScrolled);
      // manip.style.clipPath = `inset(0% ${percentScrolled <= 35 ? 0 : 100}% 0% 0% round 0px)`;

      if (isMobileRef.current) {
        manip.style.clipPath = `inset(0% 0% ${percentScrolled}% 0% round 0px)`;
      } else {
        manip.style.clipPath = `inset(0% ${percentScrolled}% 0% 0% round 0px)`;
      }
    };

    // console.log(boxToResize, wrap);
    window.addEventListener("scroll", scrollFn);
    scrollBox?.addEventListener("scroll", scrollFn);
    // setInterval(() => {
    //   scrollVideo();
    // }, 41.66);

    /* The encoding is super important here to enable frame-by-frame scrubbing. */

    // ffmpeg -i ~/Downloads/Toshiba\ video/original.mov -movflags faststart -vcodec libx264 -crf 23 -g 1 -pix_fmt yuv420p output.mp4
    // ffmpeg -i ~/Downloads/Toshiba\ video/original.mov -vf scale=960:-1 -movflags faststart -vcodec libx264 -crf 20 -g 1 -pix_fmt yuv420p output_960.mp4
  }, []);

  useEffect(() => {
    setTimeout(() => {
      registerFn();
    }, 100);
  }, [registerFn]);

  // useMyCoolSticky({
  //   parentOfSticky: parentOfStickyRef.current,
  //   scrollWindow: scrollingBox,
  //   theSticky: stickyRef.current,
  // });

  return (
    <div className={cla(style.ground, className)}>
      <div ref={parentOfStickyRef} className={style.ground2}>
        <div ref={stickyRef} className={style.wrapHelp}>
          <div className={style.topHelp}></div>

          <div className={style.mainBox}>
            <img className={style.introImg} alt="intro" src={imgs.home_banner_2x} />
            <div className={style.introDescription}>
              <div className={style.textView}>
                <div className={style.title}>{t("widePlankHighStyle")}</div>
                <div className={style.desc}>{t("achieveTheLuxuriousLook")}</div>
                <div className={style.more}>
                  <span className={style.learnMore}>{t("learnMore")}</span>
                </div>
              </div>
            </div>

            <div className={style.pBox}>
              {/* <img className={style.introImg} alt="intro" src={imgs.home_banner_2x} /> */}
              <PlusBox
                className={style.plusBox}
                classOfPlusButton={style.myPlusButton}
                openDir={"left"}
                content={plusContent}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
