const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColor")
const ctx = canvas.getContext("2d");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "#b6b6b6";

ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, canvas.width, canvas.height)
canvas.width = 720;
canvas.height = 720;
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function paintingStart() {
    painting = true;
}

function paintingStop() {
    painting = false;
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const rangeValue = event.target.value;
    ctx.lineWidth = rangeValue; 
}

function handleModeClick(event) {
    if (!filling) {
        mode.innerText = "PAINT";
        filling = true;
    } else {
        mode.innerText = "FILL";
        filling = false;
    }
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    } 
}

function handleContextMenu(event) {
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "paintJS";
    link.click();
}

if (canvas) {
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", paintingStart);
    canvas.addEventListener("mouseup", paintingStop);
    canvas.addEventListener("mouseleave", paintingStop);
    canvas.addEventListener("contextmenu", handleContextMenu);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (save) {
    save.addEventListener("click", handleSaveClick);
}