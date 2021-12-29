const frame = document.getElementById('frame');

const background = document.getElementById('background');
background.style.position = 'relative';
frame.appendChild(background);

const base = document.getElementById('base');
base.style.position = 'absolute';
base.style.bottom = '-5px';
base.style.zIndex = '3';
base.style.width = "672px";
base.style.backgroundImage = `url('./images/base.png')`

let playButton = document.getElementById('play');
playButton.style.background = "green";
playButton.style.position = "absolute";
playButton.style.width = "100px";
playButton.style.height = "50px";
playButton.style.color = "ivory";
playButton.style.fontSize = "25px";
playButton.style.cursor = "pointer";
playButton.style.top = '50%';
playButton.style.left = '50%';
playButton.style.transform = 'translate(-50%, -50%)';

let replayButton = document.getElementById('replay');
replayButton.style.background = "green";
replayButton.style.position = "absolute";
replayButton.style.width = "100px";
replayButton.style.height = "50px";
replayButton.style.color = "ivory";
replayButton.style.fontSize = "25px";
replayButton.style.cursor = "pointer";
replayButton.style.top = '50%';
replayButton.style.left = '50%';
replayButton.style.transform = 'translate(-50%, -50%)';
replayButton.style.display = 'none';
replayButton.style.zIndex = '2';

const info = document.getElementById("info");
const thumbnail = document.getElementById("thumbnail");