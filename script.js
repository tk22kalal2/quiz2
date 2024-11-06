import questions from './questions.js';

let currentQuestionIndex = 0;

function displayQuestion() {
  const question = questions[currentQuestionIndex];
  if (!question) {
    document.getElementById("question").innerText = "No more questions.";
    return;
  }

  document.getElementById("question").innerText = question.text;
  const answerButtons = document.getElementById("answer-buttons");
  answerButtons.innerHTML = "";

  // Example: Add options; for actual implementation, options will need to be parsed
  ["Option A", "Option B", "Option C", "Option D"].forEach(option => {
    const button = document.createElement("button");
    button.innerText = option;
    button.addEventListener("click", () => checkAnswer(button, "Option A")); // Adjust with actual answer logic
    answerButtons.appendChild(button);
  });

  document.getElementById("next-btn").style.display = "none";
}

function checkAnswer(button, correctAnswer) {
  if (button.innerText === correctAnswer) {
    button.classList.add("correct");
  } else {
    button.classList.add("incorrect");
  }

  Array.from(document.getElementById("answer-buttons").children).forEach(btn => {
    btn.disabled = true;
  });

  document.getElementById("next-btn").style.display = "block";
}

function loadNextQuestion() {
  currentQuestionIndex++;
  displayQuestion();
}

displayQuestion();
