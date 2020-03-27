import React, { Component } from "react";
import { connect } from "react-redux";
import { submitAnswer, getPoke } from "../store/actions/actions";

export class Trivia extends Component {
  state = {
    answer: ""
  };

  render() {
    const { score, question, entry } = this.props;
    return (
      <div className="card small">
        <div className="card-content">
          <span className="card-title">
            <div className="left">Question {question}/10</div>
            <div className="right-align">Score: {score}</div>
          </span>
          <p className="center">{entry}</p>
        </div>
        <div className="card-action">
          <form onSubmit={this.handleSubmit} className="center">
            <label for="answer">Answer</label>
            <input
              onChange={this.handleChange}
              value={this.state.value}
              type="text"
              id="answer"
            ></input>
            <button className="btn red z-depth-0">Submit</button>
          </form>
        </div>
      </div>
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log("Button clicked");
    this.props.submitAnswer(this.state.answer);
    this.props.getPoke();
    event.target.reset();
  };

  handleChange = event => {
    this.setState({
      answer: event.target.value
    });
  };
}

const mapDispatchToProps = dispatch => {
  return {
    submitAnswer: answer => {
      dispatch(submitAnswer(answer));
    },
    getPoke: () => dispatch(getPoke())
  };
};

export default connect(null, mapDispatchToProps)(Trivia);
