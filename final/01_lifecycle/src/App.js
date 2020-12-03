import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";
import axios from "axios";
import Character from "./components/Character";

const service = axios.create({
  baseURL: "https://rickandmortyapi.com/api/",
});

function saveToLocalStorage(value) {
  localStorage.setItem("characters", JSON.stringify(value));
}

function retrieveFromLocalStorage() {
  const characters = localStorage.getItem("characters");
  const parsed = JSON.parse(characters);
  console.log("parsed:", parsed);
  return parsed || [];
}

retrieveFromLocalStorage();

class App extends Component {
  state = {
    isLoading: false,
    characters: retrieveFromLocalStorage(),
    page: 1,
  };

  // method that gets called after the component initially mounts on the DOM
  componentDidMount = () => {
    // this will be explained during class. but its mostly for us to deal with component willunmount -> the example below
    // window.addEventListener("beforeunload", () => {
    //   saveToLocalStorage(this.state.characters);
    // });

    this.setState({
      isLoading: true,
    });
    service
      .get(`/character/?page=${this.state.page}`)
      .then((res) => {
        /* 
        this section was added later in this example mainly to eventually exemplify what componentWillUnmount can do
        if (this.state.characters.length > res.data.results.length) {
          const page = this.state.characters.length / 20;
          this.setState({ isLoading: false, page });
          return;
        }
        */
        this.setState({
          isLoading: false,
          characters: res.data.results,
        });
      })
      .catch(console.error);
  };

  componentWillUnmount = () => {
    window.removeEventListener("beforeunload", () => {
      saveToLocalStorage(this.state.characters);
    });
  };

  // this method gets called EVERY time that the component rerenders. And we have access to the previous values of props and the previous values of state (before the update itself occured)
  componentDidUpdate = (prevProps, prevState) => {
    // both versions are correct. Me, personally would always rather do it in the `renderMore` method instead. Because There I would have full control of any possible side effects that that method would try to have.
    // if (this.state.page !== prevState) {
    //   service.get(`/character/?page=${this.state.page}`).then((res) => {
    //     this.setState({
    //       isLoading: false,
    //       characters: [...res.data.results, ...prevState.characters],
    //     });
    //   });
    // }
  };

  renderMore = () => {
    this.setState(
      {
        page: this.state.page + 1,
        isLoading: true,
      },
      // this callback is called after we update the page
      () => {
        service.get(`/character/?page=${this.state.page}`).then((res) => {
          this.setState((prevState) => ({
            isLoading: false,
            characters: [...res.data.results, ...prevState.characters],
          }));
        });
      }
    );
  };

  render() {
    console.log(this.state.characters);
    if (this.state.isLoading) {
      return <h1>Loading component could be here</h1>;
    }

    return (
      <div>
        <h1>This is our Rick and Morty Api</h1>
        <button onClick={this.renderMore}>Want to see more?</button>
        {this.state.characters.map((character) => (
          <Character
            key={character.id}
            name={character.name}
            image={character.image}
          />
        ))}
      </div>
    );
  }
}

export default App;
