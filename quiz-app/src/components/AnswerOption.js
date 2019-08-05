import React from 'react';
import PropTypes from 'prop-types';

function AnswerOption(props) {
    function changeHandler(event) {
        props.option.isChosen = !props.option.isChosen;
        props.changeHandler(event);
    }

    if (typeof props.option.isChosen === 'undefined') {
        props.option.isChosen = false;
    }

    if (props.questionType === "single") {
        return (
            <li className="answerOption" key={props.index}>
                <input
                    type="radio"
                    className="radioCustomButton"
                    name="radioGroup"
                    checked={props.option.isChosen}
                    id={"option" + props.index}
                    value={props.index}
                    onChange={changeHandler}
                />
                <label className="radioCustomLabel" htmlFor={"option" + props.index}>
                    {props.option.text}
                </label>
            </li>
        );
    }
    else if (props.questionType === "multiple") {
        return (
            <li className="answerOption" key={props.index}>
                <input
                    type="checkbox"
                    className="radioCustomButton"
                    name={props.index}
                    checked={props.option.isChosen}
                    id={"option" + props.index}
                    value={props.index}
                    onChange={changeHandler}
                />
                <label className="radioCustomLabel" htmlFor={"option" + props.index}>
                    {props.option.text}
                </label>
            </li>
        );
    }
    else {
        return (
            <p>{props.option.text}</p>
        );
    }
}

const optionShape = {
    text: PropTypes.string.isRequired,
    isCorrect: PropTypes.bool.isRequired,
    isChosen: PropTypes.bool
}

AnswerOption.propTypes = {
    questionType: PropTypes.oneOf(["multiple", "single"]).isRequired,
    index: PropTypes.number.isRequired,
    option: PropTypes.shape(optionShape).isRequired,
    changeHandler: PropTypes.func.isRequired
};

export default AnswerOption;