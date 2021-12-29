const frame = document.getElementById('frame');

const background = document.getElementById('background');
background.style.position = 'relative';
frame.appendChild(background);

const base = document.getElementById('base');
base.style.position = 'absolute';
base.style.bottom = '-5px';
base.style.zIndex = '3';
base.style.width = "672px";
base.style.backgroundImage = `url('./images/base.png')`;

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

const bird = document.createElement('div');
bird.style.backgroundImage = `url('./images/bird.gif')`;
bird.style.top = '100px';
bird.style.left = '21px';
bird.style.width = '200px';
bird.style.height = '188px';
bird.style.backgroundSize = '100px';
bird.style.backgroundRepeat = "no-repeat";
bird.style.position = 'absolute';
frame.appendChild(bird);

const message = document.createElement('div');
message.style.backgroundImage = `url('./images/ready.gif')`;
message.style.bottom = '0px';
message.style.left = '20%';
message.style.width = '380px';
message.style.height = '214px';
message.style.backgroundSize = '200px';
message.style.backgroundRepeat = "no-repeat";
message.style.position = 'absolute';
message.style.display = 'none';
frame.appendChild(message);
