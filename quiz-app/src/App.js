import React, { Component } from 'react';
import logo from './svg/logo.svg';
import './App.css';
import { shuffleArray } from './utils/array';
import Quiz from './components/Quiz';
import Result from './components/Result';
import QuizAPI from './api/QuizAPI';
import ReactLoading from 'react-loading';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questions: []
    };
  }

  async componentDidMount() {
    let quizQuestions = await QuizAPI.getQuestions();
    shuffleArray(quizQuestions);
    this.setState({
      questions: quizQuestions
    });
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

  hasQuestionsLoaded() {
    var questions = this.state.questions;
    return (questions && Array.isArray(questions) && questions.length > 0);
  }

  renderContent(){
    if (this.hasQuestionsLoaded()) {
      return this.renderQuestionContent();
    }
    else {
      return this.renderLoadingContent();
    }
  }

  renderLoadingContent() {
    return (
      <div className="loadingContainer">
        <ReactLoading type={'spin'} color={'#53D2F9'} height={'100px'} width={'100px'} className="loading" />
        Loading Questions....
      </div>
    );
  }

  renderQuestionContent() {
    return this.hasAllQuestionsAnswered() ? this.renderResult() : this.renderQuiz();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Quiz</h2>
        </div>
        {this.renderContent()}
      </div>
    )
  }
}

export default App;
