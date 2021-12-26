//===========================
//Styling element through JS
//===========================
let wrapper = document.getElementsByClassName('carousel-container');
let images = document.getElementsByClassName('carousel-image-wrapper');
let prevBtn = document.getElementsByClassName('previousBtn');
let nextBtn = document.getElementsByClassName('nextBtn');

for (let i=0; i< wrapper.length; i++){
  wrapper[i].style.width = "960px";
  wrapper[i].style.position = "relative";
  wrapper[i].style.overflow = "hidden";
  wrapper[i].style.transform = "translate(10%, 5%)";

  images[i].style.height = "540px";
  images[i].style.position = "relative";

  prevBtn[i].style.fontSize = '60px';
  prevBtn[i].style.color = '#fc2';
  prevBtn[i].style.position = "absolute";
  prevBtn[i].style.bottom = "45%";
  prevBtn[i].style.left = "10px";
  prevBtn[i].style.zIndex = "2";
  prevBtn[i].style.cursor = "pointer";
  prevBtn[i].style.opacity = "50%";
  prevBtn[i].onmouseover = function(){
    prevBtn[i].style.opacity = "100%";
  }
  prevBtn[i].onmouseout = function(){
    prevBtn[i].style.opacity = "50%";
  }

  nextBtn[i].style.fontSize = '60px';
  nextBtn[i].style.color = '#fc2';
  nextBtn[i].style.position = "absolute";
  nextBtn[i].style.bottom = "45%";
  nextBtn[i].style.right = "10px";
  nextBtn[i].style.zIndex = "2";
  nextBtn[i].style.cursor = "pointer";
  nextBtn[i].style.opacity = "50%";
  nextBtn[i].onmouseover = function(){
    nextBtn[i].style.opacity = "100%";
  }
  nextBtn[i].onmouseout = function(){
    nextBtn[i].style.opacity = "50%";
  }
}


