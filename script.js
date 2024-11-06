let currentQuestionIndex = 0;
const questionContainer = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

async function loadQuestion() {
  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: "Generate a multiple-choice MBBS question with 4 options. Indicate the correct answer.",
        max_tokens: 100
      })
    });

    const data = await response.json();
    const questionText = parseQuestion(data.choices[0].text);

    displayQuestion(questionText);
  } catch (error) {
    console.error("Error fetching question:", error);
    questionContainer.innerText = "Failed to load question. Please try again.";
  }
}

function parseQuestion(text) {
  const lines = text.trim().split('\n');
  const question = lines[0];
  const options = lines.slice(1, -1);
  const answer = lines[lines.length - 1];

  return { question, options, answer };
}

function displayQuestion(questionText) {
  questionContainer.innerText = questionText.question;
  answerButtons.innerHTML = "";

  questionText.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.innerText = option;
    button.addEventListener("click", () => checkAnswer(button, questionText.answer));
    answerButtons.appendChild(button);
  });

  nextButton.style.display = "none";
}

function checkAnswer(button, correctAnswer) {
  if (button.innerText === correctAnswer) {
    button.classList.add("correct");
  } else {
    button.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach(btn => {
    btn.disabled = true;
  });

  nextButton.style.display = "block";
}

function loadNextQuestion() {
  currentQuestionIndex++;
  loadQuestion();
}

loadQuestion();
