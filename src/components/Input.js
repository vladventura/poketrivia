import React from "react";

const Input = ({ value, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="center">
      <div className="input-field">
        <input
          autoComplete="off"
          onChange={handleChange}
          value={value}
          type="text"
          id="answer"
        ></input>
        <label htmlFor="answer">Answer</label>
      </div>
      <button className="btn red z-depth-0">Submit</button>
    </form>
  );
};
export default Input;
