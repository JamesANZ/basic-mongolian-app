// Global variables
let mongolianData = null;
let currentQuiz = null;
let quizScore = 0;
let currentQuestionIndex = 0;
let spanishVoice = null;

// DOM elements
const navButtons = document.querySelectorAll(".nav-btn");
const contentSections = document.querySelectorAll(".content-section");
const alphabetGrid = document.getElementById("alphabetGrid");
const numbersGrid = document.getElementById("numbersGrid");
const wordsGrid = document.getElementById("wordsGrid");
const travelPhrasesGrid = document.getElementById("travelPhrasesGrid");
const verbsGrid = document.getElementById("verbsGrid");
const travelVocabGrid = document.getElementById("travelVocabGrid");
const romanticPhrasesGrid = document.getElementById("romanticPhrasesGrid");

// Quiz elements
const startQuizBtn = document.getElementById("startQuiz");
const nextQuestionBtn = document.getElementById("nextQuestion");
const quizQuestion = document.getElementById("quizQuestion");
const questionText = document.getElementById("questionText");
const quizOptions = document.getElementById("quizOptions");
const quizResult = document.getElementById("quizResult");
const resultText = document.getElementById("resultText");
const quizScoreDiv = document.getElementById("quizScore");
const scoreDisplay = document.getElementById("scoreDisplay");
const restartQuizBtn = document.getElementById("restartQuiz");

// Initialize the app
document.addEventListener("DOMContentLoaded", async () => {
  await loadMongolianData();
  setupNavigation();
  setupSpanishVoice();
  setupQuiz();
  renderContent();
});

// Load Mongolian data from API
async function loadMongolianData() {
  try {
    const response = await fetch("/api/mongolian-data");
    mongolianData = await response.json();
  } catch (error) {
    console.error("Error loading Mongolian data:", error);
    // Fallback data if API fails
    mongolianData = {
      alphabet: { cyrillic: [] },
      numbers: [],
      basicWords: [],
      travelPhrases: [],
      essentialVerbs: [],
      travelVocabulary: [],
      romanticPhrases: [],
    };
  }
}

// Setup Spanish voice for Mongolian pronunciation
function setupSpanishVoice() {
  // Load available voices
  let voices = speechSynthesis.getVoices();

  if (voices.length === 0) {
    speechSynthesis.addEventListener("voiceschanged", () => {
      voices = speechSynthesis.getVoices();
      findSpanishVoice(voices);
    });
  } else {
    findSpanishVoice(voices);
  }
}

// Find and set Spanish voice
function findSpanishVoice(voices) {
  // Look for Spanish voices (they work well for Mongolian pronunciation)
  const spanishVoice = voices.find(
    (v) =>
      v.lang.toLowerCase().startsWith("es") ||
      v.name.toLowerCase().includes("spanish") ||
      v.name.toLowerCase().includes("español"),
  );

  if (spanishVoice) {
    spanishVoice = spanishVoice;
    console.log(
      `Using Spanish voice: ${spanishVoice.name} (${spanishVoice.lang})`,
    );
  } else {
    console.log("No Spanish voice found, will use default voice");
  }
}

// Setup navigation
function setupNavigation() {
  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetSection = button.getAttribute("data-section");
      switchSection(targetSection);
    });
  });
}

// Switch between sections
function switchSection(sectionName) {
  // Update navigation buttons
  navButtons.forEach((btn) => btn.classList.remove("active"));
  document
    .querySelector(`[data-section="${sectionName}"]`)
    .classList.add("active");

  // Update content sections
  contentSections.forEach((section) => section.classList.remove("active"));
  document.getElementById(sectionName).classList.add("active");
}

// Render content for all sections
function renderContent() {
  renderAlphabet();
  renderNumbers();
  renderWords();
  renderTravelPhrases();
  renderVerbs();
  renderTravelVocabulary();
  renderRomanticPhrases();
}

