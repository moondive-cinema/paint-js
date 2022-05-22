const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 700;
ctx.strokeStyle = "#b6b6b6";
ctx.lineWidth = 2.5;

let painting = false;

function paintingStart() {
    painting = true;
}

function paintingStop() {
    painting = false;
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

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", paintingStart);
    canvas.addEventListener("mouseup", paintingStop);
    canvas.addEventListener("mouseleave", paintingStop);
}