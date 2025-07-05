// Global variables
let currentSection = "alphabet";
let currentQuestion = 0;
let score = 0;
let questions = [];

// Initialize the app
document.addEventListener("DOMContentLoaded", function () {
  renderAlphabet();
  renderNumbers();
  renderBasicWords();
  renderTravelPhrases();
  renderEssentialVerbs();
  renderTravelVocabulary();
  renderRomanticPhrases();
  renderCulturalPhrases();
  setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
  // Navigation
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const section = btn.getAttribute("data-section");
      showSection(section);
    });
  });

  // Quiz controls
  document.getElementById("startQuiz").addEventListener("click", startQuiz);
  document
    .getElementById("nextQuestion")
    .addEventListener("click", nextQuestion);
  document.getElementById("restartQuiz").addEventListener("click", restartQuiz);

  // Keyboard navigation
  document.addEventListener("keydown", handleKeyboardNavigation);
}

// Show section
function showSection(section) {
  // Hide all sections
  document
    .querySelectorAll(".content-section")
    .forEach((s) => s.classList.remove("active"));

  // Show selected section
  document.getElementById(section).classList.add("active");

  // Update navigation
  document
    .querySelectorAll(".nav-btn")
    .forEach((btn) => btn.classList.remove("active"));
  document.querySelector(`[data-section="${section}"]`).classList.add("active");

  currentSection = section;
}

// Handle keyboard navigation
function handleKeyboardNavigation(e) {
  if (e.key === "Escape") {
    showSection("alphabet");
  }
}

// Render alphabet section
function renderAlphabet() {
  const container = document.getElementById("alphabetGrid");
  container.innerHTML = "";

  mongolianData.alphabet.cyrillic.forEach((letter) => {
    const card = document.createElement("div");
    card.className = "alphabet-card";
    card.innerHTML = `
            <div class="card-image">🔤</div>
            <div class="card-content">
                <h3>${letter.letter}</h3>
                <p class="pronunciation">${letter.pronunciation}</p>
                <p class="ipa">[${letter.ipa}]</p>
                <p class="example">${letter.example}</p>
                <div class="speak-indicator">🔊 Click to hear</div>
            </div>
        `;

    // Make entire card clickable
    card.addEventListener("click", () => speak(letter.pronunciation));
    card.style.cursor = "pointer";

    container.appendChild(card);
  });
}

// Render numbers section
function renderNumbers() {
  const container = document.getElementById("numbersGrid");
  container.innerHTML = "";

  mongolianData.numbers.forEach((number) => {
    const card = document.createElement("div");
    card.className = "number-card";
    card.innerHTML = `
            <div class="card-image">🔢</div>
            <div class="card-content">
                <h3>${number.number}</h3>
                <p class="mongolian">${number.mongolian}</p>
                <p class="pronunciation">${number.pronunciation}</p>
                <p class="ipa">[${number.ipa}]</p>
                <p class="english">${number.english}</p>
                <div class="speak-indicator">🔊 Click to hear</div>
            </div>
        `;

    // Make entire card clickable
    card.addEventListener("click", () => speak(number.pronunciation));
    card.style.cursor = "pointer";

    container.appendChild(card);
  });
}

// Render basic words section
function renderBasicWords() {
  const container = document.getElementById("wordsGrid");
  container.innerHTML = "";

  mongolianData.basicWords.forEach((word) => {
    const card = document.createElement("div");
    card.className = "word-card";
    card.innerHTML = `
            <div class="card-image">💬</div>
            <div class="card-content">
                <h3>${word.mongolian}</h3>
                <p class="pronunciation">${word.pronunciation}</p>
                <p class="ipa">[${word.ipa}]</p>
                <p class="english">${word.english}</p>
                <div class="speak-indicator">🔊 Click to hear</div>
            </div>
        `;

    // Make entire card clickable
    card.addEventListener("click", () => speak(word.pronunciation));
    card.style.cursor = "pointer";

    container.appendChild(card);
  });
}

