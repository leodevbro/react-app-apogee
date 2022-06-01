/*

Source material of scroll video playback:
            
https://www.ghosh.dev/posts/playing-with-video-scrubbing-animations-on-the-web/#1-video-current-time-demo

https://video-scrub.playground.ghosh.dev/

https://github.com/abhishekcghosh/experiment-video-scrub

*/

import React, { useCallback, useEffect, useMemo, useRef } from "react";
// import { useTranslation } from "react-i18next";
// import ReactDOM from "react-dom";
// import ReactDOM from 'react-dom';

import { cla } from "src/App";
import { isVisibleEl } from "./common/scroll-observable-test1";
// import { isVisibleEl } from "./common/scroll-observable";
// import { useMyCoolSticky } from "src/components/hooks/some-hooks";
import { loadFramesOfTheVideo } from "./video-server-frames/assets/main";
import style from "./VideoView.module.scss";

// const generateRandomClass = () => {
//   const randomString = Math.random().toString(36).substring(2, 7); // gyjvo, xd9st
//   const theClass = style[randomString];
//   return theClass;
// };

export const VideoView: React.FC<{
  className?: string;
  generalUrlOfImages?: string; // "./videos/frames/image{{id}}.jpg" or "https://i.ibb.co/asgh/image{{id}}.jpg"
  urlArray?: string[];
  frameCount: number;
  scrollingBox: (Window & typeof globalThis) | HTMLElement; // window or div
}> = ({ className, generalUrlOfImages, urlArray, frameCount, scrollingBox }) => {
  // const randomClassRef = useRef(generateRandomClass());
  // const { t } = useTranslation();

  // const isPlayingRef = useRef(false);

  const stickyRef = useRef<HTMLDivElement | null>(null);
  const parentOfStickyRef = useRef<HTMLDivElement | null>(null);
  const generalUrlInputRef = useRef<HTMLInputElement | null>(null);
  const customScrollBox = useRef<HTMLInputElement | null>(null);

  const intervalRef = useRef<NodeJS.Timeout | null | undefined>(null);

  const registerVideo = useCallback((queryOfWrap: string, queryOfVideo: string) => {
    const wrap = document.querySelector(queryOfWrap);
    const video: HTMLVideoElement | null = document.querySelector(queryOfVideo);
    // console.log(video);
    if (!video || !wrap) {
      return;
    }

    // for simple mp4 video (may be slow) - not working right now
    const scrollVideo = () => {
      if (video.duration) {
        // console.log(window.scrollY);
        const distanceFromTop = window.scrollY + wrap.getBoundingClientRect().top;
        const rawPercentScrolled =
          (window.scrollY - distanceFromTop) / (wrap.scrollHeight - window.innerHeight);
        // console.log(rawPercentScrolled);
        const percentScrolled = Math.min(Math.max(rawPercentScrolled, 0), 1);
        // console.log("-", percentScrolled);

        video.currentTime = video.duration * percentScrolled;
      }

      // requestAnimationFrame(scrollVideo);
    };
    // requestAnimationFrame(scrollVideo);

    // window.addEventListener("scroll", scrollVideo);
    // window.document.querySelector(".appBody")?.addEventListener("scroll", scrollVideo);
    intervalRef.current = setInterval(() => {
      scrollVideo();
      // if (!isPlayingRef.current) {
      //   isPlayingRef.current = true;
      //   video.play();
      // }
    }, 41.6);
  }, []);

  // to run registerVideo fn - currently just for my memo
  // useEffect(() => {
  //   setTimeout(() => {
  //     registerVideo(`.${uniC}`, `.${uniC} .${style.myVideo}`);
  //   }, 1000);

  //   return () => {
  //     if (inervalRef.current) {
  //       clearInterval(inervalRef.current);
  //     }
  //   };
  // }, [registerVideo, uniC]);

  useEffect(() => {
    console.log(typeof registerVideo); // just for my memo
  }, [registerVideo]);

  const mySSSFn = () => {
    if (!customScrollBox.current) {
      return;
    }
    if (isVisibleEl(customScrollBox.current)) {
      customScrollBox.current.style.border = "2px solid red";
      customScrollBox.current.style.overflowY = "scroll";
    } else {
      customScrollBox.current.style.border = "2px solid blue";
      customScrollBox.current.style.overflowY = "hidden";
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (
        !parentOfStickyRef.current ||
        !stickyRef.current ||
        !generalUrlInputRef.current ||
        !customScrollBox.current
      ) {
        console.log(
          "one of them is falsy: " +
            "parentOfStickyRef.current, " +
            "stickyRef.current, " +
            "generalUrlInputRef.current, " +
            "customScrollBox.current",
        );
        return;
      }

      window.addEventListener("scroll", mySSSFn);

      loadFramesOfTheVideo({
        stickyDiv: stickyRef.current,
        parentOfSticky: parentOfStickyRef.current,
        scrollingBox: customScrollBox.current,
        inputOfGeneralUrlOfFrames: generalUrlInputRef.current,
        urlArray: urlArray,
        classOfCanvas: style.canvas,
      });
    }, 400);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const numPaddingOfFrameId = useMemo(() => {
    if (frameCount <= 999) {
      return 3;
    } else if (frameCount <= 9999) {
      return 4;
    } else if (frameCount <= 99999) {
      return 5;
    } else {
      return 7;
    }
  }, [frameCount]);

  const inputVal = useMemo(() => {
    let val = "";

    if (urlArray && urlArray[0]) {
      val = urlArray[0];
    } else if (generalUrlOfImages) {
      val = generalUrlOfImages;
    }

    return val;
  }, [generalUrlOfImages, urlArray]);

  // useMyCoolSticky({
  //   parentOfSticky: parentOfStickyRef.current,
  //   scrollWindow: scrollingBox,
  //   theSticky: stickyRef.current,
  // });

  return (
    <div className={cla(style.ground, className)}>
      <div className={style.mainBox}>
        <div className={cla(style.scrollVideoBox)}>
          <div ref={customScrollBox} className={style.content}>
            {/* <video className={style.myVideo} width="600" muted preload={"auto"}>
              <source
                // src="https://drive.google.com/u/0/uc?id=18Pcx6EvQd_cJGxuBpL0V8XaaUqIn44G0&export=download#.mp4"
                // src="https://drive.google.com/u/0/uc?id=1kXlaI09ofjGAikk_q8epzHdwzB15-VoC&export=download#.mp4"
                // src="https://drive.google.com/u/0/uc?id=1vBj1juYBYObYSoZWT2LQYu2CbWtI0Okz&export=download#.mp4"
                // src="https://drive.google.com/u/0/uc?id=1SxiACf_-QlX_86MwSjy-Gs0c9IhaBCDJ&export=download#.mp4"

                // src="https://drive.google.com/u/0/uc?id=1a7u7Sm3qNrhw9sNDYEy80wCgxLMh709_&export=download#.mp4"

                // src="https://drive.google.com/u/0/uc?id=1oi5Xrgxc2j7dKMzK2_4G-BT3nz0tpUet&export=download#.mp4"
                src={videoUrl}
                type="video/mp4"
              />
              <p>Your user agent does not support the HTML5 Video element.</p>
            </video> */}

            <div ref={parentOfStickyRef} className={style.parentOfSticky}>
              <section ref={stickyRef} className={style.theSticky}>
                <input
                  ref={generalUrlInputRef}
                  name="frames-url"
                  type="hidden"
                  // value="./videos/frames/image{{id}}.jpg"
                  value={inputVal}
                  data-frame-start={"1"}
                  // data-frame-end="284"
                  data-frame-end={frameCount}
                  data-frame-id-padding={String(numPaddingOfFrameId)}
                />
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
