const gameField = document.getElementById('game-field');

const config = {
    trailPointAmount: 10
}

const gameFieldCenter = {
    x: gameField.offsetWidth / 2,
    y: gameField.offsetHeight / 2
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
}

gameField.onmouseleave = () => {
    moveGlowPoint(gameFieldCenter);
}
function moveGlowPoint(position) {
        glowPoint.style.left = `${position.x}px`;
        glowPoint.style.top = `${position.y}px`;
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