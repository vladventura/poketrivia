import React from "react";

const Top = ({ score }) => {
  return (
    <div className="container">
      <span className="card-title">
        <div className="left">PokeTrivia</div>
        <div className="right-align">Score: {score}</div>
      </span>
    </div>
  );
};

export default Top;
