let start = new Date().getTime();

const gameField = document.getElementById('spielfeld');

const div = document.createElement('div');
div.className = 'egal';
div.style.position = 'absolute';
appendElement(div);

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
    lerpAmount: 0.1,
    glowSpacing: 10,
    timeBetweenStars: 200,
    distanceBetweenStars: 75,
    animationDuration: 1000,
    animations: ['fall1', 'fall2', 'fall3'],
    colors: ['rgb(3, 240, 240)', 'rgb(113, 254, 145)', 'rgb(254, 254, 245)', 'rgb(19, 203, 224)'],
    sizes: ['1.4', '0.6', '1.2', '0.9']
};

let count = 0;

document.getElementById('spielfeld').onmousemove = e => {
    const position = {
        x: e.layerX,
        y: e.layerY
    };

    const now = new Date().getTime();
    const movedFarEnough = calcDistance(last.starOrigin, position) >= config.distanceBetweenStars;
    const wasLongEnough = calcTime(last.start, now) >= config.timeBetweenStars;

    createPoint(position);

    if (movedFarEnough || wasLongEnough) {
        createStar(position);
        updateStar(position);
    }

    createTail(last.mouseOrigin, position);

    updateLastMousePosition(position);
}

function createPoint(position) {
    const Point = document.createElement("div");

    Point.className = 'glow-point';

    Point.style.left = `${position.x}px`;
    Point.style.top = `${position.y}px`;

    appendElement(Point);

    removeElement(Point, 60);
}
function createTail(lastPosition, position) {
    const distance = calcDistance(lastPosition, position);
    const amount = determinePointAmount(distance);

    const dx = (position.x - lastPosition.x) / amount;
    const dy = (position.y - lastPosition.y) / amount;

    for (let i = 0; i < amount; i++) {
        const x = lastPosition.x + dx * i;
        const y = lastPosition.y + dy * i;
        if (x === lastPosition.x && y === lastPosition.y) {
            continue;
        }
        createPoint({ x, y });
    }
}
function createStar(position) {
    const star = document.createElement('span');
    const color = config.colors[selectRandom(config.colors)];
    const size = config.sizes[selectRandom(config.sizes)];

    star.innerHTML = '&#x2726;';

    star.className = 'star';

    star.style.color = color;
    star.style.textShadow = `0px 0px ${size}rem ${color}`;
    star.style.left = `${position.x}px`;
    star.style.top = `${position.y}px`;
    star.style.fontSize = `${size}rem`;
    star.style.animationName = config.animations[count++ % 3];
    star.style.animationDuration = `${config.animationDuration}ms`;

    appendElement(star);

    removeElement(star, config.animationDuration);
}
document.getElementById('spielfeld').onmouseenter = (e) => {
    const position = {
        x: e.layerX,
        y: e.layerY
    }

    last.mouseOrigin = position;
}
function removeElement(element, delay) {
    setTimeout(() => gameField.removeChild(element), delay);
}
function appendElement(element) {
    gameField.appendChild(element);
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
function determinePointAmount(distance) {
    return Math.max(Math.floor(distance / config.glowSpacing), 1);
}