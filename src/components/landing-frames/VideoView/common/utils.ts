
// Logging
// export const logContainer = document.getElementById('comments');
// const log = (text: string) => {
//     if (logContainer) {
//         logContainer.innerHTML += text + '\n';
//     } else {
//         console.log(text);
//     }
// };

// Loading indicator
export const startProgress = () => {
    document.documentElement.classList.add('cursor-loading');
};

export const stopProgress = () => {
    document.documentElement.classList.remove('cursor-loading');
};

// average over an array
// const average = (arr: any[]) => {
//     return (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2);
// };

// promise with timeout
// const withTimeout = async (promise: any, timeout: any) => {
//     return new Promise(async (resolve, reject) => {
//         setTimeout(() => {
//             reject(`Promise ${promise} timed out at ${timeout}ms`);
//         }, timeout);

//         await promise;
//         resolve(promise);
//     });
// };