// Render alphabet section
function renderAlphabet() {
  if (!mongolianData?.alphabet?.cyrillic) return;

  alphabetGrid.innerHTML = "";
  mongolianData.alphabet.cyrillic.forEach((letter) => {
    const card = document.createElement("div");
    card.className = "alphabet-card";
    card.innerHTML = `
            <span class="letter">${letter.letter}</span>
            <div class="pronunciation">${letter.pronunciation}</div>
            ${letter.ipa ? `<div class="ipa">[${letter.ipa}]</div>` : ""}
            <div class="example">${letter.example}</div>
        `;

    // Add click event for pronunciation
    card.addEventListener("click", () => {
      speakText(letter.pronunciation, `Letter ${letter.letter}`);
    });

    alphabetGrid.appendChild(card);
  });
}

// Render numbers section
function renderNumbers() {
  if (!mongolianData?.numbers) return;

  numbersGrid.innerHTML = "";
  mongolianData.numbers.forEach((number) => {
    const card = document.createElement("div");
    card.className = "number-card";
    card.innerHTML = `
            <span class="number">${number.number}</span>
            <div class="mongolian">${number.mongolian}</div>
            <div class="pronunciation">${number.pronunciation}</div>
            ${number.ipa ? `<div class="ipa">[${number.ipa}]</div>` : ""}
            <div class="english">${number.english}</div>
        `;

    // Add click event for pronunciation
    card.addEventListener("click", () => {
      speakText(number.pronunciation, `Number ${number.number}`);
    });

    numbersGrid.appendChild(card);
  });
}

// Render words section
function renderWords() {
  if (!mongolianData?.basicWords) return;

  wordsGrid.innerHTML = "";
  mongolianData.basicWords.forEach((word) => {
    const card = document.createElement("div");
    card.className = "word-card";
    card.innerHTML = `
            <div class="mongolian">${word.mongolian}</div>
            <div class="pronunciation">${word.pronunciation}</div>
            ${word.ipa ? `<div class="ipa">[${word.ipa}]</div>` : ""}
            <div class="english">${word.english}</div>
        `;

    // Add click event for pronunciation
    card.addEventListener("click", () => {
      speakText(word.pronunciation, word.english);
    });

    wordsGrid.appendChild(card);
  });
}

// Render travel phrases section
function renderTravelPhrases() {
  if (!mongolianData?.travelPhrases) return;

  travelPhrasesGrid.innerHTML = "";
  mongolianData.travelPhrases.forEach((phrase) => {
    const card = document.createElement("div");
    card.className = "phrase-card";
    card.innerHTML = `
            <div class="mongolian">${phrase.mongolian}</div>
            <div class="pronunciation">${phrase.pronunciation}</div>
            ${phrase.ipa ? `<div class="ipa">[${phrase.ipa}]</div>` : ""}
            <div class="english">${phrase.english}</div>
        `;

    // Add click event for pronunciation
    card.addEventListener("click", () => {
      speakText(phrase.pronunciation, phrase.english);
    });

    travelPhrasesGrid.appendChild(card);
  });
}

// Render verbs section
function renderVerbs() {
  if (!mongolianData?.essentialVerbs) return;

  verbsGrid.innerHTML = "";
  mongolianData.essentialVerbs.forEach((verb) => {
    const card = document.createElement("div");
    card.className = "verb-card";
    card.innerHTML = `
            <div class="mongolian">${verb.mongolian}</div>
            <div class="pronunciation">${verb.pronunciation}</div>
            ${verb.ipa ? `<div class="ipa">[${verb.ipa}]</div>` : ""}
            <div class="english">${verb.english}</div>
            <div class="conjugations">
                <div class="present">Present: ${verb.present}</div>
                <div class="past">Past: ${verb.past}</div>
                <div class="future">Future: ${verb.future}</div>
            </div>
        `;

    // Add click event for pronunciation
    card.addEventListener("click", () => {
      speakText(verb.pronunciation, verb.english);
    });

    verbsGrid.appendChild(card);
  });
}

