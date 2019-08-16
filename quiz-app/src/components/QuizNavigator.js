import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function QuizNavigator(props) {
  return (
    <div className="quiz-container right-aligned">
      <button
        type="button"
        onClick={props.nextHandler}
        className={classNames("button", {
          "button-disabled": props.isDisabled
        })}
      >
        Next
      </button>
    </div>
  );
}

QuizNavigator.propTypes = {
  isDisabled: PropTypes.bool,
  nextHandler: PropTypes.func.isRequired
};

export default QuizNavigator;
