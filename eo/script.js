const kolory = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#000000", "#FFFFFF"];
const maxProby = 5;
let poprawne = 0;
let licznikProb = 0;
let aktywny = true;

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function updateScore() {
    document.getElementById('licznik').textContent = `${poprawne}/${maxProby}`;
}

function generateNewTest() {
    if (licznikProb >= maxProby) return;

    document.getElementById('wynik').textContent = '';

    const correctColorIndex = randomInt(0, kolory.length);
    const correctColor = kolory[correctColorIndex];

    document.getElementById('mainColor').style.backgroundColor = correctColor;

    let options = [...kolory];
    options.splice(correctColorIndex, 1);
    options = [correctColor, ...options.sort(() => 0.5 - Math.random())].slice(0, 3);

    options = options.sort(() => 0.5 - Math.random());

    document.getElementById('opcja1').style.backgroundColor = options[0];
    document.getElementById('opcja1').dataset.correct = (options[0] === correctColor).toString();

    document.getElementById('opcja2').style.backgroundColor = options[1];
    document.getElementById('opcja2').dataset.correct = (options[1] === correctColor).toString();

    document.getElementById('opcja3').style.backgroundColor = options[2];
    document.getElementById('opcja3').dataset.correct = (options[2] === correctColor).toString();

    licznikProb++;
}

function checkAnswer(event) {
    if (!aktywny) return;

    const isCorrect = event.target.dataset.correct === "true";

    if (isCorrect) {
        poprawne++;
        document.getElementById('wynik').textContent = "Poprawna odpowiedz";
    } else {
        document.getElementById('wynik').textContent = "Bledna odpowiedz";
    }

    updateScore();

    if (licznikProb < maxProby) {
        setTimeout(generateNewTest, 600);
    } else {
        aktywny = false;
        document.getElementById('wynik').textContent = poprawne === maxProby ? "Zdany test" : "Nie zaliczone, sprobuj ponownie";
        setTimeout(() => {
            poprawne = 0;
            licznikProb = 0;
            aktywny = true;
            updateScore();
            generateNewTest();
        }, 5000);
    }
}

document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', checkAnswer);
});

updateScore();
generateNewTest();
