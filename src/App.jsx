import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import { questions } from "../src/data/questions";

function App() {
  
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [results, setResults] = useState({
    correct: 0,
    incorrect: 0,
    unanswered: 0
  });

  // ▼ This area for props coming from components ▼
  const handleStartQuiz = () => {
    setCurrentScreen('quiz');
  };

  const handleQuizComplete = (quizResults) => {
    setResults(quizResults);
    setCurrentScreen('result');
  };

  const handleRestartQuiz = () => {
    setCurrentScreen('welcome');
  };


  return (
    <div className="app-container">

      {currentScreen === 'welcome' && (
        <WelcomeScreen onStartQuiz={handleStartQuiz} />
      )}
      {currentScreen === 'quiz' && (
        <QuizScreen 
          questions={questions} 
          onQuizComplete={handleQuizComplete} 
        />
      )}
      {currentScreen === 'result' && (
        <ResultScreen 
          results={results} 
          onRestartQuiz={handleRestartQuiz} 
        />
      )}

    </div>
  );
}

export default App;