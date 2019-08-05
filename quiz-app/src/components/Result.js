import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import classNames from 'classnames';

function Result(props) {
    function hasPassed() {
        return (props.passMark <= (props.correctCounter / props.totalQuestions * 100));
    }

    function getContainerClasses() {
        return classNames(
            "resultContainer",
            {
                "resultContainer-passed": hasPassed()
            }
        );
    }

    return (
        <CSSTransitionGroup
            className="container result"
            component="div"
            transitionName="fade"
            transitionEnterTimeout={800}
            transitionLeaveTimeout={500}
            transitionAppear
            transitionAppearTimeout={500}
        >
            <div className={getContainerClasses()}>
                You got <strong>{props.correctCounter}</strong> out of <strong>{props.totalQuestions}</strong> correct.
          </div>
        </CSSTransitionGroup>
    );
}

Result.propTypes = {
    correctCounter: PropTypes.number.isRequired,
    totalQuestions: PropTypes.number.isRequired,
    passMark: PropTypes.number.isRequired
};

export default Result;