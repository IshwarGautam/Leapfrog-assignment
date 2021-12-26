//=========================
// Main function starts
//=========================
function slider(imageWidth=960){

  const imageCount = images.children.length;
  
  //======================================
  // put all images in horizontal position
  //=======================================
  for (let i = 0; i < imageCount; i++){
    const image = images.children[i];
    image.style.left = `${i * imageWidth}px`;
  }

  const btn = [];
  const total_area = 1750; // so that for any number of images, the indicator dot will be in bottom-center

  //==========================================
  // Creating Indicator dots
  //==========================================
  for (let i=0; i<imageCount; i++){
    btn[i] = document.createElement('button');
    btn[i].style.width = '20px';
    btn[i].style.height = '20px';
    btn[i].style.borderRadius = '50%';
    btn[i].style.background = 'gray';
    btn[i].style.position = 'relative';
    btn[i].style.zIndex = '2';
    btn[i].style.left = ((total_area / imageCount) + (i * 20)) + 'px';
    btn[i].style.bottom = '22px';
    btn[i].style.cursor = 'pointer';

    btn[i].onclick = function(){
      dx = i * imageWidth;
      counter = i+1;
      images.style.left = `-${dx}px`;

      for (let c=0; c<imageCount; c++){
        btn[c].style.background = 'gray';
      }

      btn[i].style.background = 'green';
      turn = i+1;

      btn[i].onmouseout = function(){
        btn[i].style.background = 'green';
      }
    }

    btn[i].onmouseover = function(){
      let getColor = btn[i].style.background;
      btn[i].style.background = '#f5e';

      btn[i].onmouseout = function(){
        btn[i].style.background = getColor;
      }
    }
          
    wrapper.appendChild(btn[i]);
  }

  let interval;
  let dx = 0;
  let counter = 1;
  let turn=1;

  //initial active indicator dot
  btn[0].style.background = 'green'; 

  //to make transition smoothly per image
  const Speed = imageWidth / 120; 

  //use either to reach at the beginning or at the end suddenly
  const fastSpeed = imageWidth / 12; 

  //===================================
  //Implementation of next slider image
  //===================================
  nextBtn.onclick = function () {
    if (counter == turn){ //counter detects the turn of indicator dot to be active
      if (turn == imageCount){
        btn[imageCount-1].style.background = 'gray';
        btn[0].style.background = 'green';
        turn=1;
      }  
      else {
        btn[turn-1].style.background = 'gray';
        btn[turn].style.background = 'green';
        turn++;
      }
    }

    //button is not clickable during transition
    if (dx % imageWidth == 0){
      interval = setInterval(() => {
        if (counter != imageCount){
          dx+=Speed;
          images.style.left = `-${dx}px`;
        }
  
        // redirect to the beginning of the slider
        if (counter == imageCount){ 
          dx-=fastSpeed;
          if (dx == 0){
            counter = 1;
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
  
  //=======================================
  //Implementation of previous slider image
  //=======================================
  prevBtn.onclick = function () {
    if (counter == turn){
      if(turn == 1) {
        btn[0].style.background = 'gray';
        btn[imageCount-1].style.background = 'green';
        turn = imageCount;
      } 
      else{
        btn[turn-1].style.background = 'gray';
        btn[turn-2].style.background = 'green';
        turn--;
      } 
    }

    if (dx % imageWidth == 0){
      interval = setInterval(() => {
        if (counter != 1){
          dx-=Speed;
          images.style.left = `-${dx}px`;
        }
        
        //redirect to the end of the slider
        if (counter==1){ 
          dx+=fastSpeed
          if (dx >= (imageCount-1) * imageWidth){
            counter = imageCount;
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

//==============================
// Finally, Calling the function
//==============================
slider();

