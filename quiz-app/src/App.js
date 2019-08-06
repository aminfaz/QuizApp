import React, { Component } from 'react';
import logo from './svg/logo.svg';
import './App.css';
import { shuffleArray } from './utils/array';
import Quiz from './components/Quiz';
import Result from './components/Result';
import QuizAPI from './api/QuizAPI';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questions: []
    };
  }

  componentDidMount() {
    let questionloaded = (quizQuestions) => {
      shuffleArray(quizQuestions);
      this.setState({
        questions: quizQuestions
      });
    };

    QuizAPI.getQuestions(questionloaded);
  }

  nextHandler = (event) => {
    this.setState(({ counter }) => ({
      counter: counter + 1
    }));
  }

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
    let correctlyAnsweredQuestions = this.state.questions.filter(function (question) {
      return question.isAnswerCorrect;
    });

    return (
      <Result
        correctCounter={correctlyAnsweredQuestions.length}
        totalQuestions={this.state.questions.length}
        passMark={70}
      />
    );
  }

  hasAllQuestionsAnswered() {
    var questions = this.state.questions;
    return (questions && Array.isArray(questions) & this.state.counter === questions.length);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Quiz</h2>
        </div>
        {this.hasAllQuestionsAnswered() ? this.renderResult() : this.renderQuiz()}
      </div>
    )
  }
}

export default App;
