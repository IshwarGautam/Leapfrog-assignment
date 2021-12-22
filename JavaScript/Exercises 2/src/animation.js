let area = document.getElementById("animate");

const myShape = document.createElement('div');
myShape.style.background = "#47a";
myShape.style.width = "50px";
myShape.style.height = "50px";
myShape.style.borderRadius = "50%";
myShape.style.marginLeft = "50%";
myShape.style.marginTop = "0px";

area.appendChild(myShape);

let value = parseInt(myShape.style.marginTop);
let myInterval = setInterval(()=>{
  const marginValue = value + "px";
  myShape.style.marginTop = marginValue;
  if (value==0){
      turn=0;
      value++;
  }
  else if (value==350){  //total height- ball height
      turn=1;
      value--;
  }
  else if(value>0 && turn==0){
      value++;
  }
  else if(turn==1){
      value--;
  }
});

