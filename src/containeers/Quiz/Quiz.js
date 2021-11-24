import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';

class Quiz extends Component {

    state = {
        activeQuestion: 0,
        quiz: [
            {   
                id: 1,
                question:'What does HTML stand for?',
                answers: [
                    {text: 'Hypertext Machine language', id: 1},
                    {text: 'Hypertext and links markup language', id: 2},
                    {text: 'Hypertext Markup Language', id: 3},
                    {text: 'Hightext machine language', id: 4},
                ],
                rightAnswerId: 3
            },
            {   
                id: 2,
                question:'How is document type initialized in HTML5?',
                answers: [
                    {text: '</DOCTYPE HTML>', id: 1},
                    {text: '<!DOCTYPE HTML>', id: 2},
                    {text: '</DOCTYPE>', id: 3},
                    {text: '</DOCTYPE html>', id: 4},
                ],
                rightAnswerId: 2
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {
        if (this.state.activeQuestion < this.state.quiz.length - 1 ) {
            this.setState({
                activeQuestion: this.state.activeQuestion + 1
            })
        }
    }

    render () {
        return (
            <div className={classes.Quiz}>
                <h1>Answer all questions</h1>
                <div className={classes.QuizWrapper}>
                    <ActiveQuiz
                        question = { this.state.quiz[this.state.activeQuestion].question }
                        answers = { this.state.quiz[this.state.activeQuestion].answers }
                        onAnswerClick = { this.onAnswerClickHandler }
                        quizLength = { this.state.quiz.length }
                        questionNumber = { this.state.activeQuestion + 1 }
                    />
                </div>
            </div>

        )
    }
}

export default Quiz;