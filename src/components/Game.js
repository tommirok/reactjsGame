import React, { Component } from "react";
import Stars from "./Stars";
import Button from "./Button";
import Answer from "./Answer";
import Numbers from "./Numbers";
import Ending from "./Ending";
import Timer from "./Timer";

var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) {
    return true;
  }
  if (arr[0] > n) {
    return false;
  }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length,
    combinationsCount = 1 << listSize;
  for (var i = 1; i < combinationsCount; i++) {
    var combinationSum = 0;
    for (var j = 0; j < listSize; j++) {
      if (i & (1 << j)) {
        combinationSum += arr[j];
      }
    }
    if (n === combinationSum) {
      return true;
    }
  }
  return false;
};
export default class Game extends Component {
  static random = () => 1 + Math.floor(Math.random() * 9);
  static intitGameState = () => ({
    selectedNumbers: [],
    numberOfStars: Game.random(),
    answerIsCorrect: null,
    usedNumbers: [],
    redraws: 5,
    ending: null,
    time: 0
  });
  state = Game.intitGameState();

  restartGame = () => {
    this.setState(Game.intitGameState());
  };

  timer = () => {
    if (this.state.time === 0) {
      var thick = setInterval(() => {
        this.setState(prevState => ({
          time: prevState.time + 1
        }));
        this.isgameover();
        if (this.state.ending !== null) {
          clearInterval(thick);
        }
      }, 1000);
    }
  };

  selectNumbers = clickedNumber => {
    this.timer();

    if (
      this.state.selectedNumbers.indexOf(clickedNumber) >= 0 ||
      this.state.usedNumbers.indexOf(clickedNumber) >= 0
    ) {
      return;
    }
    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers.concat(clickedNumber),
      answerIsCorrect: null
    }));
  };
  unSelectNumbers = clickedNumber => {
    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers.filter(
        number => number !== clickedNumber
      ),
      answerIsCorrect: null
    }));
  };
  isCorrect = () => {
    this.setState(prevState => ({
      answerIsCorrect:
        prevState.numberOfStars ===
        prevState.selectedNumbers.reduce((total, num) => total + num)
    }));
  };
  confirm = () => {
    this.setState(
      prevState => ({
        usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
        selectedNumbers: [],
        answerIsCorrect: null,
        numberOfStars: Game.random()
      }),
      this.isgameover
    );
  };
  redraw = () => {
    if (this.state.redraws > 0) {
      this.setState(
        prevState => ({
          numberOfStars: Game.random(),
          redraws: prevState.redraws - 1
        }),
        this.isgameover
      );
    }
  };

  isgameover = () => {
    this.setState(prevState => {
      if (this.state.time > 60) {
        return { ending: "You lost, Time is up!" };
      } else if (this.state.usedNumbers.length === 9) {
        return { ending: "Winner takes it all!" };
      } else if (
        this.state.redraws === 0 &&
        !this.possibleSolutions(prevState)
      ) {
        return { ending: "Game Over!" };
      }
    });
  };
  possibleSolutions = ({ numberOfStars, usedNumbers }) => {
    const possibles = Numbers.arrayNumbers.filter(
      number => usedNumbers.indexOf(number) === -1
    );

    return possibleCombinationSum(possibles, numberOfStars);
  };

  render() {
    const {
      selectedNumbers,
      numberOfStars,
      answerIsCorrect,
      usedNumbers,
      redraws,
      ending
    } = this.state;
    return (
      <div className="container">
        <h3>Play Nine!</h3>
        <hr />
        <div className="row">
          <Timer time={this.state.time} />
          <Stars numberOfStars={numberOfStars} />

          <Button
            isCorrect={this.isCorrect}
            selectedNumbers={selectedNumbers}
            answerIsCorrect={answerIsCorrect}
            confirm={this.confirm}
            redraw={this.redraw}
            redraws={redraws}
          />

          <Answer
            selectedNumbers={selectedNumbers}
            unSelectNumbers={this.unSelectNumbers}
          />
        </div>
        <br />

        {ending ? (
          <Ending restartGame={this.restartGame} ending={ending} />
        ) : (
          <Numbers
            selectedNumbers={selectedNumbers}
            selectNumbers={this.selectNumbers}
            usedNumbers={usedNumbers}
          />
        )}
      </div>
    );
  }
}
