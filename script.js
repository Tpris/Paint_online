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
        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }
}

canvas.ontouchmove = function(e) {
    if(mouseDown && e.touches.length==1){
        ctx.stroke();
        ctx.lineTo(e.touches[0].clientX - canvas.offsetLeft, e.touches[0].clientY - canvas.offsetTop);
    }
}

saveButton.onclick = function() {
  let imageName = prompt('Image name :', 'paint');
  let a = document.createElement('a');
  a.href = canvas.toDataURL();
  a.download = imageName;
  a.click();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }
  
// add stars
const starContainer = document.createElement('div');
starContainer.className="glitter-star";
document.body.appendChild(starContainer);
for (let i = 0; i < 50; i++) {
    const star = document.createElement('span')
    star.innerHTML = "ac_unit";
    star.className = "material-symbols-outlined";
    star.style.top = Math.random() * 100 + "%";
    star.style.left = Math.random() * 100 + "%";
    star.style.fontSize = Math.random() * 50 + "px";
    star.style.animationDelay = Math.random() *1.5 + 's';
    star.style.animationDuration = Math.random() * 10;
    star.style.color = "rgb("+getRandomInt(0,255)+","+getRandomInt(0,255)+","+getRandomInt(0,255)+")";
    starContainer.appendChild(star);
}


function addIcon(className){
    const star = document.createElement('span')
    star.className = className;
    star.style.top = Math.random() * 100 + "%";
    star.style.left = Math.random() * 100 + "%";
    star.style.fontSize = Math.random() * 50 + "px";
    star.style.animationDelay = Math.random() *1.5 + 's';
    star.style.animationDuration = Math.random() * 10;
    star.style.color = "rgb("+getRandomInt(0,255)+","+getRandomInt(0,255)+","+getRandomInt(0,255)+")";
    starContainer.appendChild(star);
}

for (let i = 0; i < 50; i++) {
    addIcon("icofont-star-alt-1 icofont-2x");
    addIcon("icofont-panda-face icofont-2x");
    addIcon("icofont-panda icofont-3x");
    addIcon("icofont-horse-head icofont-3x");
    addIcon("icofont-octopus icofont-3x");
    addIcon("icofont-octopus-alt icofont-3x");
}

//pere noel

const pereNoel = document.getElementById("pere-noel");
pereNoel.style.left = (innerWidth/2 -150)+"px";
pereNoel.style.top = (innerHeight/2 -150)+"px";

const laser1 = document.getElementById("laser1");
laser1.style.left = (innerWidth/2-70)+"px";
laser1.style.top = (innerHeight/2+20)+"px";

const laser2 = document.getElementById("laser2");
laser2.style.left = (innerWidth/2+15)+"px";
laser2.style.top = (innerHeight/2+20)+"px";

const laserMove = [
    { transform: 'rotate(-23deg)', opacity:1 },
    { transform: 'rotate(-23deg) translate('+(innerWidth)+"px,"+(innerHeight/-8)+"px)", opacity:1, offset:0.48},

    { transform: 'rotate(-23deg) translate('+(innerWidth)+"px,"+(innerHeight/-8)+"px)", opacity:0, offset:0.49},
    { transform: 'rotate(-23deg) translate('+(-innerWidth)+"px,"+(innerHeight/8)+"px)", opacity:0, offset:0.5},

    { transform: 'rotate(23deg)', opacity:1, offset:0.51 },
    { transform: 'rotate(23deg) translate('+(innerWidth)+"px,"+(innerHeight/8)+"px)", opacity:1, offset:0.98},

    { transform: 'rotate(23deg) translate('+(innerWidth)+"px,"+(innerHeight/8)+"px)", opacity:0, offset:0.99},
    { transform: 'rotate(23deg) translate('+(-innerWidth)+"px,"+(innerHeight/-8)+"px)", opacity:0}
];

const timing = {
    duration: 3000,
    iterations: Infinity
}

laser1.animate(laserMove,timing);
laser2.animate(laserMove,timing);


