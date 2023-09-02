import Trivia from "./components/Trivia";
import Modal from "./components/Modal";
import { getPoke, closeModal, openModal } from "./store/actions/actions";

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
          hintText={this.props.hintText}
          openModal={() => this.props.openModal()}
        />
        {this.props.modal && (
          <Modal
            getPoke={() => this.props.getPoke()}
            closeModal={() => this.props.closeModal()}
            modal={this.props.modal}
          />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPoke: () => dispatch(getPoke()),
    closeModal: () => dispatch(closeModal()),
    openModal: () => dispatch(openModal())
  };
};

const mapStateToProps = state => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
