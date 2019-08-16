import React from "react";
import PropTypes from "prop-types";
import { Line } from "rc-progress";

function QuestionCount(props) {
  return (
    <div className="questionCount">
      <div>
        Question <span>{props.counter}</span> of <span>{props.total}</span>
      </div>
      <div>
        <Line
          percent={(props.counter * 100) / props.total}
          strokeWidth="2"
          strokeColor="#388FAA"
        />
      </div>
    </div>
  );
}

QuestionCount.propTypes = {
  counter: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default QuestionCount;
