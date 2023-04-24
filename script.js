const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const clearButton = document.getElementById('clear-btn');
const exportButton = document.getElementById('export-btn');
const brushSizeInput = document.getElementById('brush-size');
const colorPickerInput = document.getElementById('color-picker');
const fileNameInput = document.getElementById('file-name');
const redBlock = document.getElementById('red-block');
const fadeButton = document.getElementById('fade-button');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let isDrawing = false;
let brushSize = brushSizeInput.value;
let brushColor = colorPickerInput.value;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDrawing);

function startDrawing(event) {
    redBlock.classList.add('fade-out');
    redBlock.classList.remove('fade-in');
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    lastX = event.clientX - rect.left;
    lastY = event.clientY - rect.top;
}

function draw(event) {
    if (!isDrawing) return;

    let x, y;
    if (event.type === 'touchmove') {
        event.preventDefault(); // prevent scrolling
        const touch = event.touches[0];
        x = touch.pageX - canvas.offsetLeft;
        y = touch.pageY - canvas.offsetTop;
    } else {
        x = event.clientX - canvas.offsetLeft;
        y = event.clientY - canvas.offsetTop;
    }

    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(x, y);
    context.lineWidth = brushSize * 2;
    context.strokeStyle = brushColor;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.stroke();

    lastX = x;
    lastY = y;
}

function stopDrawing() {
    isDrawing = false;
    lastX = null;
    lastY = null;
}

clearButton.addEventListener('click', clearCanvas);
exportButton.addEventListener('click', exportCanvas);
brushSizeInput.addEventListener('change', updateBrushSize);
colorPickerInput.addEventListener('change', updateBrushColor);

let lastX, lastY;

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    redBlock.classList.add('fade-in');
    redBlock.classList.remove('fade-out');
}

function exportCanvas() {
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = fileNameInput.value + '.png';
    link.href = dataUrl;
    link.click();
}

function updateBrushSize() {
    brushSize = brushSizeInput.value;
}

function updateBrushColor() {
    brushColor = colorPickerInput.value;
}

