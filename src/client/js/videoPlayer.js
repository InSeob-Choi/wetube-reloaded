const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullscreen");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let volumeValue = 0.5;

let controlsTimeout = null;

let controlsMovementTimeout = null;

const handlePlayClick = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? "Play" : "Pause";
};

const handleMute = () => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
  volumeValue = value;
  video.volume = value;
  if (video.volume === 0) {
    video.muted = true;
    muteBtn.innerText = "Unmute";
  }
};

const formatTime = seconds => new Date(seconds * 1000).toISOString().substr(11, 8);

const handleLoadedMetadata = () => {
  if (Math.floor(video.duration) < 60*60) {
    totalTime.innerText = formatTime(Math.floor(video.duration)).substr(3);
  } else {
    totalTime.innerText = formatTime(Math.floor(video.duration));
  }
  timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  if (Math.floor(video.currentTime) < 60*60) {
    currentTime.innerText = formatTime(Math.floor(video.currentTime)).substr(3);
  } else {
    currentTime.innerText = formatTime(Math.floor(video.currentTime));
  }
  timeline.value = Math.floor(video.currentTime);
};

const handleTimelineChange = (event) => {
  const {target: {value}} = event;
  video.currentTime = value;
};

const handleFullscreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullScreenBtn.innerText = "Enter Full Screen";
  } else {
    videoContainer.requestFullscreen();
    fullScreenBtn.innerText = "Exit Full Screen";
  }
};

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 2000);
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 1000);
};

const handleClickVideo = () => {
  handlePlayClick();
};

const handleKeyDown = (event) => {
  if (event.code === "Space" && video.paused) {
    video.play();
    playBtn.innerText = "Pause";
  } else if (event.code === "Space" && video.played) {
    video.pause();
    playBtn.innerText = "Play";
  } else if (event.code === "Enter" && videoContainer.className === "") {
    videoContainer.requestFullscreen();
    fullScreenBtn.innerText = "Exit Full Screen";
    videoContainer.classList.add("fulled");
  } else if (event.code === "Enter" && videoContainer.className === "fulled") {
    document.exitFullscreen();
    fullScreenBtn.innerText = "Enter Full Screen";
    videoContainer.classList.remove("fulled");
  } else if (event.code === "ArrowRight") {
    video.currentTime = video.currentTime + 5;
  } else if (event.code === "ArrowLeft") {
    video.currentTime = video.currentTime - 5;
  }
};

const handleEnded = () => {
  const {id} = videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, {
    method: "POST"
  });
}

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullscreen);
videoContainer.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
video.addEventListener("click", handleClickVideo);
document.addEventListener("keydown", handleKeyDown);
video.addEventListener("ended", handleEnded);


// ⚙️ 재생 및 멈출 때, 텍스트 바꿔주는 함수
// const handlePause = () => (playBtn.innerText = "Play");
// const handlePlay = () => (playBtn.innerText = "Pause");
// video.addEventListener("pause", handlePause);
// video.addEventListener("play", handlePlay);
//https://developer.mozilla.org/ko/docs/Web/API Web API & 이벤트
//https://developer.mozilla.org/ko/docs/Web/Events addEventListener의 이벤트
