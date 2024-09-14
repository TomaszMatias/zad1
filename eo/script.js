const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#000000", "#FFFFFF"];
const maxAttempts = 5;
let correctAnswers = 0; // Licznik poprawnych odpowiedzi
let totalAttempts = 0; // Licznik prób
let isTestActive = true; // Flaga kontrolująca aktywność testu

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function updateScore() {
    document.getElementById('score').textContent = `${correctAnswers}/${maxAttempts}`;
}

function generateNewTest() {
    if (totalAttempts >= maxAttempts) return;

    document.getElementById('result').textContent = '';

    const correctColorIndex = randomInt(0, colors.length);
    const correctColor = colors[correctColorIndex];

    document.getElementById('mainColor').style.backgroundColor = correctColor;

    // Prepare options
    let options = [...colors];
    options.splice(correctColorIndex, 1); // Remove correct color from options
    options = [correctColor, ...options.sort(() => 0.5 - Math.random())].slice(0, 3);

    // Shuffle options
    options = options.sort(() => 0.5 - Math.random());

    // Assign colors to options
    document.getElementById('option1').style.backgroundColor = options[0];
    document.getElementById('option1').dataset.correct = (options[0] === correctColor).toString();

    document.getElementById('option2').style.backgroundColor = options[1];
    document.getElementById('option2').dataset.correct = (options[1] === correctColor).toString();
    
    document.getElementById('option3').style.backgroundColor = options[2];
    document.getElementById('option3').dataset.correct = (options[2] === correctColor).toString();

    totalAttempts++;
}

function checkAnswer(event) {
    if (!isTestActive) return;

    const isCorrect = event.target.dataset.correct === "true";

    if (isCorrect) {
        correctAnswers++;
        document.getElementById('result').textContent = "Correct!";
    } else {
        document.getElementById('result').textContent = "Try again!";
    }

    updateScore();

    if (totalAttempts < maxAttempts) {
        setTimeout(generateNewTest, 600);
    } else {
        isTestActive = false;
        document.getElementById('result').textContent = correctAnswers === maxAttempts ? "Well done!" : "Try to improve.";
        setTimeout(() => {
            correctAnswers = 0;
            totalAttempts = 0;
            isTestActive = true;
            updateScore();
            generateNewTest();
        }, 5000);
    }
}

// Add event listeners to options
document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', checkAnswer);
});

// Initialize score and start the test
updateScore();
generateNewTest();