// Render travel vocabulary section
function renderTravelVocabulary() {
  if (!mongolianData?.travelVocabulary) return;

  travelVocabGrid.innerHTML = "";
  mongolianData.travelVocabulary.forEach((vocab) => {
    const card = document.createElement("div");
    card.className = "vocab-card";
    card.innerHTML = `
            <div class="mongolian">${vocab.mongolian}</div>
            <div class="pronunciation">${vocab.pronunciation}</div>
            ${vocab.ipa ? `<div class="ipa">[${vocab.ipa}]</div>` : ""}
            <div class="english">${vocab.english}</div>
        `;

    // Add click event for pronunciation
    card.addEventListener("click", () => {
      speakText(vocab.pronunciation, vocab.english);
    });

    travelVocabGrid.appendChild(card);
  });
}

// Render romantic phrases section
function renderRomanticPhrases() {
  if (!mongolianData?.romanticPhrases) return;

  romanticPhrasesGrid.innerHTML = "";
  mongolianData.romanticPhrases.forEach((phrase) => {
    const card = document.createElement("div");
    card.className = "phrase-card";
    card.innerHTML = `
            <div class="mongolian">${phrase.mongolian}</div>
            <div class="pronunciation">${phrase.pronunciation}</div>
            ${phrase.ipa ? `<div class="ipa">[${phrase.ipa}]</div>` : ""}
            <div class="english">${phrase.english}</div>
        `;

    // Add click event for pronunciation
    card.addEventListener("click", () => {
      speakText(phrase.pronunciation, phrase.english);
    });

    romanticPhrasesGrid.appendChild(card);
  });
}

// Text-to-speech function optimized for Spanish voice
function speakText(text, description = "") {
  if ("speechSynthesis" in window) {
    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Use Spanish voice if available
    if (spanishVoice) {
      utterance.voice = spanishVoice;
      utterance.lang = spanishVoice.lang;
    } else {
      // Fallback: try to find Spanish voice again
      const voices = speechSynthesis.getVoices();
      const spanishVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().startsWith("es") ||
          v.name.toLowerCase().includes("spanish") ||
          v.name.toLowerCase().includes("español"),
      );

      if (spanishVoice) {
        utterance.voice = spanishVoice;
        utterance.lang = spanishVoice.lang;
      } else {
        // Last resort: use default voice
        utterance.lang = "en-US";
      }
    }

    // Optimize settings for learning
    utterance.rate = 0.7; // Slower for better understanding
    utterance.pitch = 1.0; // Normal pitch
    utterance.volume = 1.0; // Full volume

    // Add event listeners for better user experience
    utterance.onstart = () => {
      console.log(
        `Speaking: ${text} (${description}) with voice: ${utterance.voice?.name || "default"}`,
      );
    };

    utterance.onend = () => {
      console.log("Speech finished");
    };

    utterance.onerror = (event) => {
      console.error("Speech error:", event.error);
      showPronunciationFallback(text, description);
    };

    speechSynthesis.speak(utterance);
  } else {
    showPronunciationFallback(text, description);
  }
}

