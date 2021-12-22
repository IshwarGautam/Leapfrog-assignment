let myArea = document.getElementById("area");

var points = [
    {x:10, y:20},
    {x:40, y:40},
    {x:60, y:20},
    {x:40, y:90},
    {x:20, y:160},
    {x:50, y:200},
    {x:100, y:210},
    {x:150, y:200},
    {x:200, y:100}

]

for (let i=0; i<points.length; i++){

    const container = document.createElement('div');
    container.style.width = "20px";
    container.style.height = "20px";
    container.style.position = "relative";
    container.style.top = points[i].y + "px";
    container.style.left = points[i].x + "px";
    container.style.background = "#47a";
    container.style.borderRadius = "50%";

    myArea.appendChild(container);

    container.onclick = function (event) {
        event.target.style.background = "red";
        setInterval(()=>{
            event.target.style.background = "#47a";
        },1000);
    };

}



