import React, { Component } from "react";
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends Component {
  state = {
    results: {}, //{ [id]: 'success' 'error'} for all questions
    isFinished: false,
    activeQuestion: 0,
    answerState: null, //current user click { [id]: 'success' 'error'}
    quiz: [
      {
        id: 1,
        question: "What does HTML stand for?",
        answers: [
          { text: "Hypertext Machine language", id: 1 },
          { text: "Hypertext and links markup language", id: 2 },
          { text: "Hypertext Markup Language", id: 3 },
          { text: "Hightext machine language", id: 4 },
        ],
        rightAnswerId: 3,
      },
      {
        id: 2,
        question: "How is document type initialized in HTML5?",
        answers: [
          { text: "</DOCTYPE HTML>", id: 1 },
          { text: "<!DOCTYPE HTML>", id: 2 },
          { text: "</DOCTYPE>", id: 3 },
          { text: "</DOCTYPE html>", id: 4 },
        ],
        rightAnswerId: 2,
      },
      {
        id: 3,
        question:
          "Which of the following HTML Elements is used for making any text bold?",
        answers: [
          { text: "<i>", id: 1 },
          { text: "<li>", id: 2 },
          { text: "<p>", id: 3 },
          { text: "<b>", id: 4 },
        ],
        rightAnswerId: 4,
      },
      {
        id: 4,
        question:
          "Which of the following HTML element is used for creating an unordered list?",
        answers: [
          { text: "<ui>", id: 1 },
          { text: "<li>", id: 2 },
          { text: "<ul>", id: 3 },
          { text: "<em>", id: 4 },
        ],
        rightAnswerId: 3,
      },
    ],
  };

  retryHeldler = () => {
    this.setState({
      results: {},
      isFinished: false,
      activeQuestion: 0,
      answerState: null,
    });
  };

  onAnswerClickHandler = (answerId) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState); //get answerState id

      if (this.state.answerState[key] === "success") {
        //queation answer!
        return;
      }
    }

    const question = this.state.quiz[this.state.activeQuestion];

    if (question.rightAnswerId === answerId) {
      if (this.state.results[question.id] === "error") {
        this.setState({
          answerState: { [answerId]: "success" },
          results: { ...this.state.results, [question.id]: "error" },
        });
      } else {
        this.setState({
          answerState: { [answerId]: "success" },
          results: { ...this.state.results, [question.id]: "success" },
        });
      }

      console.log(this.state.results);
      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true,
          });
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
          });
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      this.setState({
        answerState: { [answerId]: "error" },
        results: { ...this.state.results, [question.id]: "error" },
      });
    }
  };

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Answer all questions</h1>
          {this.state.isFinished ? (
            <FinishedQuiz
              results={this.state.results}
              quiz={this.state.quiz}
              onRetry={this.retryHeldler}
            />
          ) : (
            <ActiveQuiz
              question={this.state.quiz[this.state.activeQuestion].question}
              answers={this.state.quiz[this.state.activeQuestion].answers}
              onAnswerClick={this.onAnswerClickHandler}
              quizLength={this.state.quiz.length}
              questionNumber={this.state.activeQuestion + 1}
              state={this.state.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Quiz;
