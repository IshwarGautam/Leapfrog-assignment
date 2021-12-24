const wrapper = document.getElementById('carousel-container');
const images = document.getElementById('carousel-image-wrapper');

const prevBtn = document.getElementById('previousBtn');
prevBtn.style.fontSize = '60px';
prevBtn.style.fontFamily = 'FontAwesome';
prevBtn.style.color = '#fc2';
prevBtn.style.position = "absolute";
prevBtn.style.bottom = "215px";
prevBtn.style.left = "10px";
prevBtn.style.zIndex = "2";
prevBtn.style.cursor = "pointer";

const nextBtn = document.getElementById('nextBtn');
nextBtn.style.fontSize = '60px';
nextBtn.style.fontFamily = 'FontAwesome';
nextBtn.style.color = '#fc2';
nextBtn.style.position = "absolute";
nextBtn.style.top = "270px";
nextBtn.style.right = "10px";
nextBtn.style.zIndex = "2";
nextBtn.style.cursor = "pointer";

function slider(properties){
  const imageWidth = properties.imageWidth;
  const imageCount = images.children.length;

  for (let i = 0; i < imageCount; i++){
    const image = images.children[i];
    image.style.left = `${i * imageWidth}px`;
  }

  
  const btn = [];
  const total_area = 1750; // so that for any number of images, the indicator will be in bottom-center

  for (let i=0; i<imageCount; i++){
    btn[i] = document.createElement('button');
    btn[i].style.width = "20px";
    btn[i].style.height = "20px";
    btn[i].style.borderRadius = "50%";
    btn[i].style.background = "gray";
    btn[i].style.position = "relative";
    btn[i].style.zIndex = "2";
    btn[i].style.left = ((total_area / imageCount) + (i * 20)) + "px";
    btn[i].style.bottom = "22px";
    btn[i].style.cursor = "pointer";

    btn[i].onclick = function(){
      dx = i * imageWidth;
      counter = i+1;
      images.style.left = `-${dx}px`;
    }

    btn[i].onmouseover = function(){
      btn[i].style.background = "#f5e";
    }

    btn[i].onmouseout = function(){
      btn[i].style.background = "gray";
    }
          
    wrapper.appendChild(btn[i]);
  }

  let interval;
  let dx = 0;
  let counter = 1;
  btn[0].style.background = "green";

  let turn=1;
  nextBtn.onclick = function () {
    if (counter == turn){
      btn[turn-1].style.background = "gray";
      btn[turn].style.background = "green";
      turn++;
      console.log(turn);
    }
    if (dx % imageWidth == 0){
      interval = setInterval(() => {
        if (counter!=5){
          dx+=8;
          images.style.left = `-${dx}px`;
        }
  
        if (counter==5){
          dx-=8;
          if (dx == (imageCount - 2) * imageWidth){
            counter = 4;
            clearInterval(interval);
          }
          images.style.left = `-${dx}px`;
        }
        else if (dx >= counter * imageWidth) {
          clearInterval(interval);
          counter++;
        }
      }, 1);
    }
    
  };
  
  prevBtn.onclick = function () {
    if (counter == turn){
      btn[turn-1].style.background = "gray";
      btn[turn-2].style.background = "green";
      turn--;
      console.log(turn);
    }
    if (dx % imageWidth == 0){
      interval = setInterval(() => {
        if (counter != 1){
          dx-=8;
          images.style.left = `-${dx}px`;
        }
        
        if (counter==1){
          dx+=8
          if (dx == imageWidth){
            counter = 2;
            clearInterval(interval);
          }
          images.style.left = `-${dx}px`;
        }
        else if (dx <= (counter-1) * imageWidth - imageWidth) {
          clearInterval(interval);
          counter--;
        }        
      }, 1);
    }  
  };
    
}

slider({
  imageWidth : 960
});