// Fallback function to show pronunciation guide
function showPronunciationFallback(text, description = "") {
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
        ${description ? `<div style="font-size: 0.9rem; opacity: 0.8;">${description}</div>` : ""}
    `;

  document.body.appendChild(overlay);

  // Remove overlay after 3 seconds
  setTimeout(() => {
    if (overlay.parentNode) {
      overlay.parentNode.removeChild(overlay);
    }
  }, 3000);
}

// Quiz functionality
function setupQuiz() {
  startQuizBtn.addEventListener("click", startQuiz);
  nextQuestionBtn.addEventListener("click", nextQuestion);
  restartQuizBtn.addEventListener("click", startQuiz);
}

// Start the quiz
function startQuiz() {
  if (!mongolianData) return;

  // Reset quiz state
  quizScore = 0;
  currentQuestionIndex = 0;

  // Create quiz questions
  currentQuiz = generateQuizQuestions();

  // Show first question
  showQuestion();

  // Update UI
  startQuizBtn.style.display = "none";
  quizQuestion.style.display = "block";
  quizScoreDiv.style.display = "none";
}

// Generate quiz questions
function generateQuizQuestions() {
  const questions = [];

  // Add alphabet questions
  if (mongolianData.alphabet.cyrillic.length > 0) {
    const alphabetQuestions = generateAlphabetQuestions();
    questions.push(...alphabetQuestions);
  }

  // Add number questions
  if (mongolianData.numbers.length > 0) {
    const numberQuestions = generateNumberQuestions();
    questions.push(...numberQuestions);
  }

  // Add word questions
  if (mongolianData.basicWords.length > 0) {
    const wordQuestions = generateWordQuestions();
    questions.push(...wordQuestions);
  }

  // Add travel phrase questions
  if (mongolianData.travelPhrases.length > 0) {
    const phraseQuestions = generatePhraseQuestions();
    questions.push(...phraseQuestions);
  }

  // Add verb questions
  if (mongolianData.essentialVerbs.length > 0) {
    const verbQuestions = generateVerbQuestions();
    questions.push(...verbQuestions);
  }

  // Add vocabulary questions
  if (mongolianData.travelVocabulary.length > 0) {
    const vocabQuestions = generateVocabQuestions();
    questions.push(...vocabQuestions);
  }

  // Add romantic phrase questions
  if (mongolianData.romanticPhrases.length > 0) {
    const romanticQuestions = generateRomanticQuestions();
    questions.push(...romanticQuestions);
  }

  // Shuffle questions
  return shuffleArray(questions).slice(0, 15); // Increased to 15 questions
}

// Generate alphabet questions
function generateAlphabetQuestions() {
  const questions = [];
  const letters = mongolianData.alphabet.cyrillic;

  letters.forEach((letter) => {
    questions.push({
      type: "alphabet",
      question: `What is the pronunciation of the letter "${letter.letter}"?`,
      correctAnswer: letter.pronunciation,
      options: generateOptions(
        letters.map((l) => l.pronunciation),
        letter.pronunciation,
      ),
    });
  });

  return questions;
}

// Generate number questions
function generateNumberQuestions() {
  const questions = [];
  const numbers = mongolianData.numbers;

  numbers.forEach((number) => {
    questions.push({
      type: "number",
      question: `How do you say "${number.english}" in Mongolian?`,
      correctAnswer: number.mongolian,
      options: generateOptions(
        numbers.map((n) => n.mongolian),
        number.mongolian,
      ),
    });
  });

  return questions;
}

// Generate word questions
function generateWordQuestions() {
  const questions = [];
  const words = mongolianData.basicWords;

  words.forEach((word) => {
    questions.push({
      type: "word",
      question: `What does "${word.mongolian}" mean?`,
      correctAnswer: word.english,
      options: generateOptions(
        words.map((w) => w.english),
        word.english,
      ),
    });
  });

  return questions;
}

// Generate travel phrase questions
function generatePhraseQuestions() {
  const questions = [];
  const phrases = mongolianData.travelPhrases;

  phrases.forEach((phrase) => {
    questions.push({
      type: "phrase",
      question: `What does "${phrase.mongolian}" mean?`,
      correctAnswer: phrase.english,
      options: generateOptions(
        phrases.map((p) => p.english),
        phrase.english,
      ),
    });
  });

  return questions;
}

// Generate verb questions
function generateVerbQuestions() {
  const questions = [];
  const verbs = mongolianData.essentialVerbs;

  verbs.forEach((verb) => {
    questions.push({
      type: "verb",
      question: `What does the verb "${verb.mongolian}" mean?`,
      correctAnswer: verb.english,
      options: generateOptions(
        verbs.map((v) => v.english),
        verb.english,
      ),
    });
  });

  return questions;
}

// Generate vocabulary questions
function generateVocabQuestions() {
  const questions = [];
  const vocab = mongolianData.travelVocabulary;

  vocab.forEach((word) => {
    questions.push({
      type: "vocab",
      question: `What does "${word.mongolian}" mean?`,
      correctAnswer: word.english,
      options: generateOptions(
        vocab.map((v) => v.english),
        word.english,
      ),
    });
  });

  return questions;
}

// Generate romantic phrase questions
function generateRomanticQuestions() {
  const questions = [];
  const phrases = mongolianData.romanticPhrases;

  phrases.forEach((phrase) => {
    questions.push({
      type: "romantic",
      question: `What does "${phrase.mongolian}" mean?`,
      correctAnswer: phrase.english,
      options: generateOptions(
        phrases.map((p) => p.english),
        phrase.english,
      ),
    });
  });

  return questions;
}

// Generate options for multiple choice
function generateOptions(allOptions, correctAnswer) {
  const options = [correctAnswer];
  const filteredOptions = allOptions.filter((opt) => opt !== correctAnswer);

  // Add 3 random wrong options
  while (options.length < 4 && filteredOptions.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredOptions.length);
    const option = filteredOptions.splice(randomIndex, 1)[0];
    if (!options.includes(option)) {
      options.push(option);
    }
  }

  return shuffleArray(options);
}

// Show current question
function showQuestion() {
  if (currentQuestionIndex >= currentQuiz.length) {
    showQuizResults();
    return;
  }

  const question = currentQuiz[currentQuestionIndex];
  questionText.textContent = question.question;

  // Clear previous options
  quizOptions.innerHTML = "";
  quizResult.style.display = "none";

  // Add options
  question.options.forEach((option, index) => {
    const optionElement = document.createElement("div");
    optionElement.className = "quiz-option";
    optionElement.textContent = option;
    optionElement.addEventListener("click", () =>
      selectAnswer(option, question.correctAnswer),
    );
    quizOptions.appendChild(optionElement);
  });
}

// Handle answer selection
function selectAnswer(selectedAnswer, correctAnswer) {
  const options = document.querySelectorAll(".quiz-option");
  const isCorrect = selectedAnswer === correctAnswer;

  if (isCorrect) {
    quizScore++;
  }

  // Show correct/incorrect feedback
  options.forEach((option) => {
    option.style.pointerEvents = "none";
    if (option.textContent === correctAnswer) {
      option.classList.add("correct");
    } else if (option.textContent === selectedAnswer && !isCorrect) {
      option.classList.add("incorrect");
    }
  });

  // Show result message
  resultText.textContent = isCorrect
    ? "✅ Correct! Well done!"
    : `❌ Incorrect. The correct answer is: ${correctAnswer}`;
  resultText.className = `quiz-result ${isCorrect ? "correct" : "incorrect"}`;
  quizResult.style.display = "block";

  // Show next button
  nextQuestionBtn.style.display = "inline-block";
}

// Move to next question
function nextQuestion() {
  currentQuestionIndex++;
  nextQuestionBtn.style.display = "none";
  showQuestion();
}

// Show quiz results
function showQuizResults() {
  quizQuestion.style.display = "none";
  quizScoreDiv.style.display = "block";

  const percentage = Math.round((quizScore / currentQuiz.length) * 100);
  scoreDisplay.textContent = `${quizScore}/${currentQuiz.length} (${percentage}%)`;

  // Add encouraging message based on score
  const scoreMessage = document.createElement("p");
  if (percentage >= 90) {
    scoreMessage.textContent =
      "🎉 Excellent! You're a Mongolian language master!";
  } else if (percentage >= 70) {
    scoreMessage.textContent = "👍 Great job! Keep practicing!";
  } else if (percentage >= 50) {
    scoreMessage.textContent =
      "📚 Good effort! Review the lessons and try again!";
  } else {
    scoreMessage.textContent = "💪 Don't give up! Practice makes perfect!";
  }
  scoreMessage.style.marginTop = "15px";
  scoreMessage.style.fontWeight = "600";
  quizScoreDiv.appendChild(scoreMessage);
}

// Utility function to shuffle array
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Add some interactive features
document.addEventListener("DOMContentLoaded", () => {
  // Add hover effects for cards
  const cards = document.querySelectorAll(
    ".alphabet-card, .number-card, .word-card, .phrase-card, .verb-card, .vocab-card",
  );
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-5px) scale(1.02)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
    });
  });

  // Add keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      const activeSection = document.querySelector(".content-section.active");
      const currentIndex = Array.from(contentSections).indexOf(activeSection);
      let nextIndex;

      if (e.key === "ArrowRight") {
        nextIndex = (currentIndex + 1) % contentSections.length;
      } else {
        nextIndex =
          (currentIndex - 1 + contentSections.length) % contentSections.length;
      }

      const nextSection = contentSections[nextIndex].id;
      switchSection(nextSection);
    }
  });
});
