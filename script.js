import questions from './questions.js';

let currentQuestionIndex = 0;
let currentQuestion = null;

function loadNextQuestion() {
  const questionContainer = document.getElementById("question-container");
  const answerButtons = document.getElementById("answer-buttons");
  const nextBtn = document.getElementById("next-btn");

  // If we have more questions to load
  if (currentQuestionIndex < questions.length) {
    currentQuestion = questions[currentQuestionIndex];

    // Display question
    document.getElementById("question").innerText = currentQuestion.text;

    // Create answer buttons
    answerButtons.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.classList.add("answer-btn");
      button.innerText = option;
      button.addEventListener("click", () => checkAnswer(index));
      answerButtons.appendChild(button);
    });

    // Hide the Next button initially
    nextBtn.style.display = "none";
  } else {
    questionContainer.innerHTML = '<p>No more questions available.</p>';
    nextBtn.style.display = "none";  // Hide next button if no more questions
  }
}

function checkAnswer(selectedIndex) {
  const correctAnswerIndex = currentQuestion.correctAnswer;
  const answerButtons = document.getElementById("answer-buttons").children;

  // Show the correct answer in green and incorrect ones in red
  for (let i = 0; i < answerButtons.length; i++) {
    if (i === selectedIndex) {
      answerButtons[i].style.backgroundColor = (i === correctAnswerIndex) ? "green" : "red";
    } else {
      answerButtons[i].disabled = true;  // Disable all buttons once an answer is selected
      answerButtons[i].style.backgroundColor = (i === correctAnswerIndex) ? "green" : "";
    }
  }

  // Show the next button after selecting an answer
  document.getElementById("next-btn").style.display = "block";
  currentQuestionIndex++;
}

loadNextQuestion(); // Load the first question when the page loads
