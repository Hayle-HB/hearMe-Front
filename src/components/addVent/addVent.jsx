import React, { useState } from "react";
import "./addVent.css";
import Question from "./Question/Question";
import TypeWriter from "typewriter-effect";
import useFetch from "../../hook/useFetch";

const AddVent = () => {
  const [questions, setQuestions] = useState([
    { id: 1, question: "Do you want to allow comments?", answer: null },
    { id: 2, question: "Do you want to show your identity?", answer: null },
    {
      id: 3,
      question: "Do you have a past post you want to refer?",
      answer: null,
    },
    {
      id: 4,
      question: "Do you want to receive notifications for new comments?",
      answer: null,
    },
  ]);

  const [topics, setTopics] = useState([
    { selected: false, value: "Technology" },
    { selected: false, value: "Education" },
    { selected: false, value: "Health" },
    { selected: false, value: "Science" },
    { selected: false, value: "Environment" },
    { selected: false, value: "Art" },
    { selected: false, value: "Music" },
    { selected: false, value: "Movies" },
    { selected: false, value: "History" },
    { selected: false, value: "Sports" },
    { selected: false, value: "Travel" },
    { selected: false, value: "Food" },
    { selected: false, value: "Fashion" },
    { selected: false, value: "Politics" },
    { selected: false, value: "Finance" },
    { selected: false, value: "Economics" },
    { selected: false, value: "Culture" },
    { selected: false, value: "Gaming" },
    { selected: false, value: "Programming" },
    { selected: false, value: "Entrepreneurship" },
    { selected: false, value: "Philosophy" },
    { selected: false, value: "Astronomy" },
    { selected: false, value: "Psychology" },
    { selected: false, value: "Literature" },
    { selected: false, value: "Photography" },
    { selected: false, value: "Fitness" },
    { selected: false, value: "Space Exploration" },
    { selected: false, value: "AI" },
    { selected: false, value: "Machine Learning" },
    { selected: false, value: "Blockchain" },
  ]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postData, setPostData] = useState(null);

  // const { data, error, loading } = useFetch(
  //   "http://localhost:1000/api/posts",
  //   "POST",
  //   postData
  // );

  const handleAnswer = (idx, answer) => {
    const updatedQuestions = [...questions];
    updatedQuestions[idx].answer = answer;
    setQuestions(updatedQuestions);

    if (idx < questions.length - 1) {
      setCurrentQuestion(idx + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const jumpToQuestion = (idx) => {
    setCurrentQuestion(idx);
  };

  const handleSelectTopics = (index) => {
    const newTopic = [...topics];
    newTopic[index].selected = !newTopic[index].selected;
    setTopics(newTopic);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Filter selected topics
    const filterTopic = topics
      .filter((item) => item.selected)
      .map((item) => item.value);

    const properties = ["comment", "identity", "refer", "notifications"];
    const answer = questions.map((question, index) => {
      return { [properties[index]]: question.answer };
    });

    const post = {
      title,
      content,
      topic: filterTopic,
      answer: answer,
    };

    // Update the postData state
    setPostData(post);

    // Perform the fetch request
    try {
      const response = await fetch("http://localhost:1000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log(responseData); // Handle the response data here
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="addVent-container">
      <h2 className="text-red-500">What is on your mind?</h2>
      <div className="addVent-Content">
        <Question
          questions={questions}
          currentQuestion={currentQuestion}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          handleAnswer={handleAnswer}
          jumpToQuestion={jumpToQuestion}
        />
        <div className="addVent-form">
          <div className="inputBox">
            <input onChange={handleTitleChange} type="text" required />
            <span>Title</span>
          </div>

          <div className="inputBox">
            <textarea onChange={handleContentChange} required></textarea>
            <span>Content</span>
          </div>
          <div className="topics-container">
            <p>
              <TypeWriter
                options={{
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  strings: ["Select more topics as you can"],
                }}
              />
            </p>

            <div className="topics">
              {topics.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectTopics(index)}
                  className={`item ${item.selected ? "selected" : ""}`}
                >
                  {item.value}
                </button>
              ))}
            </div>
          </div>
          <div className="submit">
            <button  onClick={handleSubmit} type="submit">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVent;
