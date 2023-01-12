const canvas = document.getElementById('drawing-board');
const ctx = canvas.getContext('2d');
const lineWidth = document.getElementById('lineWidth');
const color = document.getElementById('color');
const saveButton = document.getElementById('save');
const eraserBrush = document.getElementById('eraser-brush');
const img = document.getElementById('img');

let mouseDown = false;
let erase = false;


initialiseCanvas(window.innerWidth - canvas.offsetLeft, window.innerHeight)

function initialiseCanvas(width,height){
    canvas.width = width;
    canvas.height = height;
    ctx.lineWidth = lineWidth.value;
    ctx.strokeStyle = color.value;
    ctx.lineCap = 'round';
}

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

canvas.onmousedown = canvas.ontouchstart = function() { 
    mouseDown = true;
    ctx.beginPath();
}
canvas.onmouseup = canvas.ontouchend = function() {
    mouseDown = false;  
}

canvas.onmousemove = function(e) {
    if(mouseDown){
        ctx.stroke();
        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY);
    }
}

canvas.ontouchmove = function(e) {
    if(mouseDown && e.touches.length==1){
        ctx.stroke();
        ctx.lineTo(e.touches[0].clientX - canvas.offsetLeft, e.touches[0].clientY - canvas.offsetTop);
    }
}

canvas.onclick = function(e){
    ctx.fillStyle=color.value;
    ctx.fillRect(e.clientX - canvas.offsetLeft,e.clientY - canvas.offsetTop,1,1)
}

saveButton.onclick = function() {
  let imageName = prompt('Image name :', 'paint');
  let a = document.createElement('a');
  a.href = canvas.toDataURL();
  a.download = imageName;
  a.click();
}

document.getElementById('upload').onchange = function(){
    let file = this.files[0];
    let reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = function () {
        img.src = reader.result;
    }
}

img.onload = function(){
    initialiseCanvas(img.width,img.height);
}

document.getElementById('upload-canvas').onchange = function(){
    let file = this.files[0];
    let reader = new FileReader();

    if(file)
        reader.readAsDataURL(file);
    
    reader.onload = function () {
        let imgScribble = new Image();
        imgScribble.src = reader.result;
        imgScribble.onload = function () {
            ctx.drawImage(imgScribble, 0, 0);
        }
    }
}

