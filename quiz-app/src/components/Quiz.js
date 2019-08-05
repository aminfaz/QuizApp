import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { shuffleArray } from '../utils/array';
import Question from './Question';
import QuestionCount from './QuestionCount';
import AnswerOption from './AnswerOption';
import QuizNavigator from './QuizNavigator';
import { CSSTransitionGroup } from 'react-transition-group';

class Quiz extends Component {
    constructor(props) {
        super(props);

        this.state = {
            counter: props.counter,
            total: props.total,
            question: props.question,
            nextHandler: props.nextHandler
        }
        if (typeof this.state.question.hasAnswered === 'undefined') {
            shuffleArray(this.state.question.options);
        }
    }

    renderAnswerOptions(option, index) {
        return (
            <AnswerOption
                questionType={this.state.question.type}
                key={index}
                index={index}
                option={option}
                changeHandler={this.answerChangedHandler}
            />
        );
    }

    answerChangedHandler = (event, index) => {
        var chosenOptions = this.state.question.options.filter(function (option) {
            return option.isChosen;
        });

        let question = this.state.question;

        question.hasAnswered = (chosenOptions.length > 0);

        this.setState({
            question
        });
    }

    nextHandler = (event) => {
        var isAnswerCorrect = this.state.question.options.every(function (option) {
            return (false || option.isChosen) === (false || option.isCorrect);
        });
        let question = this.state.question;

        question.isAnswerCorrect = isAnswerCorrect;

        this.setState({
            question
        });

        this.state.nextHandler(event);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            counter: nextProps.counter,
            question: nextProps.question
        });
    }

    render() {
        if (!this.state.question) {
            return (<div />);
        }
        return (
            <CSSTransitionGroup
                className="container"
                component="div"
                transitionName="fade"
                transitionEnterTimeout={800}
                transitionLeaveTimeout={500}
                transitionAppear
                transitionAppearTimeout={500}
            >
                <div key={this.state.question.id}>
                    <QuestionCount
                        counter={this.state.counter + 1}
                        total={this.state.total}
                    />
                    <Question content={this.state.question.text} />
                    <ul className="answerOptions">
                        {this.state.question.options.map(this.renderAnswerOptions, this)}
                    </ul>
                    <QuizNavigator
                        isDisabled={!this.state.question.hasAnswered}
                        nextHandler={this.nextHandler}
                    />
                </div>
            </CSSTransitionGroup>
        );
    }
}

const optionShape = {
    text: PropTypes.string.isRequired,
    isCorrect: PropTypes.bool.isRequired,
    isChosen: PropTypes.bool
}

const questionShape = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["multiple", "single"]).isRequired,
    options: PropTypes.arrayOf(PropTypes.shape(optionShape)).isRequired,
    hasAnswered: PropTypes.bool
}

Quiz.propTypes = {
    counter: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    question: PropTypes.shape(questionShape).isRequired,
    nextHandler: PropTypes.func.isRequired
};

export default Quiz;