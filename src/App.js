import Trivia from "./components/Trivia";
import { getPoke } from "./store/actions/actions";

import React, { Component } from "react";
import { connect } from "react-redux";

export class App extends Component {
  componentDidMount() {
    this.props.getPoke();
  }

  render() {
    return (
      <div className="App container">
        <Trivia
          question={this.props.question}
          score={this.props.score}
          entry={this.props.entry}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPoke: () => dispatch(getPoke())
  };
};

const mapStateToProps = state => {
  return {
    question: state.question,
    score: state.score,
    entry: state.entry
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