// Render travel phrases section
function renderTravelPhrases() {
  const container = document.getElementById("travelPhrasesGrid");
  container.innerHTML = "";

  mongolianData.travelPhrases.forEach((phrase) => {
    const card = document.createElement("div");
    card.className = "phrase-card";
    card.innerHTML = `
            <div class="card-image">✈️</div>
            <div class="card-content">
                <h3>${phrase.mongolian}</h3>
                <p class="pronunciation">${phrase.pronunciation}</p>
                <p class="ipa">[${phrase.ipa}]</p>
                <p class="english">${phrase.english}</p>
                <div class="speak-indicator">🔊 Click to hear</div>
            </div>
        `;

    // Make entire card clickable
    card.addEventListener("click", () => speak(phrase.pronunciation));
    card.style.cursor = "pointer";

    container.appendChild(card);
  });
}

// Render essential verbs section
function renderEssentialVerbs() {
  const container = document.getElementById("verbsGrid");
  container.innerHTML = "";

  mongolianData.essentialVerbs.forEach((verb) => {
    const card = document.createElement("div");
    card.className = "verb-card";
    card.innerHTML = `
            <div class="card-image">🏃</div>
            <div class="card-content">
                <h3>${verb.mongolian}</h3>
                <p class="pronunciation">${verb.pronunciation}</p>
                <p class="ipa">[${verb.ipa}]</p>
                <p class="english">${verb.english}</p>
                <div class="conjugations">
                    <span class="conjugation">Present: ${verb.present}</span>
                    <span class="conjugation">Past: ${verb.past}</span>
                    <span class="conjugation">Future: ${verb.future}</span>
                </div>
                <div class="speak-indicator">🔊 Click to hear</div>
            </div>
        `;

    // Make entire card clickable
    card.addEventListener("click", () => speak(verb.pronunciation));
    card.style.cursor = "pointer";

    container.appendChild(card);
  });
}

// Render travel vocabulary section
function renderTravelVocabulary() {
  const container = document.getElementById("travelVocabGrid");
  container.innerHTML = "";

  mongolianData.travelVocabulary.forEach((vocab) => {
    const card = document.createElement("div");
    card.className = "vocab-card";
    card.innerHTML = `
            <div class="card-image">📚</div>
            <div class="card-content">
                <h3>${vocab.mongolian}</h3>
                <p class="pronunciation">${vocab.pronunciation}</p>
                <p class="ipa">[${vocab.ipa}]</p>
                <p class="english">${vocab.english}</p>
                <div class="speak-indicator">🔊 Click to hear</div>
            </div>
        `;

    // Make entire card clickable
    card.addEventListener("click", () => speak(vocab.pronunciation));
    card.style.cursor = "pointer";

    container.appendChild(card);
  });
}

// Render romantic phrases section
function renderRomanticPhrases() {
  const container = document.getElementById("romanticPhrasesGrid");
  container.innerHTML = "";

  mongolianData.romanticPhrases.forEach((phrase) => {
    const card = document.createElement("div");
    card.className = "phrase-card";
    card.innerHTML = `
            <div class="card-image">💕</div>
            <div class="card-content">
                <h3>${phrase.mongolian}</h3>
                <p class="pronunciation">${phrase.pronunciation}</p>
                <p class="ipa">[${phrase.ipa}]</p>
                <p class="english">${phrase.english}</p>
                <div class="speak-indicator">🔊 Click to hear</div>
            </div>
        `;

    // Make entire card clickable
    card.addEventListener("click", () => speak(phrase.pronunciation));
    card.style.cursor = "pointer";

    container.appendChild(card);
  });
}

