let start = new Date().getTime();

const origin = {
    x: 0,
    y: 0
};

const last = {
    start: start,
    starOrigin: origin,
    mouseOrigin: origin
};

const config = {
    timeBetweenStars: 200,
    distanceBetweenStars: 75,
    animationDuration: 1250,
    animations: ['fall1', 'fall2', 'fall3'],
    colors: ['rgb(3, 240, 240)', 'rgb(113, 254, 145)', 'rgb(254, 254, 245)', 'rgb(19, 203, 224)'],
    sizes: ['1.5', '0.7', '1.3']
};

let count = 0;

window.onmousemove = e => {
    const x = e.clientX;
    const y = e.clientY;

    const position = {
        x: x,
        y: y
    };

    const now = new Date().getTime();
    const wasLongEnough = calcTime(last.start, now) >= config.timeBetweenStars;
    const movedFarEnough = calcDistance(last.starOrigin, position) >= config.distanceBetweenStars;

    createPoint(position);

    if (movedFarEnough || wasLongEnough) {
        createStar(position);
        updateStar(position);
    }
    updateLastMousePosition(position);
}

function createPoint(position) {
    const Point = document.createElement("div");

    Point.className = 'glow-point';

    Point.style.left = `${position.x}px`;
    Point.style.top = `${position.y}px`;

    appendElement(Point);

    removeElement(Point, 50);
}
function createStar(position) {
    const star = document.createElementNS('http://www.w3.org/2000/svg', "svg");
    const color = config.colors[selectRandom(config.colors)];
    const size = config.sizes[selectRandom(config.sizes)];

    star.setAttribute('class', 'star');

    star.src = '/img/svg/star.svg'

    star.setAttribute('viewBox', '0 0 256 256');
    star.setAttribute('fill', color);

    star.innerHTML = '<path d="M240.58984,128a15.84794,15.84794,0,0,1-10.53125,15.03711l-63.81543,23.206-23.206,63.81543a16.001,16.001,0,0,1-30.07422,0L89.75684,166.24316l-63.81543-23.206a16.001,16.001,0,0,1,0-30.07422L89.75684,89.75684l23.20605-63.81543a16.001,16.001,0,0,1,30.07422,0l23.206,63.81543,63.81543,23.20605A15.84794,15.84794,0,0,1,240.58984,128Z"/>';
    
    star.style.left = `${position.x}px`;
    star.style.top = `${position.y}px`;
    star.style.filter = `drop-shadow(0px 0px ${size/2}rem ${color})`;
    star.style.height = `${size}rem`;
    star.style.animationName = config.animations[count++ % 3];
    star.style.animationDuration = `${config.animationDuration}ms`;
    
    appendElement(star);

    removeElement(star, config.animationDuration - 10);
}
function removeElement(element, delay) {
    setTimeout(() => document.body.removeChild(element), delay);
}
function appendElement(element) {
    document.body.appendChild(element);
}
function calcTime(start, end) {
    return end - start;
}
function calcDistance(startPoint, endPoint) {
    const diff = {
        x: endPoint.x - startPoint.x,
        y: endPoint.y - startPoint.y
    };
    return Math.sqrt(Math.pow(diff.x, 2) + Math.pow(diff.y, 2));
}
function updateStar(position) {
    last.start = new Date().getTime();
    last.starOrigin = position;
}
function selectRandom(items) {
    const random = Math.floor(Math.random() * items.length);
    return random;
}
function updateLastMousePosition(position) {
    last.mouseOrigin = position;
}