
export function WheelObservable() {
    // @ts-ignore
    this._observers = [];
    // @ts-ignore
    this._wheelValue = 0;

    // using RAF as a petty debounce
    let inProgress = false;
    const handler = (event: any) => {
        if (inProgress) return;
        inProgress = true;

        window.requestAnimationFrame(() => {
            // @ts-ignore
            this._process(event.deltaY);

            inProgress = false;
        });
    };

    window.addEventListener('wheel', handler);
}

WheelObservable.prototype._process = function(signal: number) {
    this._wheelValue += signal;
    this._wheelValue = Math.max(this._wheelValue, 0);
    this._wheelValue = Math.min(this._wheelValue, 10000);

    this.publish(this._wheelValue / 100);
};

WheelObservable.prototype.subscribe = function(observer: any) {
    this._observers.push(observer);
};

WheelObservable.prototype.publish = function(value: any) {
    this._observers.forEach((observer: any) => {
        observer.next(value);
    });
};
