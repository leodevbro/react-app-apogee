export interface IScrollObservable {
  parentOfSticky: Element;
  scrollingElement: (Window & typeof globalThis) | Element; // window or specific div
}

export function isVisibleEl(ele: HTMLElement) {
  const { top, bottom, height } = ele.getBoundingClientRect();
  const vHeight = window.innerHeight || document.documentElement.clientHeight;

  // return (
  //   (top > 0 || bottom > 0) &&
  //   top < vHeight
  // );
  const centerPointOfDiv = top + height / 2;
  const centerPointOfVp = vHeight / 2;
  console.log(bottom);

  if (centerPointOfDiv < centerPointOfVp + 50 && centerPointOfDiv > centerPointOfVp - 50) {
    return true;
  }

  return false;
}

export function ScrollObservable(myPar: IScrollObservable) {
  // @ts-ignore
  this._observers = [];

  // using RAF as a petty debounce
  let inProgress = false;
  const handler = () => {
    if (inProgress) return;
    inProgress = true;

    window.requestAnimationFrame(() => {
      // @ts-ignore
      this._process({
        parentOfSticky: myPar.parentOfSticky,
        scrollingElement: myPar.scrollingElement,
      });

      inProgress = false;
    });
  };

  myPar.scrollingElement.addEventListener("scroll", handler);
}

ScrollObservable.prototype._process = function (pppar: IScrollObservable) {
  // const viewportHeight = document.documentElement.clientHeight;
  // const documentHeight = document.body.clientHeight;
  // const scrolled = Math.max(
  //     window.scrollY,
  //     window.pageYOffset,
  //     document.documentElement.scrollTop,
  //     document.body.scrollTop
  // );

  // const scrolledPercentage = Math.round((100 * (100 * scrolled)) / (documentHeight - viewportHeight)) / 100;

  const myView = pppar.scrollingElement as HTMLElement;
  // console.log(myView.getBoundingClientRect());

  const wrap = pppar.parentOfSticky;
  // console.log(window.scrollY);
  // console.log((myView as HTMLElement).getBoundingClientRect().top);
  // console.log(
  //   // (myView as HTMLElement).getBoundingClientRect().top -
  //   (myView as HTMLElement).scrollTop,
  // );

  const theTop = myView.scrollTop;

  if (!wrap) {
    return;
  }

  const distanceFromTop = theTop + wrap.getBoundingClientRect().top;
  console.log(distanceFromTop);
  const rawPercentScrolled = myView.scrollTop / (myView.scrollHeight - myView.clientHeight);
  // console.log(rawPercentScrolled);
  const scrolledPercentage = 100 * Math.min(Math.max(rawPercentScrolled * 1, 0), 1);

  // theFrames.sticky.style.marginTop = `${wrap.scrollHeight * scrolledPercentage / 100}px`
  //   console.log(scrolledPercentage); ::-:
  this.publish(scrolledPercentage);
};

ScrollObservable.prototype.subscribe = function (observer: any) {
  this._observers.push(observer);
};

ScrollObservable.prototype.publish = function (value: any) {
  this._observers.forEach((observer: any) => {
    observer.next(value);
  });
};
