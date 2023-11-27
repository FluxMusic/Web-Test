const gameField = document.getElementById('game-field');

const config = {
    trailPointAmount: 10
}

const gameFieldCenter = {
    x: gameField.offsetWidth / 2,
    y: gameField.offsetHeight / 2
};

let lastMousePosition = {
    x: 0,
    y: 0
};

const glowPoint = document.getElementById('glow-point');

const glowTrail = [];

moveGlowPoint(gameFieldCenter);

window.onresize = (e) => {
    gameFieldCenter.x = gameField.offsetWidth / 2;
    gameFieldCenter.y = gameField.offsetHeight / 2;
    moveGlowPoint(gameFieldCenter);
}

gameField.onmousemove = (e) => {
    const mousePosition = {
        x: e.layerX,
        y: e.layerY
    };
    moveGlowPoint(mousePosition);
    connectTrail(lastMousePosition, mousePosition);
    updateLastMousePosition(mousePosition);
}

gameField.onmouseleave = () => {
    moveGlowPoint(gameFieldCenter);
}
function moveGlowPoint(position) {
        glowPoint.style.left = `${position.x}px`;
        glowPoint.style.top = `${position.y}px`;
}
function updateLastMousePosition(position) {
    lastMousePosition = position;
}
function connectTrail(lastPosition, currentPosition) {
    const distance = calculateDistance(lastPosition, currentPosition);
    const amount = Math.max(Math.floor(distance / config.trailPointAmount), 1);

    const dx = (currentPosition.x - lastPosition.x) / amount;
    const dy = (currentPosition.y - lastPosition.y) / amount;

    for (let i = 0; i < amount; i++) {
        const x = lastPosition.x + dx * i;
        const y = lastPosition.y + dy * i;
        createTrailPoint({x, y});    
    }
}
function createTrailPoint(position) {
    const point = document.createElement('div');

    point.className = 'glow-point';
    point.style.left = `${position.x}px`;
    point.style.top = `${position.y}px`;

    appendElement(point);
    removeElement(point, 60);
}
function calculateDistance(lastPosition, currentPosition) {
    const dx = currentPosition.x - lastPosition.x;
    const dy = currentPosition.y - lastPosition.y;
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
}
function appendElement(element) {
    gameField.appendChild(element);
}
function removeElement(element, delay) {
    setTimeout(() => gameField.removeChild(element), delay);
}