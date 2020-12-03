import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import contacts from './contacts.json';

const firstFive = contacts.slice(0, 5);
console.log('firstFive:', firstFive);

class App extends Component {
  state = {
    celebs: firstFive,
  };

  addNewRandomContact = () => {
    let randomContact = contacts[Math.floor(Math.random() * contacts.length)];

    const newArray = [...this.state.celebs, randomContact];
    // newArray.push(randomContact)

    this.setState({
      celebs: newArray,
    });
  };

  sortByName = () => {
    const copyOfState = [...this.state.celebs];

    const sortedByName = copyOfState.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) return 1;

      return 0;
    });

    this.setState({
      celebs: sortedByName,
    });
  };

  sortByPops = () => {
    const copyOfState = [...this.state.celebs];

    const sortedByPopulatiry = copyOfState.sort((a, b) => {
      if (a.popularity < b.popularity) {
        return -1;
      } else if (a.popularity > b.popularity) return 1;

      return 0;
    });

    this.setState({
      celebs: sortedByPopulatiry,
    });
  };

  deleteActor = (id) => {
    const copyOfState = [...this.state.celebs];

    const theActorIndex = copyOfState.findIndex((actor) => actor.id === id);

    copyOfState.splice(theActorIndex, 1);
    this.setState({
      celebs: copyOfState,
    });
  };

  render() {
    const { celebs } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <button onClick={this.addNewRandomContact}>
            Add ne Random Contact
          </button>
          <button onClick={this.sortByName}>Sort by name</button>
          <button onClick={this.sortByPops}>Sort by pops</button>
          <table>
            {celebs.map((el) => (
              <tr key={el.id} onClick={() => this.deleteActor(el.id)}>
                <td>{el.name}</td>
              </tr>
            ))}
          </table>
        </header>
      </div>
    );
  }
}

export default App;
