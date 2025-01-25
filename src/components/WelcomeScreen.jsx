import React from 'react';

function WelcomeScreen({ onStartQuiz }) {
  return (
 
      <div className="welcome-card">
        <h1>Mert ile Patika+ Quiz App Projesine Hoşgeldin! </h1>
        <div className="quiz-info">
          <p>🕒 Test 10 sorudan oluşmaktadır.</p>
          <p>⏳ Her soru için 30 saniye süreniz var.</p>
          <p>❗ İlk 4 saniye cevap şıkları gizlidir.</p>
          <p>🚫 Geçmiş sorulara geri dönülemez.</p>
        </div>
        <button 
          onClick={onStartQuiz}  // -> Start the quiz with click
          className="start-button"
        >
          Teste Başla
        </button>
      </div>
  );
}

export default WelcomeScreen;