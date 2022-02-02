import React from "react";

function StartScreen(props) {
  return (
    <div className="start-screen">
      <h1 className="start-screen-title">Quizzical</h1>
      <p className="start-screen-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, ratione voluptas magnam beatae sunt ex accusamus voluptatibus dignissimos at hic optio fuga esse, sapiente numquam labore quisquam. Ad, reiciendis a?</p>
      <div className="animated-button">
        <button
          onClick={props.startQuiz}
          className="start-screen-start-quiz-button"
        >
          Start quiz
        </button>
      </div>
    </div>
  );
}

export default StartScreen;
