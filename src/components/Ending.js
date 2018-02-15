import React from "react";

const Ending = props => {
  return (
    <div className="text-center">
      {props.ending}
      <button className="btn btn-default" onClick={props.restartGame}>
        Play Again
      </button>
    </div>
  );
};
export default Ending;
