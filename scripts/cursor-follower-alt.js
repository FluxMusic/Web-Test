const gameField = document.getElementById('game-field');

const config = {
    lerpAmount: 0.1,
    glowPointFollowerAmount: 15
}

const gameFieldCenter = {
    x: gameField.offsetWidth / 2,
    y: gameField.offsetHeight / 2
};

let mousePosition = {
    x: 0,
    y: 0
}

let hasLeft = false;

const glowPoint = document.getElementById('glow-point');

const glowPointFollowers = [];

for (let i = 0; i < config.glowPointFollowerAmount; i++) {
    const glowPointFollower = document.createElement('div');
    glowPointFollower.x = 0;
    glowPointFollower.y = 0;
    glowPointFollower.className = 'glow-point';
    appendElement(glowPointFollower);
    glowPointFollowers.push(glowPointFollower);
}

moveGlowPoint(gameFieldCenter);

window.onresize = (e) => {
    gameFieldCenter.x = gameField.offsetWidth / 2;
    gameFieldCenter.y = gameField.offsetHeight / 2;
    moveGlowPoint(gameFieldCenter);
}

gameField.onmousemove = (e) => {
    mousePosition.x = e.layerX;
    mousePosition.y = e.layerY;
    moveGlowPoint(mousePosition);
    glowPointFollowers.forEach((glowPointFollower, index) => {
        glowPointFollower.x = mousePosition.x * 0.6 // * (1 - index / 10);
        glowPointFollower.y = mousePosition.y * 0.6 // * (1 - index / 10);
        x = glowPointFollower.x;
        y = glowPointFollower.y;
        moveFollower(glowPointFollowers[index], { x, y });
    })
}
gameField.onmouseleave = () => {
    moveGlowPoint(gameFieldCenter);
}
function moveGlowPoint(position) {
    glowPoint.style.left = `${position.x}px`;
    glowPoint.style.top = `${position.y}px`;
}
function moveFollower(element, position) {
    element.style.left = `${position.x}px`;
    element.style.top = `${position.y}px`;
}
function calculateDistance(startPosition, endPosition) {
    const dx = endPosition.x - startPosition.x;
    const dy = endPosition.y - startPosition.y;
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
}
function appendElement(element) {
    gameField.appendChild(element);
}
function removeElement(element, delay) {
    setTimeout(() => gameField.removeChild(element), delay);
}
function lerp(start, end, amount) {
    return (1 - amount) * start + end * amount;
}