// Render cultural phrases section
function renderCulturalPhrases() {
  const container = document.getElementById("culturalPhrasesGrid");
  container.innerHTML = "";

  mongolianData.culturalPhrases.forEach((phrase) => {
    const card = document.createElement("div");
    card.className = "phrase-card";
    card.innerHTML = `
            <div class="card-image">🏛️</div>
            <div class="card-content">
                <h3>${phrase.mongolian}</h3>
                <p class="pronunciation">${phrase.pronunciation}</p>
                <p class="ipa">[${phrase.ipa}]</p>
                <p class="english">${phrase.english}</p>
                <div class="speak-indicator">🔊 Click to hear</div>
            </div>
        `;

    // Make entire card clickable
    card.addEventListener("click", () => speak(phrase.pronunciation));
    card.style.cursor = "pointer";

    container.appendChild(card);
  });
}

// Speech synthesis function
function speak(text) {
  if ("speechSynthesis" in window) {
    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Try to use Spanish voice for better Mongolian pronunciation
    const voices = speechSynthesis.getVoices();
    let spanishVoice = voices.find(
      (voice) =>
        voice.lang.includes("es") ||
        voice.name.toLowerCase().includes("spanish") ||
        voice.name.toLowerCase().includes("español"),
    );

    if (spanishVoice) {
      utterance.voice = spanishVoice;
      utterance.lang = spanishVoice.lang;
    } else {
      // Fallback to default voice
      utterance.lang = "en-US";
    }

    // Optimize settings for learning
    utterance.rate = 0.7; // Slower for better understanding
    utterance.pitch = 1.0; // Normal pitch
    utterance.volume = 1.0; // Full volume

    // Add event listeners for better user experience
    utterance.onstart = () => {
      console.log(
        `Speaking: ${text} with voice: ${utterance.voice?.name || "default"}`,
      );
    };

    utterance.onend = () => {
      console.log("Speech finished");
    };

    utterance.onerror = (event) => {
      console.error("Speech error:", event.error);
    };

    speechSynthesis.speak(utterance);
  } else {
    console.log("Speech synthesis not supported");
    // Fallback: show pronunciation in an alert or overlay
    showPronunciationFallback(text);
  }
}

