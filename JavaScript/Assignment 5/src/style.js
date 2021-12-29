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
// frame.appendChild(base);


