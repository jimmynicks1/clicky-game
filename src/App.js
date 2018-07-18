//imports dependencies and files
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import FriendCard from "./components/FriendCard";
import Footer from "./components/Footer";
import dogs from "./dogs.json";
import "./App.css";


class App extends Component {
  state = {
    dogs,
    clickedDogs: [],
    score: 0
  };

  
  imageClick = event => {
    const currentDogs= event.target.alt;
    const DogsAlreadyClicked =
      this.state.clickedDogs.indexOf(currentDogs) > -1;

//if you click on a Dogs that has already been selected, the game is reset and cards reordered
    if (DogsAlreadyClicked) {
      this.setState({
        dogs: this.state.dogs.sort(function(a, b) {
          return 0.5 - Math.random();
        }),
        clickedDogs: [],
        score: 0
      });
        alert("You lose. Play again?");

//if you click on an available dogs, your score is increased and cards reordered
    } else {
      this.setState(
        {
          dogs: this.state.dogs.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          clickedDogs: this.state.clickedDogs.concat(
            currentDogs
          ),
          score: this.state.score + 1
        },
//if you get all 12 dogs corrent you get a congrats message and the game resets        
        () => {
          if (this.state.score === 12) {
            alert("Yay! You Win!");
            this.setState({
              dogs: this.state.dogs.sort(function(a, b) {
                return 0.5 - Math.random();
              }),
              clickedDogs: [],
              score: 0
            });
          }
        }
      );
    }
  };

//the order of components to be rendered: navbar, jumbotron, friendcard, footer 
  render() {
    return (
      <div>
        <Navbar 
          score={this.state.score}
        />
        <Jumbotron />
        <div className="wrapper">
          {this.state.dogs.map(dogs => (
            <FriendCard
              imageClick={this.imageClick}
              id={dogs.id}
              key={dogs.id}
              image={dogs.image}
            />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;