The instruction link:

How to generate a single file (HTML file with all the CSS/JS inside it) from react project:

https://gist.github.com/leodevbro/9cefc7d6b880e42f29685fd9bac636bd

<br />

Source material of scroll video playback:
(We chose the "video-server-frames" method)
(We extracted jpg images from video using Photoshop)
https://www.ghosh.dev/posts/playing-with-video-scrubbing-animations-on-the-web/#1-video-current-time-demo

https://video-scrub.playground.ghosh.dev/

https://github.com/abhishekcghosh/experiment-video-scrub

<br />
<br />
<br />

**This project uses Redux-Toolkit (not classic Redux).**

Redux Toolkit uses `immer` to ensure immutable flow of state. This means you no longer need to return `{ ...state }` with every reducer.

https://redux-toolkit.js.org/api/createreducer#direct-state-mutation

Redux requires reducer functions to be pure and treat state values as immutable

And, also, important: there is not need for `return` anything in reducer, we just edit the state and that's it.

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
