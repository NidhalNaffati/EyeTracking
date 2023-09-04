// helper functions to display gaze information and dot in browser.

// show gaze information on screen.
function showGazeInfoOnDom(gazeInfo) {
  let gazeInfoDiv = document.getElementById("gazeInfo");
  gazeInfoDiv.innerText = `Gaze Information Below \n x: ${gazeInfo.x} y: ${gazeInfo.y}`;
}

// hide gaze information on screen.
function hideGazeInfoOnDom() {
  let gazeInfoDiv = document.getElementById("gazeInfo");
  gazeInfoDiv.innerText = "";
}

// show gaze dot on screen.
function showGazeDotOnDom(gazeInfo) {
  let canvas = document.getElementById("output");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let ctx = canvas.getContext("2d");
  ctx.fillStyle = "#FF0000";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(gazeInfo.x, gazeInfo.y, 10, 0, Math.PI * 2, true);
  ctx.fill();
}

// hide gaze dot on screen.
function hideGazeDotOnDom() {
  let canvas = document.getElementById("output");
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// show gaze information and dot on screen.
function showGaze(gazeInfo) {
  showGazeInfoOnDom(gazeInfo);
  showGazeDotOnDom(gazeInfo);
}

// hide gaze information and dot on screen.
function hideGaze() {
  hideGazeInfoOnDom();
  hideGazeDotOnDom();
}

export { showGaze, hideGaze };
