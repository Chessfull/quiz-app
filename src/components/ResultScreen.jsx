import React from 'react';

// -> Component for the result screen in the end like your counts ...
function ResultScreen({ results, onRestartQuiz }) {
  return (
    <div className="result-container">
      <div className="result-card">

        {/* ▼ Display of quiz results ▼ */}
        <h1>Quiz Results</h1>
        <div className="result-details">
          <p>✅ Doğru: {results.correct}</p>
          <p>❌ Yanlış: {results.incorrect}</p>
          <p>❓ Boş: {results.unanswered}</p>
        </div>

        <button 
          onClick={onRestartQuiz} /* -> Button for restarting to quiz */
          className="restart-button"
        >
          Restart Quiz
        </button>

      </div>
    </div>
  );
}

export default ResultScreen;
