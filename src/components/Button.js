import React from "react";

const Button = props => {
  let button;

  switch (props.answerIsCorrect) {
    case true:
      button = (
        <button
          className="btn btn-success"
          disabled={props.selectedNumbers.length === 0}
          onClick={props.confirm}
        >
          <i className="fa fa-check" />
        </button>
      );
      break;
    case false:
      button = (
        <button
          className="btn btn-danger"
          disabled={props.selectedNumbers.length === 0}
        ><i className="fa fa-times" />;

        </button>
      );
      break;
    default:
      button = (
        <button
          onClick={props.isCorrect}
          className="btn btn-primary"
          disabled={props.selectedNumbers.length === 0}
        >
          =
        </button>
      );
  }

  return (
    <div className="col-2">
      {button}
      <br />
      <br />
      <button
        onClick={props.redraw}
        className="btn btn-warning btn-sm"
        disabled={props.redraws === 0}
      >
        <i className="fa fa-refresh" /> {props.redraws}
      </button>
    </div>
  );
};
export default Button;
