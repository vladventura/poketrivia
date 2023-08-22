import React, { Component } from "react";
import M from "materialize-css";
import Spinner from "./Spinner";

class Modal extends Component {
  options = {
    onCloseEnd: () => {
      this.props.closeModal();
      this.props.getPoke();
    },
    inDuration: 250,
    outDuration: 250,
    opacity: 0.7,
    dismissible: true,
    startingTop: "4%",
    endingTop: "10%"
  };
  componentDidMount() {
    M.Modal.init(this.Modal, this.options);
    let instance = M.Modal.getInstance(this.Modal);
    instance.open();
  }
  render() {
    const {
      message,
      color,
      pokeName,
      pokeDesc,
      pokeSpriteUrl
    } = this.props.modal;
    return (
      <div>
        <div
          ref={Modal => {
            this.Modal = Modal;
          }}
          id="modal1"
          className="modal bottom-sheet"
        >
          <div className={"modal-content center " + color}>
            <h4 className="center">
              {message && pokeName
                ? message +
                  " " +
                  (pokeName.charAt(0).toUpperCase() + pokeName.slice(1))
                : "Loading.."}
            </h4>
            <img
              alt={pokeName && "Image of " + pokeName.toUpperCase()}
              src={pokeSpriteUrl}
            ></img>
            <div>
              {pokeDesc ? <p>{pokeDesc}</p> : <Spinner color="yellow" />}
            </div>
          </div>
          <div className={color && "modal-footer " + color}>
            <button
              className={
                color && "modal-close waves-effect btn-flat waves-" + color
              }
            >
              Got It!
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
