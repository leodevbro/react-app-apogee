// export const CanvasFrameScrubber = (() => {
//   const create = (context: any, frames: any[]) => {
//     let currentFrame = 0;

//     const observer = {
//       next: (percentage: number) => {
//         const frameIndex = Math.floor((percentage * (frames.length - 1)) / 100);

//         if (currentFrame === frameIndex) return;

//         window.requestAnimationFrame(() => {
//           context.drawImage(frames[frameIndex], 0, 0);
//         });
//       },
//     };

//     return observer;
//   };

//   return {
//     create: create,
//   };
// })();

export const CreateCanvasFrameScrubber = (context: any, frames: any[]) => {
  let currentFrame = 0;

  const observer = {
    next: (percentage: number) => {
      const frameIndex = Math.floor((percentage * (frames.length - 1)) / 100);

      if (currentFrame === frameIndex) return;

      window.requestAnimationFrame(() => {
        context.drawImage(frames[frameIndex], 0, 0);
      });
    },
  };

  return observer;
};
