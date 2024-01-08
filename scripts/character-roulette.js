const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const text = document.querySelector("h1");

let hoveredOnce = false;

let interval = null;

shuffleLetters();

text.onmouseover = () => {
    if (hoveredOnce) {
        return;
    }
    else {
        hoveredOnce = true;
        shuffleLetters();
    }
};

function shuffleLetters() {
    let iteration = 0;
    
    clearInterval(interval);
    
    interval = setInterval(() => {
        text.innerText = text.innerText.split("").map(
            (egal, index) => {
                if (hoveredOnce && index < iteration) {
                    return text.dataset.value[index];
                }
                return letters[Math.floor(Math.random() * 26)];
            }
        ).join("");

        if (hoveredOnce &&iteration >= text.dataset.value.length) {
            clearInterval(interval);
        }

        iteration+= 1/3;
    }, 45)
};