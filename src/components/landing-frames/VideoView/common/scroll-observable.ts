export interface IScrollObservable {
  parentOfSticky: Element;
  scrollingElement: (Window & typeof globalThis) | Element; // window or specific div
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
      this._process(myPar.parentOfSticky);

      inProgress = false;
    });
  };



  myPar.scrollingElement.addEventListener("scroll", handler);
}

ScrollObservable.prototype._process = function (parentfSticky: Element) {
  // const viewportHeight = document.documentElement.clientHeight;
  // const documentHeight = document.body.clientHeight;
  // const scrolled = Math.max(
  //     window.scrollY,
  //     window.pageYOffset,
  //     document.documentElement.scrollTop,
  //     document.body.scrollTop
  // );

  // const scrolledPercentage = Math.round((100 * (100 * scrolled)) / (documentHeight - viewportHeight)) / 100;

  const wrap = parentfSticky;

  if (!wrap) {
    return;
  }

  const distanceFromTop = window.scrollY + wrap.getBoundingClientRect().top;
  const rawPercentScrolled =
    (window.scrollY - distanceFromTop) / (wrap.scrollHeight - window.innerHeight);
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
