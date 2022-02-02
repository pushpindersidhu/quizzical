import React from "react";

function Question(props) {
  const { question, answers, selectedAnswerId } = props.question;

  const answersJSX = answers.map((answer) => {
    const styles = {
      backgroundColor:
        props.submitted && (answer.correct || answer.id === selectedAnswerId)
          ? answer.correct
            ? "#94D7A2"
            : "#F8BCBC"
          : answer.id === selectedAnswerId
          ? "#e0e4f8"
          : "#fff",
      border: answer.id === selectedAnswerId ? "none" : "solid 1px #293264",
    };

    return (
      <span
        key={answer.id}
        onClick={() => !props.submitted && props.selectAnswer(answer.id)}
        className="answer"
        style={styles}
      >
        {answer.answer}
      </span>
    );
  });

  return (
    <div className="question-container">
      <p className="question">{question}</p>
      <div className="answers-container">{answersJSX}</div>
    </div>
  );
}

export default Question;
