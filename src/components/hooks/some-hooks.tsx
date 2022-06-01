import { useCallback, useEffect } from "react";

interface IUseMyCoolSticky {
  parentOfSticky?: HTMLElement | null;
  theSticky?: HTMLElement | null;
  scrollWindow?: (Window & typeof globalThis) | HTMLElement | null;
}


// DEPRICATED !!!!!!!!!!!!!!!!!!!!!!!!!
// DEPRICATED !!!!!!!!!!!!!!!!!!!!!!!!!
// DEPRICATED !!!!!!!!!!!!!!!!!!!!!!!!!
// DEPRICATED !!!!!!!!!!!!!!!!!!!!!!!!!
// DEPRICATED !!!!!!!!!!!!!!!!!!!!!!!!!
export const useMyCoolSticky = (myPar: IUseMyCoolSticky) => {
  const myFn = useCallback(() => {
    if (!myPar.parentOfSticky || !myPar.theSticky) {
      return;
    }

    const heightOfParent = myPar.parentOfSticky.getBoundingClientRect().height;
    const heightOfSticky = myPar.theSticky.getBoundingClientRect().height;

    const maxTop = heightOfParent - heightOfSticky;

    const rawTopOfParent = myPar.parentOfSticky.getBoundingClientRect().top;

    if (rawTopOfParent >= 0) {
      myPar.theSticky.style.top = `${0}px`;
    } else if (-rawTopOfParent > maxTop) {
      myPar.theSticky.style.top = `${maxTop}px`;
    } else {
      myPar.theSticky.style.top = `${-rawTopOfParent}px`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myPar.parentOfSticky]);

  useEffect(() => {
    if (!myPar.theSticky || !myPar.scrollWindow) {
      return;
    }

    myPar.theSticky.style.position = "absolute";
    myPar.theSticky.style.top = "0px";

    const currScrollWindow = myPar.scrollWindow;
    currScrollWindow.addEventListener("scroll", myFn);

    return () => {
      currScrollWindow.removeEventListener("scroll", myFn);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myFn, myPar.scrollWindow]);
};
