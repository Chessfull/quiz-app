import React, { useState, useEffect, useCallback } from "react";

// -> Main quiz screen, I showed questions etc. in this component
function QuizScreen({ questions, onQuizComplete }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // -> Tracking current question index

  const [timeRemaining, setTimeRemaining] = useState(30); // -> Time left for the current question

  const [optionsVisible, setOptionsVisible] = useState(false); // -> Whether options are visible for 4 seconds rule given in task instruction

  const [selectedAnswer, setSelectedAnswer] = useState(null); // -> Stores the selected answer for result

  // ▼ I m tracking quiz results in here ▼
  const [quizResults, setQuizResults] = useState({
    correct: 0,
    incorrect: 0,
    unanswered: 0,
  });

  const currentQuestion = questions[currentQuestionIndex]; // -> Get the current question

  // ▼ Function to go to the next question or finish the quiz ▼
  const moveToNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeRemaining(30); // -> Reseting time for the next question
      setOptionsVisible(false); // -> Hiding options for the next question
      setSelectedAnswer(null); // -> Clearing the selected answer
    } else {
      onQuizComplete(quizResults); // -> End the quiz and show results
    }
  }, [currentQuestionIndex, questions.length, onQuizComplete, quizResults]);

  useEffect(() => {
    // ▼ Showing options after 4 seconds like I mentioned above given in task instruction ▼
    const showOptionsTimer = setTimeout(() => {
      setOptionsVisible(true);
    }, 4000);

    // Countdown timer for the question
    const countdownTimer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimer); // -> Stop timer when no time
          setQuizResults((prev) => ({
            ...prev,
            unanswered: prev.unanswered + 1, // -> Mark the question as unanswered for result
          }));
          moveToNextQuestion(); // -> Move to the next question
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // ▼ Cleanup timers when moving to the next question ▼
    return () => {
      clearTimeout(showOptionsTimer);
      clearInterval(countdownTimer);
    };
  }, [currentQuestionIndex, moveToNextQuestion]);

  // ▼ Handle answer selection ▼
  const handleAnswerSelect = (answer) => {
    if (!optionsVisible || selectedAnswer) return; // -> Do nothing if options are hidden or an answer is already selected

    setSelectedAnswer(answer);

    const isCorrect = answer === currentQuestion.answer; // -> Check if the answer is correct
    setQuizResults((prev) => ({
      ...prev,
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      incorrect: !isCorrect ? prev.incorrect + 1 : prev.incorrect,
    }));

    setTimeout(moveToNextQuestion, 1000); // -> Go to the next question after 1 second
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="question-counter">
          Question {currentQuestionIndex + 1} / {questions.length}
        </div>
        <div className="timer">⏰ {timeRemaining} sec</div>
      </div>

      {/* Question image */}
      <div className="question-image">
        <img src={`/images/${currentQuestion.media}`} alt="Question Image" />
      </div>

      {/* Question text */}
      <div className="question-text">{currentQuestion.question}</div>

      {/* Options for the current question */}
      <div className="options-container">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(option)} // -> Select an handle with answer
            className={`option-button ${
              selectedAnswer
                ? option === currentQuestion.answer
                  ? "correct"
                  : option === selectedAnswer
                  ? "incorrect"
                  : ""
                : ""
            } ${optionsVisible ? "visible" : "option-hidden"}`}
            disabled={!optionsVisible || selectedAnswer} // -> Disable buttons if options are hidden or an answer is selected
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuizScreen;
