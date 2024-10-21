import React from "react";
import "./Question.css";
const Question = ({
  questions,
  currentQuestion,
  handleNext,
  handlePrevious,
  handleAnswer,
  jumpToQuestion,
}) => {
  return (
    <div className="question-box">
      <div className="preview-icons">
        <svg
          className="preview left"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          onClick={handlePrevious}
          style={{
            cursor: currentQuestion === 0 ? "not-allowed" : "pointer",
          }}
        >
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
        </svg>

        <svg
          className="preview right"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          onClick={handleNext} // Next question
          style={{
            cursor:
              currentQuestion === questions.length - 1
                ? "not-allowed"
                : "pointer",
          }} // Disable cursor if at last question
        >
          <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
        </svg>
      </div>
      <div className="questions">
        <p className="id">{questions[currentQuestion].id}</p>
        <p className="question">{questions[currentQuestion].question}</p>
        <div className="answer">
          <button
            onClick={() => handleAnswer(currentQuestion, "YES")}
            className={`${
              questions[currentQuestion].answer === "YES" ? "answered" : ""
            }`}
          >
            Yes
          </button>
          <button
            onClick={() => handleAnswer(currentQuestion, "NO")}
            className={`${
              questions[currentQuestion].answer === "NO" ? "answered" : ""
            }`}
          >
            No
          </button>
        </div>
      </div>
      <div className="question-dots">
        {questions.map((item, index) => (
          <span
            key={index}
            className={`dots ${index === currentQuestion ? " active" : ""} ${
              questions[index].answer ? "checked" : ""
            }`}
            onClick={() => jumpToQuestion(index)}
          >
            {
              questions[index].answer && <svg
              className="checkedSVG"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
            </svg>
            }
          </span>
        ))}
      </div>
    </div>
  );
};

export default Question;
