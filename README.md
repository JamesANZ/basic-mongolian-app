# 🇲🇳 Mongolian Learning App

A comprehensive web application to help you learn the Mongolian language, including the Cyrillic alphabet, numbers, basic words, and interactive quizzes.

## Features

### 📚 Learning Sections

- **Alphabet**: Learn the complete Mongolian Cyrillic alphabet with pronunciation and examples
- **Numbers**: Master counting from 1-20 in Mongolian
- **Basic Words**: Essential vocabulary with pronunciation guides
- **Interactive Quiz**: Test your knowledge with randomized questions

### 🎯 Interactive Features

- **Click to Pronounce**: Click on any card to hear the pronunciation (uses browser speech synthesis)
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Keyboard Navigation**: Use arrow keys to navigate between sections
- **Beautiful UI**: Modern gradient design with smooth animations

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

3. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

### Production Build

To run the app in production mode:

```bash
npm start
```

## How to Use

### Learning the Alphabet

1. Click on the "Alphabet" tab
2. Browse through the Cyrillic letters
3. Click on any letter card to hear its pronunciation
4. Study the example words for each letter

### Learning Numbers

1. Navigate to the "Numbers" section
2. Learn numbers 1-20 in Mongolian
3. Click on number cards to hear pronunciation
4. Practice counting in Mongolian

### Learning Basic Words

1. Go to the "Basic Words" section
2. Study common Mongolian phrases and vocabulary
3. Click on word cards to hear pronunciation
4. Memorize the English translations

### Taking the Quiz

1. Click on the "Quiz" tab
2. Press "Start Quiz" to begin
3. Answer 10 randomized questions
4. Get immediate feedback on your answers
5. View your final score and encouraging message
6. Click "Try Again" to retake the quiz

## Technical Details

### Architecture

- **Backend**: Node.js with Express.js
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Styling**: Modern CSS with gradients and animations
- **Speech**: Browser's Web Speech API for pronunciation

### File Structure

```
mongolian-game/
├── server.js              # Express server and API endpoints
├── package.json           # Dependencies and scripts
├── README.md             # This file
└── public/               # Static files
    ├── index.html        # Main HTML file
    ├── styles.css        # CSS styling
    └── script.js         # Frontend JavaScript
```

### API Endpoints

- `GET /` - Serves the main HTML page
- `GET /api/mongolian-data` - Returns Mongolian language data (alphabet, numbers, words)

## Customization

### Adding More Content

You can easily add more Mongolian content by modifying the `mongolianData` object in `server.js`:

```javascript
// Add more alphabet letters
{ letter: 'Ң', pronunciation: 'Ng', example: 'Ңаа (Ngaa) - Yes' }

// Add more numbers
{ number: 21, mongolian: 'хорин нэг', pronunciation: 'khorin neg', english: 'twenty-one' }

// Add more words
{ mongolian: 'Байгаль', pronunciation: 'Baigal', english: 'Nature' }
```

### Styling

The app uses modern CSS with:

- CSS Grid for responsive layouts
- CSS Gradients for beautiful backgrounds
- CSS Transitions for smooth animations
- Media queries for mobile responsiveness

## Browser Compatibility

The app works best in modern browsers that support:

- ES6+ JavaScript features
- CSS Grid and Flexbox
- Web Speech API (for pronunciation)
- Fetch API

### Supported Browsers

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Learning Tips

1. **Start with the Alphabet**: Understanding the Cyrillic script is fundamental
2. **Practice Pronunciation**: Use the click-to-speak feature regularly
3. **Take Regular Quizzes**: Test your knowledge to reinforce learning
4. **Review Frequently**: Go back to previous sections to refresh your memory
5. **Practice Numbers**: Counting is essential for everyday communication

## Contributing

Feel free to contribute to this project by:

- Adding more Mongolian vocabulary
- Improving the pronunciation system
- Enhancing the quiz functionality
- Adding new learning features
- Improving the UI/UX design

## License

This project is licensed under the ISC License.

## Acknowledgments

- Mongolian language data and pronunciation guides
- Modern web development best practices
- Educational app design principles

---

**Happy Learning! 🇲🇳**

Start your Mongolian language journey today with this interactive learning app!
