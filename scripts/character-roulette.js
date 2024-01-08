const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const text = document.querySelector("h1");

let interval = null;

text.onmouseover = () => {
    shuffleLetters();
};

function shuffleLetters() {
    let iteration = 0;
    
    clearInterval(interval);
    
    interval = setInterval(() => {
        text.innerText = text.innerText.split("").map(
            (egal, index) => {
                if (index < iteration) {
                    return text.dataset.value[index];
                }
                return letters[Math.floor(Math.random() * 26)];
            }
        ).join("");

        if (iteration >= text.dataset.value.length) {
            clearInterval(interval);
        }

        iteration++;
    }, 40)
};