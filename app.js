const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
w=canvas.width;
h=canvas.height;
let prevX, prevY, currX, currY;
let paint = false;
ctx.lineCap = "round";
function startPosition() {
    paint = true;

}

function finishPosition() {
    paint = false;
    ctx.beginPath();
}
canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", finishPosition);
canvas.addEventListener("mousemove", (e) => {
    prevX = currX;
    prevY = currY;
    currX = e.clientX - canvas.offsetLeft;
    currY = e.clientY - canvas.offsetTop;
    draw();
});



_('[name="color"]').addEventListener('change', function(e) {
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
});

_('[name="width"]').addEventListener('change', function(e) {
    if (e.target.value < 1) {
        return false;
    }
    if (e.target.value > 10) {
        return false;
    }
    lineWidth = Math.round(e.target.value);
    ctx.lineWidth = lineWidth;
});

function draw(e) {
    if (!paint) return;
    //first
    let a=prevX;
    let b=prevY;
    let c=currX;
    let d=currY;
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    //second
    let a1=a;
    let b1=h-b;
    let c1=c;
    let d1=h-d;
    ctx.moveTo(a1, b1);
    ctx.lineTo(c1, d1);
    //third
    a1=w-a;
    b1=b;
    c1=w-c;
    d1=d;

    ctx.moveTo(a1, b1);
    ctx.lineTo(c1, d1);
    //fourth
	a1=w-a;
    b1=h-b;
    c1=w-c;
    d1=h-d;
    ctx.moveTo(a1, b1);
    ctx.lineTo(c1, d1);
    //fifth
    a1 = w/2+h/2-b; b1= w/2+h/2-a;
    c1 = w/2+h/2-d; d1= w/2+h/2-c;
    ctx.moveTo(a1, b1);
    ctx.lineTo(c1, d1);
    // Reassign for 6
    a1 = w/2+h/2-b; b1 = h/2-w/2+a;
    c1= w/2+h/2-d; d1= h/2-w/2+c;
    ctx.moveTo(a1, b1);
    ctx.lineTo(c1, d1);

    //seventh
    a1 = w/2-h/2+b; b1= w/2+h/2-a;
    c1 = w/2-h/2+d; d1= w/2+h/2-c;
    ctx.moveTo(a1, b1);
    ctx.lineTo(c1, d1);

    a1 = w/2-h/2+b; b1= -w/2+h/2+a;
    c1 = w/2-h/2+d; d1= -w/2+h/2+c;
    ctx.moveTo(a1, b1);
    ctx.lineTo(c1, d1);
    ctx.stroke();
    //ctx.closePath();
}

function clearCanvas() {
    let lastFllStyle = ctx.fillStyle
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = lastFllStyle;
    confirm("Do you want to reset?");
};

function _(e, all = false) {
    let divs = document.querySelectorAll(e);
    if (all || (divs.length > 1)) {
        return divs;
    }
    return divs[0];
} 

function download() {
    let link = document.createElement('a');
    link.setAttribute('download', 'draw.png');
    link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
    link.click();
};