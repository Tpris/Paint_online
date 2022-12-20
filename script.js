const canvas = document.getElementById('drawing-board');
const ctx = canvas.getContext('2d');
const lineWidth = document.getElementById('lineWidth');
const color = document.getElementById('color');
let mouseDown = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.lineWidth = lineWidth.value;
ctx.strokeStyle = color.value;
ctx.lineCap = 'round';

document.getElementById('erase').onclick = function(){
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
}

color.onchange = function(){
    ctx.strokeStyle = color.value;
}

lineWidth.onclick = function(){
    ctx.lineWidth = lineWidth.value;
}

canvas.onmousedown = function() { 
    mouseDown = true;
    ctx.beginPath();
}
canvas.onmouseup = function() {
    mouseDown = false;  
}

canvas.onmousemove = function(e) {
    if(mouseDown){
        ctx.stroke();
        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }
}
