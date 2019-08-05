import React, { Component } from 'react';
import logo from './svg/logo.svg';
import './App.css';
import { shuffleArray } from './utils/array';
import Quiz from './components/Quiz';
import Result from './components/Result';
import quizQuestions from './api/quizQuestions';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questions: []
    };
  }

  componentDidMount() {
    shuffleArray(quizQuestions);
    this.setState({
      questions: quizQuestions
    });
  }

  nextHandler = (event) => {
    this.setState(({counter}) => ({
      counter: counter + 1
    }));
  }

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);

    if (this.state.questionId < quizQuestions.length) {
      setTimeout(() => this.setNextQuestion(), 300);
    } else {
      setTimeout(() => this.setResults(this.getResults()), 300);
    }
  }

  setUserAnswer(answer) {
    this.setState((state, props) => ({
      answersCount: {
        ...state.answersCount,
        [answer]: (state.answersCount[answer] || 0) + 1
      },
      answer: answer
    }));
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      answer: ''
    });
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map(key => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter(key => answersCount[key] === maxAnswerCount);
  }

  setResults(result) {
    if (result.length === 1) {
      this.setState({ result: result[0] });
    } else {
      this.setState({ result: 'Undetermined' });
    }
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
    let correctlyAnsweredQuestions = this.state.questions.filter ( function(question) {
      return question.isAnswerCorrect;
    });
    
    return (
      <Result
        correctCounter={correctlyAnsweredQuestions.length}
        totalQuestions= {this.state.questions.length}
        passMark = {70}
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
