import logo from "./logo.svg";
import React from "react";
import questions from "./questions.json";
import Question from "./components/Question";
import { addNewQuestion, getAllQuestions } from "./services/questions";

// goals for now: add a new question with the right data
// filter in real time by either tag or content
// remove question from list

class App extends React.Component {
  state = {
    questions: [],
    search: "",
    question: "",
    topic: "",
    author: "",
    tags: "",
  };

  componentDidMount = () => {
    getAllQuestions().then((questions) => {
      this.setState({ questions });
    });
  };

  handleChange = (event) => {
    console.log(event.target.name, ": ", event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    const question = {
      question: this.state.question,
      author: this.state.author,
      topic: this.state.topic,
      tags: this.state.tags,
    };
    addNewQuestion(question).then((res) => {
      console.log("res:", res);
      this.setState({
        questions: [res, ...this.state.questions],
      });
    });
  };

  render() {
    const filteredQuestions = this.state.questions.filter((el) => {
      return (
        el.question.toLowerCase().includes(this.state.search.toLowerCase()) ||
        el.author.toLowerCase().includes(this.state.search.toLowerCase())
      );
    });

    return (
      <div style={{ margin: "0 auto", maxWidth: "768px" }} className="App">
        <h3 style={{ textAlign: "center" }}>Slack overflow</h3>
        <div>
          <input
            style={{ width: "100%" }}
            name="search"
            value={this.state.search}
            onChange={this.handleChange}
          />
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="question"
              value={this.state.question}
              onChange={this.handleChange}
              placeholder="Type your question here"
            />
            <input
              type="text"
              name="tags"
              value={this.state.tags}
              onChange={this.handleChange}
              placeholder="Type your Tags"
            />
            <input
              type="text"
              name="author"
              onChange={this.handleChange}
              value={this.state.author}
              placeholder="Type your name here"
            />
            <input
              type="text"
              name="topic"
              value={this.state.topic}
              onChange={this.handleChange}
              placeholder="Type your topic here"
            />
            <button type="submit">Submit this question</button>
          </form>
          {/* <input
            style={{ width: "100%" }}
            onChange={(event) => this.handleChange(event)}
          /> */}
        </div>
        {filteredQuestions.map((el) => (
          <Question key={el.id} {...el} />
        ))}
      </div>
    );
  }
}

export default App;
