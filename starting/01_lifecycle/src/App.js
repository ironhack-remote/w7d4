import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import axios from "axios";

const rickAndMortyService = axios.create({
  baseURL: "https://rickandmortyapi.com/api/character",
});

const paginatedRequest = (page = "1") =>
  rickAndMortyService.get(`?page=${page}`).then((response) => response);

// setting state ✅
// render function
// component just mounted / been attached to the browser. Lets check if there is a componentDidMount
// if there is, call it. componentDidMount()

// update state or props changed:
// new state getting set
// render function
// component just updated. Lets check if there is a componentDidUpdate
// if there is, call it, componentDidUpdate()

class App extends Component {
  state = { counter: 0, characters: [], page: 1 };

  increment = () => {
    this.setState({ counter: this.state.counter + 1 });
  };

  get20Characters = () => {
    paginatedRequest().then((res) => {
      // console.log("res:", res);
      this.setState({
        characters: res.data.results,
      });
    });
    // rickAndMortyService.get().then((res) => {
    // });
  };

  componentDidMount = () => {
    console.log("THIS APP COMPONENT HAS BEEN ADDED TO THE DOM");
    console.log("INITIAL STATE IN MOUNT", this.state);
    this.get20Characters();
  };

  componentDidUpdate = (prevProps, prevState) => {
    console.log("THIS APP COMPONENT HAS BEEN UPDATED");
    console.log("NEW SHINY STATE", this.state);
    console.log("prevState:", prevState);
    // if (this.state.page !== prevState.page) {
    //   paginatedRequest(this.state.page).then((res) => {
    //     this.setState({
    //       characters: [...res.data.results, ...prevState.characters],
    //     });
    //   });
    // }
  };

  moreCharacters = () => {
    const page = this.state.page + 1;

    paginatedRequest(page).then((res) => {
      this.setState({
        characters: [...res.data.results, ...this.state.characters],
        page,
      });
    });

    // it can be yours below. No need to stress

    // paginatedRequest(this.state.page + 1).then((res) => {
    //   console.log("res:", res);
    //   this.setState({
    //     characters: [...res.data.results, ...this.state.characters],
    //     page: this.state.page + 1,
    //   });

    // using the component did update
    // this.setState({
    //   page: this.state.page + 1,
    // });

    // Andres preffered way of making this kind of request
  };

  render() {
    return (
      <div className="App">
        <h1>Hello</h1>
        <button onClick={this.moreCharacters}>Get me more characters</button>
        {this.state.characters.map((el) => (
          <RickApiImg image={el.image} key={el.id} />
        ))}
        {/* <button onClick={this.increment}>PLUS</button>
        {this.state.counter < 5 ? (
          <Counter counter={this.state.counter} />
        ) : (
          <div />
        )} */}
        {/* <Counter counter={this.state.counter} /> */}
      </div>
    );
  }
}

function RickApiImg(props) {
  return (
    <div>
      <img src={props.image} alt="" />
    </div>
  );
}

class Counter extends Component {
  componentDidMount = () => {
    console.log("COUNTER MOUTED");
  };

  componentDidUpdate = () => {
    console.log("COUNTER UPDATING");
  };

  componentWillUnmount = () => {
    console.log("COUNTER UNMOUNTING");
  };

  render() {
    return <h1>{this.props.counter}</h1>;
  }
}

export default App;
