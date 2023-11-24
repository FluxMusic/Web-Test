const gameField = document.getElementById('game-field');

const gameFieldCenter = {
    x: gameField.offsetWidth / 2,
    y: gameField.offsetHeight / 2
};

const glowPoint = document.getElementById('glow-point');

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