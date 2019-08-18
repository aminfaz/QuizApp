import React, { Component } from "react";
import PropTypes from "prop-types";
import QuizAPI from "../api/QuizAPI";
import { shuffleArray } from "../utils/array";
import Quiz from "./Quiz";
import Result from "./Result";
import ReactLoading from "react-loading";
import ErrorViewer from "./ErrorViewer";

class QuizSet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sessionToken: props.sessionToken,
      set: props.set,
      counter: 0,
      questions: [],
      error: null
    };
  }

  async componentDidMount() {
    try {
      let questions = await QuizAPI.getQuestions(this.state.set.value);
      shuffleArray(questions);
      this.setState({
        questions
      });
    } catch (ex) {
      let error = {
        message: "Could not load questions",
        inner: ex
      };
      this.setState({
        error
      });
    }
  }

  nextHandler = event => {
    this.setState(({ counter }) => ({
      counter: counter + 1
    }));
  };

  renderQuiz() {
    return (
      <Quiz
        counter={this.state.counter}
        total={this.state.questions.length}
        question={this.state.questions[this.state.counter]}
        nextHandler={this.nextHandler}
      />
    );
  }

  renderResult() {
    let correctlyAnsweredQuestions = this.state.questions.filter(function(
      question
    ) {
      return question.isAnswerCorrect;
    });

    return (
      <Result
        correctCounter={correctlyAnsweredQuestions.length}
        totalQuestions={this.state.questions.length}
        passMark={this.state.set.passMark}
      />
    );
  }

  hasAllQuestionsAnswered() {
    var questions = this.state.questions;
    return (
      questions &&
      Array.isArray(questions) & (this.state.counter === questions.length)
    );
  }

  hasQuestionsLoaded() {
    var questions = this.state.questions;
    return questions && Array.isArray(questions) && questions.length > 0;
  }

  renderLoadingContent() {
    return (
      <div className="loadingContainer">
        <ReactLoading
          type={"spin"}
          color={"#53D2F9"}
          height={"100px"}
          width={"100px"}
          className="loading"
        />
        Loading Questions....
      </div>
    );
  }

  renderQuestionContent() {
    return this.hasAllQuestionsAnswered()
      ? this.renderResult()
      : this.renderQuiz();
  }

  render() {
    const { error } = this.state;

    if (error) {
      return <ErrorViewer error={error} />;
    } else if (this.hasQuestionsLoaded()) {
      return this.renderQuestionContent();
    } else {
      return this.renderLoadingContent();
    }
  }
}

QuizSet.propTypes = {
  sessionToken: PropTypes.string.isRequired,
  set: PropTypes.object.isRequired
};

export default QuizSet;
