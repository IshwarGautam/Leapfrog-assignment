let area = document.getElementById("bounce");

function ball(x,y){
    var context = area.getContext("2d");
    var radius = 10;
    var x = x;
    var y = y;
    var dx = 2;
    var dy = -2;

    function drawBall() {
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI*2);
        context.fillStyle = "#47a";
        context.fill();
        context.closePath();
    }

    function draw() {
        context.clearRect(0, 0, area.width, area.height);
        drawBall();
        
        if(x + dx > area.width-radius || x + dx < radius) {
            dx = -dx;
        }
        if(y + dy > area.height-radius || y + dy < radius) {
            dy = -dy;
        }
        
        x += dx;
        y += dy;
    }

    setInterval(draw, 10);
}

ball(50,50);