import logo from "./logo.svg";
import React from "react";
import questions from "./questions.json";
import Question from "./components/Question";
import { addNewQuestion } from "./services/questions";

// goals for now: add a new question with the right data
// filter in real time by either tag or content
// select menu that is going to change things by topic

class App extends React.Component {
  render() {
    return (
      <div style={{ margin: "0 auto", maxWidth: "768px" }} className="App">
        <h3 style={{ textAlign: "center" }}>Slack overflow</h3>

        <div>Hello, these are the questions</div>
        {questions.map((el) => (
          <Question {...el} />
        ))}
      </div>
    );
  }
}

export default App;
