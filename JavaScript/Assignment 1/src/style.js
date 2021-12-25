//===========================
//Styling element through JS
//===========================


//==============================================
// 1. Styling carousel-container (outermost div)
//==============================================
const wrapper = document.getElementById('carousel-container');
wrapper.style.width = "960px";
wrapper.style.position = "relative";
wrapper.style.overflow = "hidden";
wrapper.style.transform = "translate(10%, 5%)";


//=================================================
// 2. Styling carousel wrapper that wrap each image
//=================================================
const images = document.getElementById('carousel-image-wrapper');
images.style.height = "540px";
images.style.position = "relative";

//==============================
// 3. Styling cheveron icon left
//==============================
const prevBtn = document.getElementById('previousBtn');
prevBtn.style.fontSize = '60px';
prevBtn.style.color = '#fc2';
prevBtn.style.position = "absolute";
prevBtn.style.bottom = "45%";
prevBtn.style.left = "10px";
prevBtn.style.zIndex = "2";
prevBtn.style.cursor = "pointer";
prevBtn.style.opacity = "50%";
prevBtn.onmouseover = function(){
  prevBtn.style.opacity = "100%";
}
prevBtn.onmouseout = function(){
  prevBtn.style.opacity = "50%";
}


//===============================
// 4. Styling cheveron icon right
//===============================
const nextBtn = document.getElementById('nextBtn');
nextBtn.style.fontSize = '60px';
nextBtn.style.color = '#fc2';
nextBtn.style.position = "absolute";
nextBtn.style.bottom = "45%";
nextBtn.style.right = "10px";
nextBtn.style.zIndex = "2";
nextBtn.style.cursor = "pointer";
nextBtn.style.opacity = "50%";
nextBtn.onmouseover = function(){
  nextBtn.style.opacity = "100%";
}
nextBtn.onmouseout = function(){
  nextBtn.style.opacity = "50%";
}
