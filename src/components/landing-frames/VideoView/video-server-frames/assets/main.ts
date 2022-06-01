import { CreateCanvasFrameScrubber } from "../../common/canvas-frame-scrubber";
import { IScrollObservable, ScrollObservable } from "../../common/scroll-observable";
import { startProgress, stopProgress } from "../../common/utils";
import { FrameUnpacker } from "./frame-unpacker";

interface ILoadFramesOfTheVideo {
  stickyDiv: HTMLDivElement;
  parentOfSticky: HTMLDivElement;
  inputOfGeneralUrlOfFrames: HTMLInputElement;
  scrollingBox: (Window & typeof globalThis) | HTMLElement;
  classOfCanvas: string;
  urlArray?: string[];
}

export const loadFramesOfTheVideo = async (myPar: ILoadFramesOfTheVideo) => {
  startProgress();

  // let scrollingBox: (Window & typeof globalThis) | Element = window;
  // const appBody = window.document.querySelector(".appBody");
  // if (appBody && appBody.getBoundingClientRect().height < 2500) {
  //   appBody.addEventListener("scroll", handler);
  // } else {
  //   window.addEventListener("scroll", handler);
  // }

  // const theParentOfSticky = document.querySelector(
  //   `.${myPar.uniqClassOfGround} .${myPar.parentOfSticky}`,
  // );
  // const videoContainer = document.querySelector(
  //   `.${myPar.uniqClassOfGround} .${myPar.stickyDiv}`,
  // );
  // const framesUrlElement: any = document.querySelector(
  //   `.${myPar.uniqClassOfGround} input[name="frames-url"]`,
  // );

  // if (!videoContainer || !framesUrlElement || !theParentOfSticky) {
  //   // console.log(videoContainer, framesUrlElement);
  //   throw new Error("Element missing!");
  // }

  const theInput = myPar.inputOfGeneralUrlOfFrames;

  const framesUrlPattern = theInput.value;
  const framesUrlStart = parseInt(theInput.dataset.frameStart!, 10);
  const framesUrlEnd = parseInt(theInput.dataset.frameEnd!, 10);
  const framesIdPadding = parseInt(theInput.dataset.frameIdPadding!, 10);

  console.log(`Initializing frames download...`);

  console.log(`Please be patient. Downloaing ${framesUrlEnd} frames...`);

  const startTime = Date.now();

  const frames = await FrameUnpacker({
    urlPattern: framesUrlPattern,
    urlArray: myPar.urlArray,
    start: framesUrlStart,
    end: framesUrlEnd,
    padding: framesIdPadding,
  });

  const endTime = Date.now();

  console.log(`Took ${(endTime - startTime) / 1000} seconds.`);

  console.log("Painting canvas with first frame...");

  const canvas = document.createElement("canvas");
  canvas.classList.add(myPar.classOfCanvas);
  canvas.height = frames[0].height;
  canvas.width = frames[0].width;
  const context = canvas.getContext("2d");
  context?.drawImage(frames[0], 0, 0);

  myPar.stickyDiv.appendChild(canvas);

  console.log("Setting up scrubber...");

  const observer = CreateCanvasFrameScrubber(context, frames);

  const theArgs: IScrollObservable = {
    parentOfSticky: myPar.parentOfSticky,
    scrollingElement: myPar.scrollingBox,
  };

  // @ts-ignore
  const observable = new ScrollObservable(theArgs);
  observable.subscribe(observer);

  console.log("Ready! Scroll to scrub.");

  stopProgress();
};

// setTimeout(() => {
//   hh33();
// }, 3000);