// Fallback function to show pronunciation
function showPronunciationFallback(text) {
  // Create a temporary overlay to show pronunciation
  const overlay = document.createElement("div");
  overlay.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        font-size: 1.2rem;
        font-weight: 600;
        z-index: 1000;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        max-width: 300px;
    `;

  overlay.innerHTML = `
        <div style="margin-bottom: 10px;">🔊 Pronunciation:</div>
        <div style="font-size: 1.5rem; color: #4facfe; margin-bottom: 8px;">${text}</div>
    `;

  document.body.appendChild(overlay);

  // Remove overlay after 3 seconds
  setTimeout(() => {
    if (overlay.parentNode) {
      overlay.parentNode.removeChild(overlay);
    }
  }, 3000);
}

// Quiz functions
function startQuiz() {
  // Combine all data for quiz questions
  const allData = [
    ...mongolianData.alphabet.cyrillic.map((item) => ({
      question: `What is the pronunciation of "${item.letter}"?`,
      correct: item.pronunciation,
      options: [
        item.pronunciation,
        item.ipa,
        item.example.split(" ")[0],
        "None of the above",
      ],
    })),
    ...mongolianData.numbers.map((item) => ({
      question: `How do you say "${item.english}" in Mongolian?`,
      correct: item.pronunciation,
      options: [
        item.pronunciation,
        item.mongolian,
        item.ipa,
        "None of the above",
      ],
    })),
    ...mongolianData.basicWords.map((item) => ({
      question: `What does "${item.mongolian}" mean?`,
      correct: item.english,
      options: [
        item.english,
        item.pronunciation,
        item.ipa,
        "None of the above",
      ],
    })),
    ...mongolianData.travelPhrases.map((item) => ({
      question: `Translate: "${item.english}"`,
      correct: item.pronunciation,
      options: [
        item.pronunciation,
        item.mongolian,
        item.ipa,
        "None of the above",
      ],
    })),
    ...mongolianData.essentialVerbs.map((item) => ({
      question: `What is the present tense of "${item.mongolian}"?`,
      correct: item.present,
      options: [item.present, item.past, item.future, "None of the above"],
    })),
    ...mongolianData.travelVocabulary.map((item) => ({
      question: `What is "${item.english}" in Mongolian?`,
      correct: item.pronunciation,
      options: [
        item.pronunciation,
        item.mongolian,
        item.ipa,
        "None of the above",
      ],
    })),
    ...mongolianData.romanticPhrases.map((item) => ({
      question: `What does "${item.mongolian}" mean?`,
      correct: item.english,
      options: [
        item.english,
        item.pronunciation,
        item.ipa,
        "None of the above",
      ],
    })),
    ...mongolianData.culturalPhrases.map((item) => ({
      question: `What does "${item.mongolian}" mean?`,
      correct: item.english,
      options: [
        item.english,
        item.pronunciation,
        item.ipa,
        "None of the above",
      ],
    })),
  ];

  // Shuffle and select 10 questions
  questions = allData.sort(() => Math.random() - 0.5).slice(0, 10);
  currentQuestion = 0;
  score = 0;

  showQuizQuestion();
  document.getElementById("startQuiz").style.display = "none";
  document.getElementById("quizQuestion").style.display = "block";
}

function showQuizQuestion() {
  if (currentQuestion >= questions.length) {
    showQuizResults();
    return;
  }

  const question = questions[currentQuestion];
  const options = question.options.sort(() => Math.random() - 0.5);

  document.getElementById("questionText").textContent = question.question;

  const optionsContainer = document.getElementById("quizOptions");
  optionsContainer.innerHTML = "";

  options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "quiz-option";
    button.textContent = option;
    button.onclick = () => selectAnswer(option);
    optionsContainer.appendChild(button);
  });
}

function selectAnswer(selected) {
  const question = questions[currentQuestion];
  const isCorrect = selected === question.correct;

  if (isCorrect) {
    score++;
  }

  // Show feedback
  const options = document.querySelectorAll(".quiz-option");
  options.forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === question.correct) {
      btn.classList.add("correct");
    } else if (btn.textContent === selected && !isCorrect) {
      btn.classList.add("incorrect");
    }
  });

  // Show result message
  const resultText = document.getElementById("resultText");
  resultText.textContent = isCorrect
    ? "✅ Correct! Well done!"
    : `❌ Incorrect. The correct answer is: ${question.correct}`;
  resultText.className = `quiz-result ${isCorrect ? "correct" : "incorrect"}`;
  document.getElementById("quizResult").style.display = "block";

  // Show next button
  document.getElementById("nextQuestion").style.display = "inline-block";
}

function nextQuestion() {
  currentQuestion++;
  document.getElementById("nextQuestion").style.display = "none";
  document.getElementById("quizResult").style.display = "none";
  showQuizQuestion();
}

function showQuizResults() {
  const percentage = Math.round((score / questions.length) * 100);
  document.getElementById("scoreDisplay").textContent =
    `${score}/${questions.length} (${percentage}%)`;

  document.getElementById("quizQuestion").style.display = "none";
  document.getElementById("quizScore").style.display = "block";

  // Add encouraging message
  const scoreMessage = document.createElement("p");
  scoreMessage.textContent = getResultMessage(percentage);
  scoreMessage.style.marginTop = "15px";
  scoreMessage.style.fontWeight = "600";
  document.getElementById("quizScore").appendChild(scoreMessage);
}

function getResultMessage(percentage) {
  if (percentage >= 90)
    return "🎉 Excellent! You're a Mongolian language master!";
  if (percentage >= 80) return "🌟 Great job! You're doing very well!";
  if (percentage >= 70) return "👍 Good work! Keep practicing!";
  if (percentage >= 60) return "📚 Not bad! Review the material and try again!";
  return "💪 Keep studying! Practice makes perfect!";
}

function restartQuiz() {
  document.getElementById("quizScore").style.display = "none";
  document.getElementById("startQuiz").style.display = "inline-block";
  // Remove any added score messages
  const scoreMessages = document.querySelectorAll(
    "#quizScore p:not(:first-child)",
  );
  scoreMessages.forEach((msg) => msg.remove());
}
