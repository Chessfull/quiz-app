import React from 'react';

const ResultScreen = ({ results, questions, onRestartQuiz }) => {
  return (
    <div className="quiz-container">
      <div className="result-content">
        {/* Left side - Question Details */}
        <div className="result-answers">
          <h3>Soru Detayları</h3>
          <div className="answers-list">
            {questions.map((question, index) => (
              <div 
                key={index} 
                className={`answer-item ${
                  results.answers && results.answers[index]
                    ? results.answers[index].isCorrect 
                      ? 'correct'
                      : 'incorrect'
                    : 'unanswered'
                }`}
              >
                <div className="question-number">Soru {index + 1}</div>
                <div className="answer-content">
                  {results.answers && results.answers[index] ? (
                    <>
                      <div className="user-answer">
                        Cevabınız: {results.answers[index].selectedAnswer || 'Boş'}
                      </div>
                      <div className="correct-answer">
                        Doğru Cevap: {question.answer}
                      </div>
                    </>
                  ) : (
                    <div className="user-answer">Cevaplanmadı</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Quiz Results */}
        <div className="result-summary">
          <h3>Quiz Sonuçları</h3>
          <div className="result-details">
            <p className="correct">✅ Doğru: {results.correct}</p>
            <p className="incorrect">❌ Yanlış: {results.incorrect}</p>
            <p className="unanswered">
              ❓ Boş: {questions.length - (results.correct + results.incorrect)}
            </p>
          </div>
          <button 
            onClick={onRestartQuiz}
            className="restart-button"
          >
            Testi Tekrarla
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
