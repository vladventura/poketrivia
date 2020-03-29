import React, { Component } from "react";

import Spinner from "./Spinner";
import Input from "./Input";
import Top from "./Top";

import { connect } from "react-redux";
import { submitAnswer, openModal } from "../store/actions/actions";

export class Trivia extends Component {
  state = {
    answer: ""
  };

  render() {
    const { score, entry } = this.props;
    return (
      <div className="card small yellow darken-3">
        <Top score={score} />
        <div className="card-content">
          <div className="center">
            {entry ? <p>{entry}</p> : <Spinner color="red" />}
          </div>
        </div>
        <div className="card-action">
          <Input
            value={this.state.value}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
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
    openModal: () => dispatch(openModal())
  };
};

export default connect(null, mapDispatchToProps)(Trivia);
