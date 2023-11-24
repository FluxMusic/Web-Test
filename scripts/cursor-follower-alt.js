const gameField = document.getElementById('game-field');

const gameFieldCenter = {
    x: gameField.offsetWidth / 2,
    y: gameField.offsetHeight / 2
};

const glowPoint = document.getElementById('glow-point');

glowPoint.style.left = `${gameFieldCenter.x}px`;
glowPoint.style.top = `${gameFieldCenter.y}px`;

window.onresize = (e) => {
    gameFieldCenter.x = gameField.offsetWidth / 2;
    gameFieldCenter.y = gameField.offsetHeight / 2;
    glowPoint.style.left = `${gameFieldCenter.x}px`;
    glowPoint.style.top = `${gameFieldCenter.y}px`;
}