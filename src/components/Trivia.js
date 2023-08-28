import React, { Component } from "react";

import Spinner from "./Spinner";
import Input from "./Input";
import Top from "./Top";

import { connect } from "react-redux";
import { submitAnswer } from "../store/actions/actions";

export class Trivia extends Component {
  state = {
    answer: "",
    hintUsed: false,
  };

  render() {
    const { score, entry, hintText } = this.props;
    return (
      <div className="card small yellow darken-3">
        <Top score={score} />
        <div className="card-content">
          <div className="center">
            {entry ? <p>{entry}</p> : <Spinner color="red" />}
            <div className="hints">
              <p>{this.state.hintUsed ? hintText : ""}</p>
            </div>
          </div>
        </div>
        <div className="card-action">
          <Input
            value={this.state.value}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleHint={this.handleHint}
            showHint={!this.state.hintUsed}
          />
        </div>
      </div>
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.submitAnswer(this.state.answer);
    this.props.openModal();
    event.target.reset();
    this.setState({
      hintUsed: false
    })
  };

  handleChange = event => {
    this.setState({
      answer: event.target.value
    });
  };

  handleHint = event => {
    event.preventDefault();
    this.setState({
      hintUsed: true
    });
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submitAnswer: answer => {
      dispatch(submitAnswer(answer));
    }
  };
};

export default connect(null, mapDispatchToProps)(Trivia);
