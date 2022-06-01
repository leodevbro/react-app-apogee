

// export const FrameUnpacker7 = (() => {
//   const unpack = async (options: any) => {
//     const urlPattern = options.urlPattern,
//       start = options.start,
//       end = options.end,
//       padding = options.padding;

//     const bitmaps: any[] = [];
//     const calls = []; // ::-:

//     const timeStart = performance.now();

//     // download each frame image and prep it up
//     for (let index = start; index <= end; index++) {
//       // const id = index.toString().padStart(padding, "0");
//       // let url = urlPattern.replace("{{id}}", id);
//       // //   console.log(urlEbi.slice(17, 25));
//       // url = url.replace("{{seu}}", urlEbi[index].slice(17, 24));
//       const url = urlEbi[index];
//       // console.log(7);
//       //   const url = urlPattern.replace("{{se}}", urlEbi[index].slice(17));
//       //   console.log("uu", url);

//       calls.push(
//         fetch(url).then((res) =>
//           res
//             .blob()
//             .then((blob) =>
//               createImageBitmap(blob).then((bitmap) => bitmaps.push({ id: index, bitmap: bitmap })),
//             ),
//         ),
//       );
//     }

//     // wait for all the downloads to finish... (a more eager implementation that starts putting
//     // the scrubbing as soon as the first few frames are downloaded can also be done, but we'll
//     // keep thing s simple for now)
//     await Promise.all(calls);

//     // sort the downloaded frame bitmaps in order, they could have been downloaded haphazardly
//     bitmaps.sort((a, b) => {
//       return a.id - b.id;
//     });

//     // once that's done, construct an array of just frames that would be returned
//     const frames: any[] = [];
//     bitmaps.map((bitmap) => frames.push(bitmap.bitmap));

//     const timeDelta = performance.now() - timeStart;
//     console.log(`Average extraction time per frame: ${timeDelta / (end - start)}ms`);

//     return frames;
//   };

//   return {
//     unpack: unpack,
//   };
// })();

interface IFrameUnpacker {
  urlPattern?: string;
  urlArray?: string[];
  start: number;
  end: number;
  padding: number;
}

export const FrameUnpacker = async (options: IFrameUnpacker): Promise<ImageBitmap[]> => {
  if (!options.urlPattern && !options.urlArray) {
    console.log("Both of them are falsy: options.urlPattern, options.urlArray");
    return [];
  }
  const imgLinks = options.urlArray;

  const urlPattern = options.urlPattern,
    start = options.start,
    end = options.end,
    padding = options.padding;

  const bitmaps: { id: number; bitmap: ImageBitmap }[] = [];
  const calls: Promise<number>[] = []; // ::-:

  const timeStart = performance.now();

  // download each frame image and prep it up
  for (let index = start; index <= end; index++) {
    let url = "";
    const id = index.toString().padStart(padding, "0");
    if (imgLinks) {
      url = imgLinks[index];
    } else if (urlPattern) {
      url = urlPattern.replace("{{id}}", id);
    }
    // url = url.replace("{{seu}}", imgLinks[index].slice(17, 24));

    const coolPromise = fetch(url).then((res) =>
      res
        .blob()
        .then((blob) =>
          createImageBitmap(blob).then((bitmap) => bitmaps.push({ id: index, bitmap: bitmap })),
        ),
    );

    calls.push(coolPromise);
  }

  // wait for all the downloads to finish... (a more eager implementation that starts putting
  // the scrubbing as soon as the first few frames are downloaded can also be done, but we'll
  // keep thing s simple for now)
  await Promise.all(calls);

  // sort the downloaded frame bitmaps in order, they could have been downloaded haphazardly
  bitmaps.sort((a, b) => {
    return a.id - b.id;
  });

  // once that's done, construct an array of just frames that would be returned
  const frames: ImageBitmap[] = [];
  bitmaps.map((bitmapObj) => frames.push(bitmapObj.bitmap));

  const timeDelta = performance.now() - timeStart;
  console.log(`Average extraction time per frame: ${timeDelta / (end - start)}ms`);

  return frames;
};
