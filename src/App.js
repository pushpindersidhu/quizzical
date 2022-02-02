import "./App.css";
import React from "react";
import StartScreen from "./components/StartScreen";
import Quiz from "./components/Quiz";

function App() {
  const [quizStarted, setQuizStarted] = React.useState(false);
  
  function startQuiz() {
    setQuizStarted((prevQuizStarted) => !prevQuizStarted);
  }

  return (
    <div className="App">
      {quizStarted ? (
        <Quiz />
      ) : (
        <StartScreen startQuiz={startQuiz} />
      )}
    </div>
  );
}

export default App;
