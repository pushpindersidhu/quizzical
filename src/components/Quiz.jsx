import React from "react";
import Question from "./Question";
import { nanoid } from "nanoid";
import he from "he";

function Quiz() {
  const [quiz, setQuiz] = React.useState([]);
  const [submitted, setSubmitted] = React.useState(false);
  const [warning, setWarning] = React.useState(false);

  React.useEffect(() => {
    getQuiz();
  }, []);

  function getQuiz() {
    fetch("https://opentdb.com/api.php?amount=10")
      .then((res) => res.json())
      .then((data) => {
        const quizData = [];
        for (let i = 0; i < data.results.length; i++) {
          const result = data.results[i];
          const { type, question, correct_answer, incorrect_answers } = result;
          const answers = [...incorrect_answers];
          answers.splice(
            Math.floor(Math.random() * answers.length),
            0,
            correct_answer
          );
          quizData.push({
            id: nanoid(),
            question: he.decode(question),
            type: type,
            selectedAnswerId: null,
            answers: answers.map((answer) => ({
              id: nanoid(),
              answer: he.decode(answer),
              correct: answer === correct_answer,
            })),
          });
        }
        setQuiz(quizData);
      });
  }

  function selectAnswer(questionId, answerId) {
    setQuiz((prevQuiz) =>
      prevQuiz.map((question) =>
        question.id === questionId
          ? { ...question, selectedAnswerId: answerId }
          : question
      )
    );
    setWarning(false);
  }

  function submit() {
    if (getAttemptedAnswers() === getTotalQuestions()) {
      setSubmitted(true);
    } else {
      setWarning(true);
    }
  }

  function reset() {
    setWarning(false);
    setQuiz([]);
    setSubmitted(false);
    getQuiz();
  }

  function getCorrectAnswers() {
    let count = 0;
    quiz.map((question) =>
      question.answers.map(
        (answer) =>
          answer.id === question.selectedAnswerId && answer.correct && count++
      )
    );
    return count;
  }

  function getAttemptedAnswers() {
    let count = 0;
    quiz.map((question) => question.selectedAnswerId && count++);
    return count;
  }

  function getTotalQuestions() {
    return quiz.length;
  }

  const questionsJSX = quiz.map((question) => (
    <Question
      selectAnswer={(answerId) => selectAnswer(question.id, answerId)}
      key={question.id}
      question={question}
      submitted={submitted}
    />
  ));

  console.log(questionsJSX);

  return (
    <div className="quiz">
      <h1 className="quiz-title">Quizzical</h1>
      {questionsJSX.length === 0 ? (
        <h2 className="loading">Loading...</h2>
      ) : (
        questionsJSX
      )}
      <div className="submit-container">
        {submitted && (
          <p className="score">
            You scored {getCorrectAnswers()}/{getTotalQuestions()}
          </p>
        )}
        {warning && (
          <p className="attempt-all">
            Attempt all remaining questions before submitting.
          </p>
        )}
        {submitted ? (
          <button onClick={reset} className="reset-quiz">
            Reset
          </button>
        ) : (
          <button onClick={submit} className="submit-quiz">
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

export default Quiz;
