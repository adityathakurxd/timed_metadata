## Video Demo - Timed Metadata

![ezgif-1-c70ff47024](https://user-images.githubusercontent.com/53579386/215106059-f13e41f1-4306-4fb6-be5c-3d6fc9a52b56.gif)


## How to setup project?
- Fork and Clone the repository.
- Add the crendentials (sent over channel) to `.env` .
- Run `npm start` to launch the project in the browser.

## Issues 
1. Review required on the `HlsView.js` file.
- Is the `useEffect` and `useState` used correctly?
- How can I make the confetti responsive as the video element inside the div?
```
<div>
	{status ? <Confetti  width={1200}  height={800}  /> : null}
	<video  ref={videoRef}  autoPlay  controls></video>;
</div>
```

2. After adding navigation using `Router` in `App.js` the name and role component shift to top left. How to fix that?

<img width="1213" alt="Broken CSS" src="https://user-images.githubusercontent.com/53579386/215105829-85f185aa-32d5-4234-8e26-478016e279a5.png">
