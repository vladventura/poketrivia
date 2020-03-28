import React, { Component } from "react";
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
        <div className="card-content">
          <span className="card-title">
            <div className="left">PokeTrivia</div>
            <div className="right-align">Score: {score}</div>
          </span>
          <div className="center">
            {entry ? (
              <p>{entry}</p>
            ) : (
              <div className="preloader-wrapper big active">
                <div className="spinner-layer spinner-red-only">
                  <div className="circle-clipper left">
                    <div className="circle"></div>
                  </div>
                  <div className="gap-patch">
                    <div className="circle"></div>
                  </div>
                  <div className="circle-clipper right">
                    <div className="circle"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="card-action">
          <form onSubmit={this.handleSubmit} className="center">
            <label htmlFor="answer">Answer</label>
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
