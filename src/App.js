import Trivia from "./components/Trivia";
import Modal from "./components/Modal";
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
        {this.props.modal.message && <Modal />}
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
    entry: state.entry,
    modal: { ...state.modal }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
