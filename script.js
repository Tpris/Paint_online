const canvas = document.getElementById('drawing-board');
const ctx = canvas.getContext('2d');
const lineWidth = document.getElementById('lineWidth');
const color = document.getElementById('color');
const saveButton = document.getElementById('save');
const eraserBrush = document.getElementById('eraser-brush');
let mouseDown = false;
let erase = false;

canvas.width = window.innerWidth - canvas.offsetLeft;
canvas.height = window.innerHeight;
ctx.lineWidth = lineWidth.value;
ctx.strokeStyle = color.value;
ctx.lineCap = 'round';

document.getElementById('erase').onclick = function(){
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
}

function eraserBrushChange(backgroundColor, color, ctxOperation){
    eraserBrush.style.backgroundColor = backgroundColor;
    eraserBrush.style.color = color;
    ctx.globalCompositeOperation= ctxOperation;
}

eraserBrush.onclick = function(){
    erase = !erase;
    if(erase)
        eraserBrushChange("lightgray","blue","destination-out");
    else 
        eraserBrushChange("transparent","white","source-over");
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

saveButton.onclick = function() {
  let imageName = prompt('Image name :', 'paint');
  let a = document.createElement('a');
  a.href = canvas.toDataURL();
  a.download = imageName;
  a.click();
}
