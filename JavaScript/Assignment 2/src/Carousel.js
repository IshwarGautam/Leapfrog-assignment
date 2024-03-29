//Constant variable
const imageWidth = 960;

//=================================
// Main function (class) starts
//=================================
function Carousel(properties){
  this.wrapper = properties.imageContainer;
  this.wrapperId = properties.wrapperId;
  this.imageCount = images[this.wrapperId].children.length;
  this.nextBtn = nextBtn[this.wrapperId];
  this.prevBtn = prevBtn[this.wrapperId];
  
  this.transitionTime = properties.transitionTime;
  this.holdTime = properties.holdTime;

  for (let i = 0; i < this.imageCount; i++){
    this.image = images[this.wrapperId].children[i];
    this.image.style.left = `${i * imageWidth}px`;
  }

  this.dx = 0;
  this.counter = 1;

  this.btn = []

  //==========================================
  // Creating Indicator dots
  //==========================================
  for (let i=0; i<this.imageCount; i++){
    this.btn[i] = document.createElement('button');
    this.btn[i].style.width = '20px';
    this.btn[i].style.height = '20px';
    this.btn[i].style.borderRadius = '50%';
    this.btn[i].style.background = 'gray';
    this.btn[i].style.position = 'relative';
    this.btn[i].style.zIndex = '2';
    this.btn[i].style.left =  (imageWidth/2) + (i * 20) - (this.imageCount * 20) + 'px';
    this.btn[i].style.bottom = '22px';
    this.btn[i].style.cursor = 'pointer';
    
    this.btn[i].onclick = function(){
      if (this.dx % imageWidth == 0){
        this.dx = i * imageWidth;
        this.counter = i+1;
        images[this.wrapperId].style.left = `-${this.dx}px`;

        for (let c=0; c<this.imageCount; c++){
          this.btn[c].style.background = 'gray';
        }

        this.btn[i].style.background = 'green';
        this.turn = i+1;

        this.btn[i].onmouseout = function(){
          this.btn[i].style.background = 'green';
        }.bind(this);
      }
      
    }.bind(this);

    this.btn[i].onmouseover = function(){
      this.getColor = this.btn[i].style.background;
      this.btn[i].style.background = '#f5e';

      this.btn[i].onmouseout = function(){
        this.btn[i].style.background = this.getColor;
      }.bind(this);
    }.bind(this);

    this.wrapper.appendChild(this.btn[i]);
  }

  //initial active indicator dot
  this.btn[0].style.background = 'green'; 

  //to make transition smoothly per image
  this.Speed = imageWidth / 120; 

  //use either to reach at the beginning or at the end suddenly
  this.fastSpeed = imageWidth / 12; 

  this.turn=1;

  //===================================
  //Implementation of next slider image
  //===================================
  this.nextBtn.onclick = function () {
    //counter detects the turn of indicator dot to be active
    if (this.counter == this.turn){ 
      if (this.turn == this.imageCount){
        this.toggle = 0;
        this.btn[this.imageCount-1].style.background = 'gray';
        this.btn[0].style.background = 'green';
        this.turn=1;
      }  
      else {
        this.btn[this.turn-1].style.background = 'gray';
        this.btn[this.turn].style.background = 'green';
        this.turn++;
      }
    }

    if (this.dx % imageWidth == 0){
      this.interval = setInterval(() => {
        if (this.counter != this.imageCount){
          this.dx+=this.Speed;
          images[this.wrapperId].style.left = `-${this.dx}px`;
        }
        
        // redirect to the beginning of the slider
        if (this.counter == this.imageCount){ 
          this.dx-=this.fastSpeed;
          if (this.dx == 0){
            this.counter = 1;
            clearInterval(this.interval);
          }
          images[this.wrapperId].style.left = `-${this.dx}px`;
        }
        else if (this.dx >= this.counter * imageWidth) {
          clearInterval(this.interval);
          this.counter++;
        }
      },`${this.transitionTime/imageWidth*10}`);
    }
  }.bind(this);
  
  //=======================================
  //Implementation of previous slider image
  //=======================================
  this.prevBtn.onclick = function () {
    if (this.counter == this.turn){
      if(this.turn == 1) {
        this.toggle=1;
        this.btn[0].style.background = 'gray';
        this.btn[this.imageCount-1].style.background = 'green';
        this.turn = this.imageCount;
      } 
      else{
        this.btn[this.turn-1].style.background = 'gray';
        this.btn[this.turn-2].style.background = 'green';
        this.turn--;
      } 
    }

    if (this.dx % imageWidth == 0){
      this.interval = setInterval(() => {
        if (this.counter != 1){
          this.dx-=this.Speed;
          images[this.wrapperId].style.left = `-${this.dx}px`;
        }
        
        //redirect to the end of the slider
        if (this.counter==1){ 
          this.dx += this.fastSpeed 
          if (this.dx >= (this.imageCount-1) * imageWidth){
            this.counter = this.imageCount;
            clearInterval(this.interval);
          }
          images[this.wrapperId].style.left = `-${this.dx}px`;
        }
        else if (this.dx <= (this.counter-1) * imageWidth - imageWidth) {
          clearInterval(this.interval);
          this.counter--;
        }        
      }, `${this.transitionTime/imageWidth*10}`);
    }  
  }.bind(this); 


  //======================================================
  // Changing the slider automatically at a fixed interval
  //======================================================
  this.toggle=0;
  this.automate = setInterval(() => {
    if (this.toggle==0){
      if (this.counter == this.imageCount - 1){
        this.toggle=1;
      } 
      this.nextBtn.click();
    }
    else{
      if (this.counter == 2){
        this.toggle=0;
      } 
      this.prevBtn.click();
    }

    //code clearfix
    //sometime indicator dot activated at wrong time
    for (let b=0; b<this.imageCount; b++){
      this.btn[b].style.background = 'gray';
    }
    this.btn[this.turn-1].style.background = 'green';
    
    setTimeout(this.automate, this.holdTime);
  },this.holdTime);
}


//================================
// Creating instances of class
//================================
new Carousel({
  imageContainer:wrapper[0],
  wrapperId:0,
  transitionTime: 400,
  holdTime: 4000
});

new Carousel({
  imageContainer:wrapper[1],
  wrapperId:1,
  transitionTime: 500,
  holdTime: 6000
});






